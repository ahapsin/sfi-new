<template>
  <div class="flex gap-2">
    <n-form-item label="Tanggal" class="w-1/6">
      <n-select v-model:value="selectedDay" :options="days" placeholder="Pilih hari" clearable />
    </n-form-item>
    <n-form-item label="Cari">
      <n-input placeholder="Cari" v-model:value="searchBox" clearable />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleCari">Cari</n-button>
    </n-form-item>
    <n-form-item>
       <json-excel :data="showData" :name="`Laporan Aging`"
                      :stringifyLongNum="true">
            <n-button type="success" secondary>Download Xls</n-button>
          </json-excel>
    </n-form-item>
  </div>
  <n-data-table ref="tableRef" :header-height="48" :columns="columns" :data="showData" :loading="loading"
     :pagination="{ pageSize: 10 }" />
</template>

<script setup>
import { ref } from "vue";
const selectedDay = ref(null)
import JsonExcel from "vue-json-excel3";
import { useSearch } from "../../../../helpers/searchObject";
import _ from "lodash";
const props = defineProps({
  loading: Boolean,
  columns: Array,
  available: {
    type: Boolean,
    default: false,
  },
  data: Object
})
const tableRef = ref();
const days = Array.from({ length: 31 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1
}))
const searchBox = ref();
const emit = defineEmits('cari');

const showData = computed(() => {
    
  let data = props.data;

  
  if (selectedDay.value) {
    const target = String(selectedDay.value).padStart(2, "0");

    data = _.filter(data, (item) => {
      const day = item.tgl_cair?.slice(0, 2); 
      return day === target;
    });
  }
  return useSearch(data, searchBox.value);
});


</script>
