<template>
    <div class="flex w-full gap-4">
        <div class="w-full">
            <n-space vertical>
                <n-card title="Cetak Buku Tabungan" :segmented="true" size="small" class="shadow-md">
                    <!-- Pilih Rekening -->
                    <n-form-item label="Pilih Rekening" class="w-full">
                        <n-select v-model:value="rekening" filterable :options="selectOptions"
                            @update:value="handleUpdateValue" />
                    </n-form-item>

                    <!-- Kepala Buku -->
                    <n-card v-if="selectedRekening" title="Detail Buku" embedded :segmented="true" size="small"
                        class="shadow-md">
                        <template #header-extra>
                            <n-button type="success" @click="handleCetak">
                                Cetak Kepala Buku
                            </n-button>
                        </template>

                        <div ref="headArea" class="p-10 font-mono">
                            <div class="mb-2 text-lg">
                                {{ appCompany }}
                            </div>

                            <div class="mt-4">
                                Ac. {{ selectedRekening.no_rekening }}
                            </div>

                            <div>
                                {{ selectedRekening.nama_pemilik }}
                            </div>

                            <div>
                                {{ selectedRekening.alamat }}
                            </div>
                        </div>
                    </n-card>

                    <!-- Filter Buku -->
                    <n-input-group v-if="selectedRekening" class="mt-4">
                        <n-input-group-label>
                            Buku
                        </n-input-group-label>

                        <n-input-number v-model:value="bukuFilter" :min="1" />

                        <n-input-group-label>
                            Halaman
                        </n-input-group-label>

                        <n-input-number v-model:value="halBarisAwal.hal" placeholder="Hal" :min="1" />

                        <n-input-group-label>
                            Baris
                        </n-input-group-label>

                        <n-input-number v-model:value="halBarisAwal.baris" placeholder="Baris" :min="1" />

                        <n-input-group-label>
                            S/D
                        </n-input-group-label>

                        <n-input-group-label>
                            Halaman
                        </n-input-group-label>

                        <n-input-number v-model:value="halBarisAkhir.hal" placeholder="Hal" :min="1" />

                        <n-input-group-label>
                            Baris
                        </n-input-group-label>

                        <n-input-number v-model:value="halBarisAkhir.baris" placeholder="Baris" :min="1" />
                    </n-input-group>

                    <!-- Debug -->

                    <!-- Data Transaksi -->
                    <n-data-table v-if="selectedRekening" :data="transaksiTerfilter" :columns="columnsAktifitas"
                        max-height="70vh" class="mt-4" />

                    <!-- Cetak Mutasi -->
                    <div v-if="selectedRekening" class="w-fit pt-4">
                        <n-input-group>
                            <n-input-group-label>
                                Mulai Baris
                            </n-input-group-label>

                            <n-input-number v-model:value="startRow" :min="0" />

                            <n-button type="success" @click="handleCetakMutasi">
                                Cetak
                            </n-button>
                        </n-input-group>

                        <!-- Area Print -->
                        <div class="mt-4 hidden border border-dashed bg-slate-50">
                            <div ref="printArea">
                                <table class="font-mono text-[11px]">
                                    <tbody>
                                        <!-- Baris kosong sebelum transaksi -->
                                        <tr v-for="i in startRow" :key="`empty-${i}`">
                                            <td>&nbsp;</td>
                                        </tr>

                                        <!-- Transaksi -->
                                        <tr v-for="(col, index) in transaksiTerfilter" :key="col.id ?? index">
                                            <td style="width: 0.9cm">
                                                &nbsp;
                                            </td>

                                            <td style="width: 1.8cm">
                                                {{
                                                    moment(col.tgl_transaksi)
                                                        .format("MM-DD-YYYY")
                                                }}
                                            </td>

                                            <td style="width: 1cm">
                                                {{ col.tipe.slice(0, 2) }}
                                            </td>

                                            <td style="width: 3.5cm" align="right">
                                                {{
                                                    col.tipe === "DEBET"
                                                        ? col.nominal.toLocaleString()
                                                        : null
                                                }}
                                            </td>

                                            <td style="width: 3.5cm" align="right">
                                                {{
                                                    col.tipe === "CREDIT"
                                                        ? col.nominal.toLocaleString()
                                                        : null
                                                }}
                                            </td>

                                            <td style="width: 4cm" align="right">
                                                {{ col.saldo.toLocaleString() }}
                                            </td>

                                            <td style="width: 0.9cm" align="right">
                                                {{ col.operator.slice(0, 2) }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </n-card>
            </n-space>
        </div>
    </div>
</template>

<script setup>
import _ from "lodash";
import moment from "moment";
import { computed, onMounted, ref } from "vue";
import { useVueToPrint } from "vue-to-print";
import { useApi } from "../../../../helpers/axios";

const appCompany = import.meta.env.VITE_APP_TITLE;

// =========================
// State
// =========================

const rekening = ref(null);
const selectedRekening = ref(null);

const selectOptions = ref([]);
const dataRekening = ref([]);
const dataAktifitas = ref([]);

const isLoading = ref(false);

const bukuFilter = ref(1);
const isFilterActive = ref(false)

const halBarisAwal = ref({
    hal: 1,
    baris: 1,
});

const halBarisAkhir = ref({
    hal: 2,
    baris: 1,
});

const startRow = ref(0);

const headArea = ref(null);
const printArea = ref(null);

// =========================
// Fetch Rekening
// =========================

const fetchData = async () => {
    selectedRekening.value = null;
    isLoading.value = true;

    const response = await useApi({
        api: "account",
        method: "GET",
        token: localStorage.getItem("token"),
    });

    if (!response.ok) {
        isLoading.value = false;
        message.error("Gagal mengambil data rekening");
        return;
    }

    dataRekening.value = response.data;

    selectOptions.value = response.data.map((row) => ({
        label: `${row.no_rekening} ${row.nama_pemilik}`,
        value: row.no_rekening,
        disabled: row.status === "inactive",
    }));

    isLoading.value = false;
};

// =========================
// Fetch Transaksi
// =========================

const fetchDataAktifitas = async (noRekening) => {
    isLoading.value = true;

    const response = await useApi({
        api: `transaction_by_acc/${noRekening}`,
        token: localStorage.getItem("token"),
    });

    if (!response.ok) {
        isLoading.value = false;
        message.error("Gagal mengambil data transaksi");
        return;
    }

    dataAktifitas.value = response.data;

    isLoading.value = false;
};

// =========================
// Pilih Rekening
// =========================

const handleUpdateValue = async (value) => {
    selectedRekening.value = _.find(
        dataRekening.value,
        {
            no_rekening: value,
        }
    );

    await fetchDataAktifitas(value);
};

// =========================
// Kolom Data Table
// =========================

const columnsAktifitas = [
    {
        title: "Tgl Transaksi",
        key: "tgl_transaksi",
        render(row) {
            return h(
                "div",
                moment(row.tgl_transaksi).format("DDMMYYYY")
            );
        },
    },
    {
        title: "Buku",
        key: "buku",
    },
    {
        title: "Hal",
        key: "hal",
    },
    {
        title: "Baris",
        key: "baris",
    },
    {
        title: "Sandi",
        key: "tipe",
    },
    {
        title: "Nominal",
        key: "nominal",
        render(row) {
            return h(
                "div",
                row.nominal.toLocaleString()
            );
        },
    },
    {
        title: "Saldo",
        key: "saldo",
        render(row) {
            return h(
                "div",
                row.saldo.toLocaleString()
            );
        },
    },
];

// =========================
// Filter Transaksi
// =========================

const transaksiTerfilter = computed(() => {
    // Saat pertama kali load, tampilkan semua data
    if (!isFilterActive.value) {
        return dataAktifitas.value
    }

    const buku = Number(bukuFilter.value)

    const awalHal = Number(halBarisAwal.value.hal)
    const awalBaris = Number(halBarisAwal.value.baris)

    const akhirHal = Number(halBarisAkhir.value.hal)
    const akhirBaris = Number(halBarisAkhir.value.baris)

    return dataAktifitas.value.filter((t) => {
        if (Number(t.buku) !== buku) {
            return false
        }

        const hal = Number(t.hal)
        const baris = Number(t.baris)

        // Di luar range halaman
        if (hal < awalHal || hal > akhirHal) {
            return false
        }

        // Batas awal
        if (
            hal === awalHal &&
            baris < awalBaris
        ) {
            return false
        }

        // Batas akhir
        if (
            hal === akhirHal &&
            baris > akhirBaris
        ) {
            return false
        }

        return true
    })
})

watch(
    [
        () => bukuFilter.value,
        () => halBarisAwal.value.hal,
        () => halBarisAwal.value.baris,
        () => halBarisAkhir.value.hal,
        () => halBarisAkhir.value.baris
    ],
    () => {
        isFilterActive.value = true
    }
)




// =========================
// Print Kepala Buku
// =========================

const handleCetak = () => {
    const { handlePrint } = useVueToPrint({
        content: headArea,
        documentTitle: "Cetak Kepala Buku",
    });

    handlePrint();
};

// =========================
// Print Mutasi
// =========================

const handleCetakMutasi = () => {
    const { handlePrint } = useVueToPrint({
        content: printArea,
        documentTitle: "Cetak Mutasi",
    });

    handlePrint();
};

// =========================
// Mounted
// =========================

onMounted(() => {
    fetchData();
});
</script>
