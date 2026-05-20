<template>
    <n-card :class="`shadow-md`" title="Data Tunggakan" :segmented="true" size="small">
        <n-data-table :columns="columns" :data="data" />
    </n-card>
</template>

<script setup>
import { h, onMounted, ref } from "vue";


import {
    NTag,
    useMessage
} from "naive-ui";


import { useApi } from "../../../../helpers/axios";

const message = useMessage();

const spinPinjaman = ref(false);


const columns = [
    {
        title: "Status",
        key: "status",
        sorter: "default",
        render: (row) => {
            const color =
                row.status === "TERLAMBAT"
                    ? "error"
                    : row.status === "LANCAR"
                        ? "success"
                        : "warning";

            return h(
                NTag,
                {
                    type: color,
                    round: true,
                },
                {
                    default: () => row.status,
                }
            );
        },
    },
    {
        title: "No Kontrak",
        key: "no_kontrak",
        sorter: "default",
    },
    {
        title: "Nama Debitur",
        key: "nama_debitur",
        sorter: "default",
    },
    {
        title: "Tgl Tunggakan",
        key: "tgl_tunggakan",
        sorter: "default",
    },
    {
        title: "Pokok",
        key: "pokok",
        sorter: "default",
        render: (row) => row.pokok?.toLocaleString("id-ID"),
    },
    {
        title: "Bunga",
        key: "bunga",
        sorter: "default",
        render: (row) => row.bunga?.toLocaleString("id-ID"),
    },
    {
        title: "Jml Tunggakan",
        key: "jml_tunggakan",
        sorter: "default",
    },
    {
        title: "Tgl Cair",
        key: "tgl_cair",
        sorter: "default",
    },
    {
        title: "Plafond",
        key: "plafond",
        sorter: "default",
        render: (row) => row.plafond?.toLocaleString("id-ID"),
    },
    {
        title: "Tenor",
        key: "tenor",
        sorter: "default",
    },
    {
        title: "Angsuran",
        key: "angsuran",
        sorter: "default",
        render: (row) => row.angsuran?.toLocaleString("id-ID"),
    },
    {
        title: "Jenis",
        key: "jenis",
        sorter: "default",
    },
];





const isLoading = ref(false);
const data = ref();

const getTunggakan = async (e) => {
    spinPinjaman.value = true;
    let userToken = localStorage.getItem("token");
    const response = await useApi({
        method: "GET",
        api: `lap_tunggakan`,
        token: userToken,
    });
    if (!response.ok) {
        message.error("ERROR API");
    } else {
        spinPinjaman.value = false;
        data.value = response.data;
    }
}

onMounted(() => {
    getTunggakan()
})

</script>

<style lang="scss" scoped></style>
