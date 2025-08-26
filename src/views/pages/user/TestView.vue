<template>
  <n-data-table :columns="columns" :data="list" :loading="loading" />
  <n-button @click="survey.fetchData">mount</n-button>
  <n-button @click="survey.$reset">reset</n-button>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSurveyStore } from "../../stores/survey";
const survey = useSurveyStore();
const { list, loading } = storeToRefs(survey);
const columns = [
  {
    title: "No",
    key: "id",
    sorter: "default",
  },
  {
    title: "Title",
    key: "nama_debitur",
  },
];
</script>