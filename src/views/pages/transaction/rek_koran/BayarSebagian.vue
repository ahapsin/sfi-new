<template>
    <div class="flex gap-4 w-full">
        <div class="w-full">
            <n-space vertical>
                <n-card :class="`shadow-md`" :title="`Transaksi Pembayaran Sebagian`" :segmented="true" size="small">
                    <template #header-extra>
                        <n-space>
                            <n-button type="primary" @click="handleAdd">
                                <template #icon>
                                    <v-icon name="bi-plus-lg" />
                                </template>
                                Bayar Baru
                            </n-button>
                        </n-space>
                    </template>
                    <n-space vertical :size="12" class="pt-4">
                        <n-data-table size="small" :columns="columns" :data="showData" :pagination="pagination"
                            :loading="isLoading" />
                    </n-space>
                </n-card>
            </n-space>
        </div>
    </div>
    <n-modal v-model:show="modalAdd">
        <div class="w-4/6">
            <AddBayar />
        </div>
    </n-modal>
</template>

<script setup>
import _ from 'lodash';
import { useApi } from '../../../../helpers/axios';
import AddBayar from './AddBayar.vue';

const modalAdd = ref(false);
const rekeningDebet = ref();
const rekeningKredit = ref();
const tgl_valuta = ref(new Date);
const dataRekening = ref([]);
const selectOptions = ref([]);
const selectedRekening = ref(null);
const selectedRekeningKredit = ref(null);
const isLoading = ref(false);
const nominal = ref();
const keterangan = ref();

const fetchData = async () => {
    selectedRekening.value = null;
    isLoading.value = true;
    const response = await useApi({ url: 'http://localhost:3001/rekening' });
    if (!response.ok) {
        message.error("error");
        isLoading.value = false;
    } else {
        isLoading.value = false;
        dataRekening.value = response.data;
        selectOptions.value = response.data.map(row => ({
            label: `${row.no_rekening} ${row.nama_pemilik}`,
            value: row.no_rekening,
            disabled: row.status === 'inactive'
        }));
    }
}

const handleUpdateValue = (val, options) => {
    selectedRekening.value = _.find(dataRekening.value, { no_rekening: val });
}
const handleUpdateValueKredit = (val, options) => {
    selectedRekeningKredit.value = _.find(dataRekening.value, { no_rekening: val });
}

const handleAdd = () => {
    modalAdd.value = true;
    //fetchData();
}

const postData = async (e) => {
    const response = await useApi({
        url: 'http://localhost:3001/aktivitas',
        method: 'POST',
        data: e
    });
    if (!response.ok) {
        message.error("error");
        isLoading.value = false;
    } else {
        isLoading.value = false;
    }
}

const handleSave = async () => {
    const bodyDebet = {
        tgl_transaksi: tgl_valuta.value,
        nomor_rekening: selectedRekening.value.no_rekening,
        atas_nama: selectedRekening.value.nama_pemilik,
        sandi_transaksi: '1001',
        nominal: nominal.value,
        saldo: selectedRekening.value.saldo,
        keterangan: keterangan.value,
        operator: "DEB"
    }
    const bodyKredit = {
        tgl_transaksi: tgl_valuta.value,
        nomor_rekening: selectedRekeningKredit.value.no_rekening,
        atas_nama: selectedRekeningKredit.value.nama_pemilik,
        sandi_transaksi: '1002',
        nominal: nominal.value,
        saldo: selectedRekeningKredit.value.saldo,
        keterangan: keterangan.value,
        operator: "DEB"
    }
    await postData(bodyDebet);
    await postData(bodyKredit);
    modalPinbuk.value = false;

}
const handleBatal = () => {
    modalPinbuk.value = false;
    rekeningDebet.value = null;
    rekeningKredit.value = null;
    selectedRekening.value = null;
    selectedRekeningKredit.value = null;
}

const parse = (input) => {
    const nums = input.replace(/,/g, "").trim();
    if (/^\d+(\.(\d+)?)?$/.test(nums)) return Number(nums);
    return nums === "" ? null : Number.NaN;
};
const format = (value) => {
    if (value === null) return "";
    return value.toLocaleString("en-US");
};
function formatKey(key) {
    return key.replace(/_/g, ' ')
}
</script>