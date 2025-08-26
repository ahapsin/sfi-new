import _ from 'lodash'
import { defineStore } from "pinia";
import { ref } from "vue";
export const useJaminanStore = defineStore("jaminan", () => {
  const listJaminan = ref([]);
  const storeJaminan = (jaminanData) => {
    listJaminan.value.push(jaminanData);
  };
  const filledJaminan = (jaminanData) => {
    listJaminan.value=[];
    Object.assign(listJaminan.value,jaminanData)
  };
  const removeJaminan = (e) => {
    let index = _.findIndex(listJaminan.value, e);
    listJaminan.value.splice(index, 1);
  }
  const updateJaminan = (e) => {
    let index = _.findIndex(listJaminan.value, { 'counter_id': e.id });
    Object.assign(listJaminan.value[index],e);
  }
  const initJaminan=()=>{
    listJaminan.value=[];
  }
  return { initJaminan, listJaminan, filledJaminan, storeJaminan,removeJaminan, updateJaminan };
});
