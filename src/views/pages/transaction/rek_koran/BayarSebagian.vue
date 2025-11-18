<template>
    <div class="flex gap-4 w-full">
        <div class="w-full">
            <n-space vertical>
                <n-card :class="`shadow-md`" :title="`Transaksi Penarikan Sebagian`" :segmented="true" size="small">
                    <template #header-extra>
                        <n-space>
                            <div class="flex gap-2">
                                <n-input v-model:value="search" size="small">
                                    <template #prefix>
                                        <v-icon name="bi-search" />
                                    </template>
                                </n-input>
                                <json-excel :data="showData" name="Data Bayar Sebagian">
                                    <n-button size="small" secondary type="success">
                                        <template #icon>
                                            <v-icon name="bi-download" />
                                        </template>
                                        export
                                    </n-button>
                                </json-excel>
                            </div>

                            <n-button type="primary" @click="handleAdd" size="small">
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
import { onMounted } from 'vue';
import { useSearch } from '../../../../helpers/searchObject';
import JsonExcel from "vue-json-excel3";

const modalAdd = ref(false);
const isLoading = ref(false);
const search = ref();
const data = ref([]);

const fetchData = async () => {
    isLoading.value = true;
    const response = await useApi({
        api: 'kwitansi_rekening_koran',
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

const handleAdd = () => {
    modalAdd.value = true;
    //fetchData();
}
const columns = [
    {
        title: "Tanggal",
        key: "tgl_transaksi"
    },
    {
        title: "No Rekening",
        key: "no_fasilitas"
    },
    {
        title: "Atas Nama",
        key: "nama"
    },
    {
        title: "Nominal Bayar",
        key: "total_bayar",
        render(row) {
            return h("div", row.total_bayar?.toLocaleString());
        }
    },
]
const showData = computed(() => {
    return useSearch(data.value, search.value);
});
onMounted(() => {
    fetchData();
})
</script>