<template>
  <SingleSideBar v-if="logged">
    <Dashboard/>
  </SingleSideBar>
  <div v-else
       
       :class="`h-screen flex items-center  justify-center max-h-screen  md:p-20`"
  >
    <div
        class="flex w-full h-full md:w-2/5 md:h-full bg-white md:rounded-lg overflow-clip"
    >
      <div class="items-center flex w-full p-8 md:p-10 h-full">
        <LoginForm/>
      </div>
     
    </div>
    <div class="fixed bottom-0 bg-slate-50 w-full justify-center flex p-2 text-gray-400">los v. {{ appVersion }} @sakurafinansial</div>
  </div>
  
</template>
<script setup>
import {ref, onMounted} from 'vue';
import pjson from '../../../package.json';
import Dashboard from './DashboardPage.vue';
const appVersion = pjson.version;
const appAccentColor = import.meta.env.VITE_APP_ACCENT_COLOR;
const logged = ref(false);

onMounted(() => {
  appAccentColor;
  if (localStorage.getItem("token")) {
    logged.value = true;
  }
})

</script>
