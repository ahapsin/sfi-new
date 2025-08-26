import { computed, ref } from "vue";

import { defineStore } from "pinia";
import { useApi } from "../helpers/axios";

const token = localStorage.getItem("token");
export const useSurveyStore = defineStore("survey", () => {
  const list = ref([]);
  const loading = ref(false);
  const setData = (e) => {
    list.value = e;
  };
  const fetchData = async () => {
    loading.value = true;
    const response = await useApi({
      method: "get",
      api: "kunjungan",
      token: token,
    });
    if (!response.ok) {
      console.log("error");
      loading.value = true;
    } else {
      loading.value = false;
      list.value = response.data.response;
    }
  };
  const deletedData = () => {
    list.value--;
    console.log(token);
  };
  function $reset() {
    list.value = [];
  }
  const doubleCount = computed(() => list.value * 2);
  return {
    list,
    setData,
    loading,
    fetchData,
    deletedData,
    doubleCount,
    $reset,
  };
});
