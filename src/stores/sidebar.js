import { defineStore } from "pinia";
import { ref } from "vue";
export const useSidebar = defineStore("sidebar", () => {
  const sidebar = ref();
  const sideEffect = (valSide) => {
    sidebar.value = valSide;
  };
  return { sidebar, sideEffect };
});
