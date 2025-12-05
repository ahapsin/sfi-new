<template>


    <n-card ::class="`shadow-md`" class="w-full" title="Pencairan Deposito" :segmented="true" size="small">
        <n-card embedded>
            <div class="flex gap-4">
                <n-form-item label="Tanggal Valuta">
                    <n-date-picker type="date" v-model:value="tgl_valuta"></n-date-picker>
                </n-form-item>
                <n-form-item label="Pilih No Deposito" class="w-full">
                    <n-select filterable v-model:value="rekening" :options="data" label-field="no_deposito"
                        value-field="no_deposito" @update:value="handleUpdateValue" />
                </n-form-item>

            </div>
            
            <n-space vertical v-if="rekening">
                <n-card :class="`shadow-md`" v-if="selectedRekening">
                    <div class="grid grid-cols-1 md:grid-cols-3  bg-white">
                        <div v-for="(value, key) in selectedRekening" :key="key">
                            <div class="flex flex-col">
                                <div><strong class="capitalize">{{ formatKey(key) }}</strong></div>
                                <div>
                                    <n-ellipsis style="max-width: 120px">{{ value ? value : 'N/A'
                                    }}</n-ellipsis>
                                </div>
                            </div>
                        </div>
                    </div>
                </n-card>
                <n-card>
                    <div class="grid grid-cols-4 gap-4">
                        <div class="flex flex-col">
                            <small class="text-reg">No Deposito</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.no_deposito }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">No Deposito</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.nama_nasabah }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Jangka Waktu</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.tempo }} bulan </n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Bunga</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.suku_bunga }} % </n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Kode Pajak</small>
                            <n-text strong class="text-md border-b">20 % </n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Tanggal Mulai</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.tanggal_valuta }} </n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Tgl. Jatuh Tempo</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.tanggal_jth_tmpo }} </n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Status</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.status }} </n-text>
                        </div>

                    </div>
                    <n-divider title-placement="left">Deposito</n-divider>
                    <div class="grid grid-cols-4 gap-4">
                        <div class="flex flex-col">
                            <small class="text-reg">Nominal</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.jumlah_pokok?.toLocaleString()
                            }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Bunga</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.nilai_bunga?.toLocaleString()
                            }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Pajak Atas Bunga</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.pajak?.toLocaleString() }}</n-text>
                        </div>
                        <div class="flex flex-col">
                            <small class="text-reg">Hari Aktif</small>
                            <n-text strong class="text-md border-b">{{ detailDepo.hari_aktif }} Hari</n-text>
                        </div>
                    </div>
                </n-card>
                <n-card>
                    <n-form>
                        <div>
                            <n-form-item label="Method" class="w-full">
                                <n-radio-group v-model:value="methodRef" name="radiogroup">
                                    <n-space>
                                        <n-radio v-for="type in method" :key="type.value" :value="type.value"
                                            :label="type.label" />
                                    </n-space>
                                </n-radio-group>
                            </n-form-item>
                            <div v-if="methodRef === 'transfer'">
                                <div class="grid grid-cols-2 gap-4 mb-4">
                                    <div class="flex flex-col">
                                        <small class="text-reg">No Rekening</small>
                                        <n-text strong class="text-md border-b">{{
                                            detailDepo.no_rek_tujuan
                                        }}</n-text>
                                    </div>
                                    <div class="flex flex-col">
                                        <small class="text-reg">Atas Nama</small>
                                        <n-text strong class="text-md border-b">{{
                                            detailDepo.nama_rek_tujuan
                                        }}</n-text>
                                    </div>
                                </div>
                            </div>
                            <n-form-item label="Keterangan" class="w-full">
                                <n-input autosize class="w-full" v-model:value="keterangan" />
                            </n-form-item>
                        </div>
                    </n-form>
                </n-card> 
            </n-space>
            <template #footer>
                <n-space>
                    <n-button type="primary" @click="handleSave">Simpan</n-button>
                        <n-button type="error" secondary @click="handleBatal">Batal</n-button>
                </n-space>
            </template>
        </n-card>
    </n-card>
</template>
<script setup>
import _ from 'lodash';
import { useApi } from '../../../../helpers/axios';

const dataRekening = ref([]);
const dataRekeningClosed = ref([]);
const isLoading = ref(false);
const tgl_valuta = ref(new Date);
const rekening = ref();
const keterangan = ref();
const selectedRekening = ref(null);
const selectOptions = ref([]);
const modalRekening = ref(false);
const data = ref();
const methodRef = ref('tunai');
const fetchData = async () => {
    isLoading.value = true;
    const response = await useApi({
        api: 'deposits',
        method: 'GET',
        token: localStorage.getItem('token')
    });
    if (!response.ok) {
        message.error("error");
        isLoading.value = false;
    } else {
        isLoading.value = false;
        data.value = response.data;
    }
}

const method = [
    {
        value: 'Tunai',
        label: 'Tunai'
    },
    {
        value: 'Transfer',
        label: 'Transfer'
    }
].map((d) => {
    d.value = d.value.toLowerCase()
    return d
})
const fetchRekening = async () => {
    isLoading.value = true;
    const response = await useApi({
        api: 'account',
        method: 'GET',
        token: localStorage.getItem('token')
    });
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
const postClosedRekening = async (e) => {
    isLoading.value = true;
    const response = await useApi({
        url: 'http://localhost:3001/closed_rekening',
        method: 'POST',
        data: e
    });
    if (!response.ok) {
        message.error("error");
        isLoading.value = false;
    } else {
        isLoading.value = false;
    };
}

const detailDepoView = (data) => ({
    no_deposito: data.no_deposito,
    atas_nama: data.nama_nasabah,
    tanggal_mulai: data.tanggal_valuta
})

const columns = [
    {
        title: "No Deposito",
        key: "no_rekening"
    },
    {
        title: "Atas Nama",
        key: "nama_pemilik"
    },
    {
        title: "Alamat",
        key: "alamat"
    },
    {
        title: "Ibu Kandung",
        key: "nama_ibu_kandung"
    },
    {
        title: "Tanggal Pencairan",
        key: "tgl_tutup"
    },
    {
        title: "Keterangan",
        key: "keterangan"
    },
];

const handleAdd = () => {
    modalRekening.value = true;
    fetchRekening();
}
const handleSave = async () => {
    const body = {
        no_rekening: selectedRekening.value.no_rekening,
        alamat: selectedRekening.value.alamat,
        nama_pemilik: selectedRekening.value.nama_pemilik,
        nama_ibu_kandung: selectedRekening.value.nama_ibu_kandung,
        cabang: selectedRekening.value.cabang,
        no_identitas: selectedRekening.value.no_identitas,
        tgl_tutup: tgl_valuta.value,
        saldo: selectedRekening.value.saldo,
        keterangan: keterangan.value
    }
    await postClosedRekening(body);
    await fetchData();
    modalRekening.value = false;
}

const handleBatal = () => {
    modalRekening.value = false;
    selectedRekening.value = null;
    rekening.value = null;
    emit('cancel');
}
const emit = defineEmits();
const detailDepo = ref([]);
const handleUpdateValue = async (val, options) => {
    const response = await useApi({
        api: `deposits/${rekening.value}`,
        method: 'GET',
        token: localStorage.getItem('token')
    });
    if (!response.ok) {
        message.error("error");
        isLoading.value = false;
    } else {
        isLoading.value = false;
        detailDepo.value = response.data;
    }
}
function formatKey(key) {
    return key.replace(/_/g, ' ')
}
onMounted(() => fetchData());
</script>