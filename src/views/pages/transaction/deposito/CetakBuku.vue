<template>
    <div class="flex gap-4 w-full">
        <div class="w-full">
            <n-space vertical>
                <n-card :class="`shadow-md`"  title="Cetak Bilyet" :segmented="true" size="small">
                    <n-form-item label="Pilih No Deposito" class="w-full">
                        <n-select filterable v-model:value="rekening" :options="selectOptions"
                            @update:value="handleUpdateValue" />
                    </n-form-item>
                    <n-card :class="`shadow-md`"  v-if="selectedRekening" embedded title="Detail Bilyet" size="small" :segmented="true">
                        <template #header-extra>
                            <n-space>
                                <n-button type="primary" @click="printBillyet">Cetak Billyet</n-button>
                                <n-button type="primary" @click="printSnk">Cetak S&K</n-button>
                            </n-space>
                        </template>
                        <div class="border border-black p-4 bg-yellow-50 h-[13.5cm]" ref="billyetRef">
                            <div class="flex justify-between">
                                <div class="flex gap-4">
                                    <img class="h-10 md:h-10" :src="applogo" alt="logo_company" />
                                    <div class="flex flex-col items-left justify-center">
                                        <n-text class="text-[20px]" strong>{{ apptitle }}</n-text>
                                        <span class="text-[12.361px]">Jl. Ahmad Yani, Larangan, Lemahwungkuk, Kota
                                            Cirebon</span>
                                    </div>
                                </div>
                                <div class="border border-black">
                                    <div class="bg-black">
                                        <n-text strong class="text-white px-2">BILYET SIMPANAN BERJANGKA </n-text>
                                    </div>
                                    <div class="flex justify-center">
                                        <n-text strong class="px-2">NO .BILYET : {{ selectedRekening.no_deposito }}
                                        </n-text>
                                    </div>
                                </div>
                            </div>
                            <div class="pt-4">
                                <n-text strong>kami menegaskan simpanan berjangka Saudara pada kami sesuai dengan
                                    rincian
                                    sebagai berikut:</n-text>
                            </div>
                            <div class="flex w-full pt-4 gap-4">
                                <div class="w-2/3">
                                    <div class="flex flex-col border p-2 border-black">
                                        <n-text strong italic>Kepada Yth.</n-text>
                                        <n-text strong>{{ selectedRekening.nama_nasabah }}</n-text>
                                        {{ selectedRekening.alamat }}
                                    </div>
                                    <div class="flex flex-col border mt-4 p-2 border-black">
                                        <n-text> Bunga setiap bulan akan dibayarkan ke :
                                        </n-text>
                                        <n-text strong>{{ selectedRekening.no_rek_sumber_dana }}</n-text>
                                        <n-text strong>{{ selectedRekening.nama_sumber_dana }}</n-text>
                                    </div>
                                    <div class="flex flex-col border mt-4 p-2 border-black">
                                        <n-text> Pada tanggal jatuh tempo, pokok akan dikreditkan ke :</n-text>
                                        <n-text strong>{{ selectedRekening.no_rek_tujuan }}</n-text>
                                        <n-text strong>{{ selectedRekening.nama_rek_tujuan }}</n-text>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <table>
                                        <tr>
                                            <td class="w-[160px]">No.Rekening</td>
                                            <td>:</td>
                                            <td>{{ selectedRekening.no_deposito }}</td>
                                        </tr>
                                        <tr>
                                            <td>Sukuk Bunga</td>
                                            <td>:</td>
                                            <td>{{ selectedRekening.suku_bunga }}% per tahun</td>
                                        </tr>
                                        <tr>
                                            <td>Jangka Waktu</td>
                                            <td>:</td>
                                            <td>{{ selectedRekening.tempo }} ( {{ terbilang(selectedRekening.tempo) }} )
                                                bulan</td>
                                        </tr>
                                        <tr>
                                            <td>Tanggal Valuta</td>
                                            <td>:</td>
                                            <td>{{ selectedRekening.tanggal_valuta }}</td>
                                        </tr>
                                        <tr>
                                            <td>Tanggal Jatuh Tempo</td>
                                            <td>:</td>
                                            <td>{{ selectedRekening.tanggal_jth_tmpo }}</td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah Pokok</td>
                                            <td>:</td>
                                            <td>Rp. {{ selectedRekening.jumlah_pokok.toLocaleString() }}</td>
                                        </tr>
                                    </table>
                                    <div class="border border-black p-2 flex flex-col mt-2">
                                        <n-text italic>Terbilang</n-text>
                                        <n-text strong class="justify-center flex">==={{
                                            terbilang(selectedRekening.jumlah_pokok)
                                            }} Rupiah===</n-text>
                                    </div>
                                    <div class="mt-4">
                                        <div class="flex justify-center strong"><strong>KSP SAKURA FINANSIAL
                                                INDONESIA</strong></div>
                                        <div class="h-[2cm]"></div>
                                        <div class="flex justify-around">
                                            <div>
                                                <n-text underline strong class="block">DEVIN CAHYANI</n-text>
                                                <n-text class="text-[12px]" strong>Manager Operasional</n-text>
                                            </div>
                                            <div>
                                                <n-text underline strong class="block">LYDIA MASEHI</n-text>
                                                <n-text class="text-[12px]" strong>Ketua</n-text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <n-divider>Halaman Belakang</n-divider>
                        <div class="border border-black p-4 bg-yellow-50 h-[13.5cm]" ref="halBelakang">
                            <div class="flex justify-center font-bold p-2 border-b border-black">SYARAT - SYARAT SIMPANAN BERJANGKA</div>
                            <div class="flex gap-10 p-2 text-[10px]">
                                <div>
                                    <ol class="list-decimal list-inside space-y-2">
                                        <li>
                                            Simpanan Berjangka hanya dapat dibayar kembali pada tanggal jatuh tempo di
                                            kantor KSP SAKURA
                                            FINANSIAL INDONESIA,
                                            dimana Simpanan Berjangka dibuka. Penarikan sebagian atau seluruhnya atas
                                            jumlah Simpanan Berjangka
                                            sebelum jatuh tempo tidak diperkenankan.
                                        </li>
                                        <li>
                                            Perubahan nama anggota, tanda tangan dan lain-lain yang menyangkut data
                                            keterangan yang pernah
                                            diberikan kepada KSP SAKURA FINANSIAL INDONESIA
                                            harus segera diberitahukan kepada koperasi secara tertulis.
                                        </li>
                                        <li>
                                            Dalam hal Simpanan Berjangka dibukakan atas nama dua orang, maka:
                                            <ol class="list-[lower-alpha] list-inside ml-5 space-y-1">
                                                <li>
                                                    Untuk Simpanan Berjangka dengan status “ATAU” serta “DAN / ATAU”
                                                    apabila salah satu pihak
                                                    meninggal dunia,
                                                    pihak yang masih hidup atau ahli waris yang sah menurut hukum berhak
                                                    menarik jumlah yang
                                                    terdapat pada
                                                    Bilyet Simpanan Berjangka beserta bunga pada tanggal jatuh tempo.
                                                </li>
                                                <li>
                                                    Untuk Simpanan Berjangka dengan status “DAN” apabila salah satu
                                                    pihak meninggal dunia, maka
                                                    pihak ahli waris
                                                    yang sah menurut hukum bersama pihak yang masih hidup berhak menarik
                                                    jumlah yang terdapat
                                                    pada Bilyet
                                                    Simpanan Berjangka beserta bunga pada tanggal jatuh tempo. Koperasi
                                                    akan memberikan sejumlah
                                                    hasil,
                                                    kecuali pihak ahli waris tersebut telah menyelesaikan
                                                    persyaratan-persyaratan yang berlaku.
                                                </li>
                                            </ol>
                                        </li>
                                        <li>
                                            Apabila Bilyet Simpanan Berjangka hilang atau dicuri, deposan harus segera
                                            melaporkan kepada
                                            Koperasi dengan
                                            disertai surat keterangan dari kepolisian, disamping membuat pernyataan
                                            secara tertulis atas segala
                                            kemungkinan
                                            yang timbul atas kehilangan Bilyet Simpanan Berjangka tersebut.
                                        </li>
                                        <li>
                                            Bunga Simpanan Berjangka dibayar pada saat jatuh tempo bunga atau pada saat
                                            jatuh tempo nominal
                                            bilamana dihitung
                                            dari tanggal valuta sampai tanggal jatuh tempo. Dengan tarif bunga sesuai
                                            ketentuan berlaku.
                                        </li>
                                    </ol>

                                </div>
                                <div>
                                    <ol start="6" class="list-decimal list-inside space-y-2">
                                        <li>
                                            Simpanan Berjangka tidak dapat dipindah tangankan. Pencairan Simpanan
                                            Berjangka dan bunganya hanya
                                            dapat dilakukan
                                            oleh deposan sendiri atau kuasanya berdasarkan surat KUASA YANG SAH MENURUT
                                            HUKUM DAN BERMETERAI
                                            CUKUP.
                                            Apabila deposan meninggal dunia, maka jumlah yang tertera dalam Bilyet
                                            Simpanan Berjangka tersebut
                                            beserta
                                            bunganya akan dibayarkan kepada ahli warisnya yang sah menurut hukum.
                                        </li>
                                        <li>
                                            Simpanan Berjangka dapat diperpanjang secara otomatis sesuai permintaan
                                            deposan dengan tingkat suku
                                            bunga yang
                                            berlaku saat perpanjangan. Jika Simpanan Berjangka akan dicairkan / diubah
                                            maka deposan wajib
                                            memberitahukan
                                            kepada kantor KOPERASI SAKURA FINANSIAL INDONESIA, yang menerbitkan Bilyet
                                            Simpanan Berjangka
                                            selambat-lambatnya
                                            3 (tiga) hari kerja sebelum tanggal jatuh tempo nominal.
                                        </li>
                                        <li>
                                            Bunga atas Simpanan Berjangka tidak akan diperhitungkan sudah tanggal jatuh
                                            tempo nominal, kecuali
                                            bila diperpanjang kembali.
                                        </li>
                                        <li>
                                            Simpanan Berjangka ini hanya dapat dijaminkan untuk pinjaman yang diberikan
                                            oleh KSP SAKURA
                                            FINANSIAL INDONESIA dan
                                            tidak dapat dijaminkan di koperasi atau pihak lain lainnya.
                                        </li>
                                        <li>
                                            Selain ketentuan-ketentuan tersebut di atas, deposan menyatakan tunduk pada
                                            semua ketentuan yang
                                            berlaku pada
                                            Koperasi baik yang sekarang ada maupun yang akan ada di kemudian hari.
                                        </li>
                                    </ol>
                                    <p class="mt-4">
                                        Pada saat pencairan Simpanan Berjangka, mohon dilakukan pencairan Simpanan
                                        Berjangka ini, sebagai
                                        berikut:
                                    </p>

                                    <p class="mt-2">
                                        <strong>Tunai</strong><br>
                                        _________________________
                                    </p>
                                </div>
                            </div>
                        </div>
                    </n-card>
                </n-card>
            </n-space>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useApi } from '../../../../helpers/axios';
import _ from 'lodash'
import moment from 'moment';
import { useVueToPrint } from 'vue-to-print';
const applogo = import.meta.env.VITE_APP_LOGO;
const apptitle = import.meta.env.VITE_APP_TITLE;

const appCompany = import.meta.env.VITE_APP_TITLE;
const selectedRekening = ref(null);
const selectOptions = ref([]);
const isLoading = ref(false);
const dataRekening = ref([]);
const dataAktifitas = ref([]);
const startRow = ref(0);
const printArea = ref();
const headArea = ref();

function formatTanggalIndoIntl(tgl) {
    const [day, month, year] = tgl.split('-')
    const dateObj = new Date(`${year}-${month}-${day}`)

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(dateObj)
}
const bukuFilter = ref(1)
const halBarisAwal = ref({ hal: 1, baris: 1 })
const halBarisAkhir = ref({ hal: 2, baris: 1 })

const billyetRef = ref();
const halBelakang=ref();
const printBillyet = () => {
    const { handlePrint } = useVueToPrint({
        content: billyetRef,
        documentTitle: "Billyet",
    });
    handlePrint();
}
const printSnk = () => {
    const { handlePrint } = useVueToPrint({
        content: halBelakang,
        documentTitle: "Halaman Belakang Syarat & Ketentuan",
    });
    handlePrint();
}
const fetchData = async () => {
    selectedRekening.value = null;
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
        dataRekening.value = response.data;
        selectOptions.value = response.data.map(row => ({
            label: `${row.no_deposito} ${row.nama_pemilik}`,
            value: row.no_deposito,
            disabled: row.status === 'inactive'
        }));
    }
}
const FetchDataDepo = async (e) => {
    selectedRekening.value = null;
    isLoading.value = true;
    const response = await useApi({
        api: `deposits/${e}`,
        method: 'GET',
        token: localStorage.getItem('token')
    });
    if (!response.ok) {
        message.error("error");
        isLoading.value = false;
    } else {
        isLoading.value = false;
        selectedRekening.value = response.data;
    }
}



const handleUpdateValue = async (val, options) => {
    selectedRekening.value = val;
    await FetchDataDepo(val);

}
function formatKey(key) {
    return key.replace(/_/g, ' ')
}

const handleCetak = () => {
    const { handlePrint } = useVueToPrint({
        content: headArea,
        documentTitle: "Cetak Kepala Buku",
    });
    handlePrint()
}
const handleCetakMutasi = () => {
    const { handlePrint } = useVueToPrint({
        content: printArea,
        documentTitle: "Cetak Mutasi",
    });
    handlePrint(printArea.value)
}
const maskNumber = (value) => {
    const visible = 6
    const maskedPart = '*'.repeat(value.length - visible)
    const visiblePart = value.slice(-visible)
    return maskedPart + visiblePart
}

function posisiAsNumber(hal, baris) {
    return hal + baris / 100
}
const transaksiTerfilter = computed(() => {
    const awal = posisiAsNumber(halBarisAwal.value.hal, halBarisAwal.value.baris)
    const akhir = posisiAsNumber(halBarisAkhir.value.hal, halBarisAkhir.value.baris)

    return _.filter(dataAktifitas.value, t => {
        if (t.buku !== bukuFilter.value) return false
        const posisi = posisiAsNumber(t.hal, t.baris)
        return posisi >= awal && posisi <= akhir
    })
})

function terbilang(nilai) {
    // deklarasi variabel nilai sebagai angka matemarika
    // Objek Math bertujuan agar kita bisa melakukan tugas matemarika dengan javascript
    nilai = Math.floor(Math.abs(nilai));

    // deklarasi nama angka dalam bahasa indonesia
    var huruf = [
        '',
        'Satu',
        'Dua',
        'Tiga',
        'Empat',
        'Lima',
        'Enam',
        'Tujuh',
        'Delapan',
        'Sembilan',
        'Sepuluh',
        'Sebelas',
    ];

    // menyimpan nilai default untuk pembagian
    var bagi = 0;
    // deklarasi variabel penyimpanan untuk menyimpan proses rumus terbilang
    var penyimpanan = '';

    // rumus terbilang
    if (nilai < 12) {
        penyimpanan = ' ' + huruf[nilai];
    } else if (nilai < 20) {
        penyimpanan = terbilang(Math.floor(nilai - 10)) + ' Belas';
    } else if (nilai < 100) {
        bagi = Math.floor(nilai / 10);
        penyimpanan = terbilang(bagi) + ' Puluh' + terbilang(nilai % 10);
    } else if (nilai < 200) {
        penyimpanan = ' Seratus' + terbilang(nilai - 100);
    } else if (nilai < 1000) {
        bagi = Math.floor(nilai / 100);
        penyimpanan = terbilang(bagi) + ' Ratus' + terbilang(nilai % 100);
    } else if (nilai < 2000) {
        penyimpanan = ' Seribu' + terbilang(nilai - 1000);
    } else if (nilai < 1000000) {
        bagi = Math.floor(nilai / 1000);
        penyimpanan = terbilang(bagi) + ' Ribu' + terbilang(nilai % 1000);
    } else if (nilai < 1000000000) {
        bagi = Math.floor(nilai / 1000000);
        penyimpanan = terbilang(bagi) + ' Juta' + terbilang(nilai % 1000000);
    } else if (nilai < 1000000000000) {
        bagi = Math.floor(nilai / 1000000000);
        penyimpanan = terbilang(bagi) + ' Miliar' + terbilang(nilai % 1000000000);
    } else if (nilai < 1000000000000000) {
        bagi = Math.floor(nilai / 1000000000000);
        penyimpanan = terbilang(nilai / 1000000000000) + ' Triliun' + terbilang(nilai % 1000000000000);
    }

    // mengambalikan nilai yang ada dalam variabel penyimpanan
    return penyimpanan;
}

onMounted(() => { fetchData() });
</script>