<template>
  <n-layout class="h-screen">
    <n-layout position="absolute" has-sider>
      <n-layout-sider :width='200' :collapsed-width="0" :show-collapsed-content="false"
        :collapsed="sideMenu.sideEffect ? true : false" 
        class="absolute md:relative h-full z-20 shadow-xl md:shadow-none" bordered>
        <n-scrollbar>
          <div class="flex sticky sticky-top top-0 bg-white z-50 p-2 gap-2">
             <!-- <n-button circle text @click="sideMenu.sideEffect = !sideMenu.sideEffect" color="#424242"
              v-if="width > 450">
              <template #icon>
                <v-icon name="bi-grid" v-if="sideMenu.sideEffect" />
                <v-icon name="bi-grid-fill" v-else />
              </template>
            </n-button> -->
            <img class="h-[36px] md:h-[36px]" :src="applogo" alt="logo_company" />
              <div class="flex flex-col items-left justify-center">
                <n-ellipsis style="max-width: 150px">{{ apptitle }}</n-ellipsis>
                <span class="text-[10px]">v. {{ appVersion }}</span>
              </div>
          </div>
          <div class="p-2">
            <SideMenu />
          </div>
        </n-scrollbar>
      </n-layout-sider>
      <n-layout :class="`bg-pr-50`">
        <div class="p-0 md:p-4">
          <n-page-header @back="handleBack">
            <template #header>
              <n-breadcrumb v-if="width > 480">

                <n-breadcrumb-item @click="router.push('/')">DASHBOARD</n-breadcrumb-item>
                <n-breadcrumb-item v-if="$route.name != 'landing'">{{ $route.name?.toUpperCase() }}</n-breadcrumb-item>
              </n-breadcrumb>
            </template>
          </n-page-header>
          <RouterView />
          <slot />
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
  <n-drawer v-model:show="active" placement="left">
    <n-drawer-content>
      <logo-header />
      <side-menu />
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import {
  ChevronLeft as BackIcon
} from "@vicons/tabler";
import { useWindowSize } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import pjson from '../../../package.json';
import router from "../../router";
import { useSidebar } from "../../stores/sidebar";

const route = useRoute();
const applogo = import.meta.env.VITE_APP_LOGO;
const appbase = import.meta.env.VITE_APP_BASE_COLOR;
const appbackdrop = import.meta.env.VITE_APP_BACKDROP;
const appVersion = pjson.version;
const { width } = useWindowSize();

const sideMenu = useSidebar();
const active = ref(false);
const apptitle = import.meta.env.VITE_APP_TITLE;
const collapse = ref(false);
const ukuran = ref(0);
const widthScreen = () => {
  ukuran.value = width.value;
  if (ukuran.value < 620) {
    sideMenu.sideEffect = true;
    collapse.value = true;
  } else {
    sideMenu.sideEffect = false;
    collapse.value = false;
  }
};
onMounted(() => widthScreen());
</script>

