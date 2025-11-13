<template>
  <SingleSideBar v-if="logged">
    <Dashboard/>
  </SingleSideBar>
  <div v-else
       
       :class="`h-screen flex items-center  justify-center max-h-screen bg-gradient-to-t from-pr-50 md:p-20`"
  >
    <div
        class="flex w-full h-full md:w-2/5 md:h-full bg-white md:rounded-lg overflow-clip shadow-md border"
    >
      <div class="items-center flex w-full p-8 md:p-10 h-full ">
        <LoginForm/>
      </div>
     
    </div>
    <div class="fixed bottom-0 bg-pr-100 w-full justify-center flex p-2 text-pr">los v. {{ appVersion }} @{{ appTitle }}</div>
  </div>
  
</template>
<script setup>
import {ref, onMounted} from 'vue';
import pjson from '../../../package.json';
import Dashboard from './DashboardPage.vue';
const appVersion = pjson.version;
const appAccentColor = import.meta.env.VITE_APP_ACCENT_COLOR;
const appTitle = import.meta.env.VITE_APP_TITLE;
const logged = ref(false);

onMounted(() => {
  appAccentColor;
  if (localStorage.getItem("token")) {
    logged.value = true;
  }
})

</script>
