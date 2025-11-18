<template>
    <div class="flex gap-4 w-full">
        <div class="w-full">
            <n-space vertical>
                <n-card :class="`shadow-md`" :title="`Data Rekening Koran`" :segmented="true" size="small">
                    <template #header-extra>
                        <div class="flex gap-2">
                            <n-input v-model:value="search" size="small">
                                <template #prefix>
                                    <v-icon name="bi-search" />
                                </template>
                            </n-input>
                            <json-excel :data="showData" name="Data Rekening Koran">
                                <n-button size="small" secondary type="success">
                                    <template #icon>
                                        <v-icon name="bi-download" />
                                    </template>
                                    export
                                </n-button>
                            </json-excel>
                        </div>
                    </template>
                    <n-space vertical :size="12">
                        <n-data-table size="small" :columns="columns" :data="data" :pagination="pagination"
                            :loading="isLoading" />
                    </n-space>
                </n-card>
            </n-space>
        </div>
    </div>
    <n-modal v-model:show="modalBukaRekening">
        <div class="w-[80%]">
            <BukaRekening @saved="handleSavedNewAccount" @cancel="handleCancelBuka" />
        </div>
    </n-modal>
    <n-modal v-model:show="modalTutupRekening" :mask-closable="false">
        <div class="w-2/4">
            <TutupRekening @cancel="handleCancelTutup" />
        </div>
    </n-modal>
</template>
<script setup>
import { onMounted } from 'vue';
import { useApi } from '../../../../helpers/axios';
import { useMessage } from 'naive-ui';
import BukaRekening from "./BukaRekening.vue";
import TutupRekening from './TutupRekening.vue';
import { useSearch } from '../../../../helpers/searchObject';
import JsonExcel from "vue-json-excel3";

const data = ref([]);
const isLoading = ref(false);
const message = useMessage();
const search = ref();

const modalBukaRekening = ref(false);
const modalTutupRekening = ref(false);

const handleBukaRekening = () => {
    modalBukaRekening.value = true;
}
const handleCancelTutup = () => {
    modalTutupRekening.value = false;
}
const handleCancelBuka = () => {
    modalBukaRekening.value = false;
}

const handleSavedNewAccount = async () => {
    await fetchData();
    modalBukaRekening.value = false;
    message.success('Deposito berhasil ditambahkan');
}
const handleTutupRekening = () => {
    modalTutupRekening.value = true;
}

const fetchData = async () => {
    isLoading.value = true;
    const response = await useApi({
        api: 'rekening_koran',
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

const columns = [
    {
        title: "No Rekening",
        key: "loan_number"
    },
    {
        title: "Atas Nama",
        key: "nama"
    },
    {
        title: "Nilai Pinjaman",
        key: "nilai_pinjaman",
        render(row) {
            return h("div", row.nilai_pinjaman?.toLocaleString());
        }
    },
    {
        title: "Sisa Pinjaman",
        key: "sisa_pokok",
        render(row) {
            return h("div", row.sisa_pokok?.toLocaleString());
        }
    },
    {
        title: "Tunggakan",
        key: "tunggakan",
        render(row) {
            return h("div", row.tunggakan?.toLocaleString());
        }
    },
]
const showData = computed(() => {
    return useSearch(data.value, search.value);
});
onMounted(() => fetchData());
</script>