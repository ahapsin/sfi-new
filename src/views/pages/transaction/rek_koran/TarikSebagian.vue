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
                                <json-excel :data="showData" name="Data Tarik Sebagian">
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
            <AddTarik />
        </div>
    </n-modal>
</template>

<script setup>
import _, { sortBy } from 'lodash';
import { useApi } from '../../../../helpers/axios';
import { onMounted } from 'vue';
import { useSearch } from '../../../../helpers/searchObject';
import AddTarik from './AddTarik.vue';
import JsonExcel from "vue-json-excel3";

const modalAdd = ref(false);
const isLoading = ref(false);
const search = ref();
const data = ref([]);

const fetchData = async () => {
    isLoading.value = true;
    const response = await useApi({
        api: 'kwitansi_top_up',
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
        key: "tgl_transaksi",
        sorter: "default"
    },
    {
        title: "No Rekening",
        key: "no_fasilitas",
         sorter: "default"
    },
    {
        title: "Atas Nama",
        key: "nama",
         sorter: "default"
    },
    {
        title: "Nominal Tarik",
        key: "total_bayar",
        render(row) {
            return h("div", row.jumlah_uang?.toLocaleString());
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