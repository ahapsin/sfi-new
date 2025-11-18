<template>
    <n-space class="mb-4 bg-white p-2 rounded-lg items-center border shadow-md">
       
        <n-button @click="currentComponent = 'ListRekening'" quaternary :type="currentComponent === 'ListRekening' ? 'success' : 'default'">
            <v-icon name="bi-table" scale="1.2" />
        </n-button>
         <n-text strong>REKENING KORAN</n-text>
        <n-divider vertical></n-divider>
        <!-- <n-button quaternary :type="currentComponent === 'SetorTarik' ? 'success' : 'default'"
            @click="currentComponent = 'SetorTarik'">
            <v-icon name="bi-arrow-repeat" scale="1.2" />
            Transaksi
        </n-button> -->
     
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
    <div class="flex w-full">
        <component :is="komponenMap[currentComponent]" />
    </div>
</template>
<script setup>
import { ref } from "vue";
import { NButton } from "naive-ui";


import ListRekening from "./ListRekening.vue";
import BukaRekening from "./BukaRekening.vue";
import SetorTarik from "./SetorTarik.vue";
import CetakBuku from "./CetakBuku.vue";
import PindahBuku from "./PindahBuku.vue";
import BayarSebagian from "./BayarSebagian.vue";
import TarikSebagian from "./TarikSebagian.vue";
import TutupRekening from "./TutupRekening.vue";
import UpdateRekening from "./UpdateRekening.vue";

const currentComponent = ref('ListRekening');
const komponenMap = {
    ListRekening,
    BukaRekening,
    SetorTarik,
    TutupRekening,
    BayarSebagian,
    TarikSebagian,
    UpdateRekening,
    PindahBuku,
    CetakBuku
}

// onMounted(() => fetchData());

</script>