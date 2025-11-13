<template>
    <div class="flex gap-4 w-full">
        <div class="w-full">
            <n-space vertical>
                <n-card :class="`shadow-md`" :segmented="true" size="small">
                    <template #header>
                        <n-space>
                            <n-button @click="currentComponent = 'ListRekening'" quaternary
                                :type="currentComponent === 'ListRekening' ? 'success' : 'default'">
                                <template #icon>
                                    <v-icon name="bi-table" scale="1.2" />
                                </template>
                                <n-text strong>Data Kredit</n-text>
                            </n-button>
                            <n-divider vertical></n-divider>
                            <n-space v-if="selectedFasilitas?.tipe_kredit === 'bulanan'">
                                <n-button ghost type="primary">
                                    <template #icon>
                                        <v-icon name="bi-plus" scale="1.2" />
                                    </template>
                                    Pembayaran
                                </n-button>
                                <n-button ghost type="primary">
                                    <template #icon>
                                        <v-icon name="bi-plus" scale="1.2" />
                                    </template>
                                    Pelunasan
                                </n-button>
                            </n-space>
                            <n-space v-if="selectedFasilitas?.tipe_kredit === 'rekening_koran'">
                                <n-button quaternary @click="currentComponent = 'BayarSebagian'">
                                    <template #icon>
                                        <v-icon name="bi-cash-stack" scale="1.2" />
                                    </template>
                                    Bayar Sebagian
                                </n-button>
                                <n-button quaternary @click="currentComponent = 'TarikSebagian'">
                                    <template #icon>
                                        <v-icon name="bi-credit-card" scale="1.2" />
                                    </template>
                                    Tarik Sebagian
                                </n-button>
                            </n-space>
                        </n-space>
                    </template>
                    <template #header-extra>
                        <n-space>
                            <n-input v-model:value="searchBox" clearable>
                                <template #prefix>
                                    <v-icon name="bi-search" />
                                </template>
                            </n-input>
                        </n-space>
                    </template>
                    <n-space vertical :size="12">
                        <n-data-table :row-props="rowProps" :row-class-name="rowClassName" size="small"
                            :row-key="(row) => row" :columns="columns" :data="showData"
                            :on-update:checked-row-keys="handleFasilitas" :pagination="{ pagesize: 10 }" />
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
import { NTag, useMessage } from 'naive-ui';
import BukaRekening from "./BukaRekening.vue";
import TutupRekening from './TutupRekening.vue';
import { useSearch } from '../../../../helpers/searchObject';



const data = ref([]);
const isLoading = ref(false);
const message = useMessage();

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
const pagination = {
    pageSize: 10
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
        api: 'credit',
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
        title: "No Kredit",
        key: "no_loan"
    },
    {
        title: "Atas Nama",
        key: "loan_holder"
    },
    {
        title: "Tipe",
        key: "tipe_kredit"
    },
    {
        title: "Tenor",
        key: "tenor"
    },
    {
        title: "Angsuran",
        key: "angsuran"
    },
    {
        title: "Alamat",
        key: "alamat"
    },
]
const rowProps = (row) => {
    return {
        style: "cursor: pointer;",
        onClick: () => {
            // if (row.status === "LUNAS") {
            //   message.info("Fasilitas Sudah Lunas")
            // } else {
            selectedFasilitas.value = row;
            // }
        },
    };
};
const selectedFasilitas = ref();
const handleFasilitas = (e) => {
    selectedFasilitas.value = e;
};

const rowClassName = (row) => {
    if (row === selectedFasilitas.value) {
        return "row-active";
    }
    return "";
};
const searchBox = ref()
const showData = computed(() => {
    return useSearch(data.value, searchBox.value);
    // return filterIt(dataTable.value, searchBox.value);
});
onMounted(() => fetchData());

</script>
<style scoped>
:deep(.row-active td) {
    @apply bg-pr-200 text-pr font-bold
}
</style>