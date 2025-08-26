<template>
  {{ columns }}
  <CardComp>
    <!-- <n-data-table :data="menu.list" :columns="columns" :pagination="10" /> -->
  </CardComp>
</template>
<script setup>
import { useMenuStore } from "../../../../stores/menu";
const menu = useMenuStore();
menu.fetchData("menu");
</script>