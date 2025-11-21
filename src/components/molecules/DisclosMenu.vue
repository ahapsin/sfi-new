<template>
  <div class="flex flex-col gap-1">
    <div v-for="menu in props.menus" :key="menu.menuid">

      <div class="flex items-center justify-between gap-2 text-pr cursor-pointer" @click="toggleMenu(menu.menuid)">
        <div class="flex items-center justify-between gap-2 w-full p-2 rounded-lg hover:bg-pr-50" :class="openMenus.includes(menu.menuid) && 'bg-pr-50'">
          <div class="flex items-center gap-2">
            <v-icon :name="menu.menuitem.leading[0]" />
            <small class="text-pr font-bold">
              {{ menu.menuitem.labelmenu.toUpperCase() }}
            </small>
          </div>
          <div v-if="menu.menuitem.submenu?.length">
            <v-icon name="bi-chevron-up" v-if="openMenus.includes(menu.menuid)" />
            <v-icon name="bi-chevron-down" v-else />
          </div>
        </div>

      </div>

      <!-- SUBMENU -->
      <transition name="fade">
        <div v-if="openMenus.includes(menu.menuid)" class="ms-4 border-l border-pr-200 ps-2 mt-1">
          <div v-for="submenu in [...menu.menuitem.submenu].sort(
            (a, b) => a.sublabel.localeCompare(b.sublabel)
          )" :key="submenu.subroute">
            <router-link :to="`${menu.menuitem.routename}${submenu.subroute}`" v-slot="{ isActive }"
              @click="handleStart">
              <div class="flex transition-all gap-2 rounded-xl p-2 w-full cursor-pointer" :class="isActive
                  ? 'text-pr font-semibold bg-white border shadow'
                  : 'hover:bg-pr-50 hover:text-pr'
                " @click="
                  width < 620
                    ? (sideMenu.sideEffect = !sideMenu.sideEffect)
                    : handleStart
                  ">
                <v-icon :name="submenu.leading[0]" />
                {{ submenu.sublabel?.toUpperCase() }}
              </div>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
import { useSidebar } from "../../stores/sidebar";

const props = defineProps({
  menus: Object,
  typeMenus: {
    type: Boolean,
    default: true,
  },
});

const { width } = useWindowSize();
const sideMenu = useSidebar();

const openMenus = ref([]);

// Default semua menu terbuka
onMounted(() => {
  openMenus.value = props.menus.map((m) => m.menuid);
});

// Toggle submenu on click
const toggleMenu = (id) => {
  if (openMenus.value.includes(id)) {
    openMenus.value = openMenus.value.filter((m) => m !== id);
  } else {
    openMenus.value.push(id);
  }
};

const handleStart = () => { };
</script>