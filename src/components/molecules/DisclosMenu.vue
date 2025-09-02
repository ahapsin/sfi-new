<template>
  <div class="flex flex-col gap-1">
    <router-link to="/">
      <div class="flex gap-2  rounded-xl p-2 w-full hover:bg-pr-100 hover:text-white'"
        :class="$route.name === 'landing' ? 'bg-pr-50 text-pr font-bold' : 'bg-white'">
        <v-icon name="bi-grid" />
        DASHBOARD
      </div>
    </router-link>
   
      <n-text :name="menu.menuitem.labelmenu" v-for="menu in props.menus" :key="menu.menuid">
       
          <div class="text-[10px] text-gray-400 text-bold ps-2 capitalize">
            {{ menu.menuitem.labelmenu }}
          </div>
        
        <div v-for="submenu in menu.menuitem.submenu" class="py-1" :key="submenu">
          <router-link :to="`${menu.menuitem.routename}${submenu.subroute}`" v-slot="{ isActive }" @click="handleStart">
            <div class="flex gap-2  rounded-xl p-2 w-full" @click="
              width < 620
                ? (sideMenu.sideEffect = !sideMenu.sideEffect)
                : handleStart
              " :class="isActive ? 'bg-slate-200 text-pr font-semibold' : 'hover:bg-pr-100 hover:text-pr'">
              <v-icon :name="submenu.leading" />
              {{ submenu.sublabel?.toUpperCase() }}
            </div>
          </router-link>
        </div>
      </n-text>
  </div>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
import { ref } from "vue";
import { useSidebar } from "../../stores/sidebar";
const { width } = useWindowSize();
const sideMenu = useSidebar();

const disabledRef = ref(true);
const handleStart = () => {

  disabledRef.value = false;
};
const props = defineProps({
  menus: {
    type: Object,
  },
  typeMenus: {
    type: Boolean,
    default: true,
  },
});
</script>