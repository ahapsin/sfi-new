<template>
  <n-card class="shadow-md">
    <div v-if="menu.loading">
      <div class="flex flex-col gap-2">
        <n-skeleton height="10px" width="100px" round/>
        <n-space>
          <n-skeleton height="60px" width="60px" class="rounded-xl"/>
          <n-skeleton height="60px" width="60px" class="rounded-xl"/>
        </n-space>
      </div>
      <div class="flex flex-col gap-2 mt-2">
        <n-skeleton height="10px" width="100px" round/>
        <n-space>
          <n-skeleton height="60px" width="60px" class="rounded-xl"/>
          <n-skeleton height="60px" width="60px" class="rounded-xl"/>
          <n-skeleton height="60px" width="60px" class="rounded-xl"/>
        </n-space>
      </div>
    </div>
    <div class="grid grid-cols gap-4" v-else>
      <div v-for="colMenu in _.filter(menu.list, (o) => o.menuitem.labelmenu != 'home')" :key="colMenu.id">
        <div class="text-md py-1 text-pr capitalize border-l-2  ps-2  mb-2">
          <v-icon :name="colMenu.menuitem.leading[0]"/>
          {{ colMenu.menuitem.labelmenu }}</div>
        <div class="grid grid-cols-5 md:grid-cols-10">
          <div class="flex justify-center" v-for="colSubMenu in colMenu.menuitem.submenu" :key="colSubMenu.id">
            <router-link :to="`${colMenu.menuitem.routename}${colSubMenu.subroute}`">
              <div class="flex flex-col items-center">
                <div
                    class="flex flex-col cursor-pointer rounded-xl w-12 md:w-8 h-12 md:h-20 justify-center items-center bg-gradient-to-r border shadow">
                  <div class="w-10 h-10 flex items-center justify-center p-2">
                    <v-icon :name="colSubMenu.leading[0] ? colSubMenu.leading[0] : 'ri-apps-2-line'"/>
                  </div>
                </div>
                <n-ellipsis class="mt-1 text-xs capitalize">{{ colSubMenu.sublabel }}</n-ellipsis>
              </div>
               
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>
<script setup>
import _ from "lodash";
import {useMenuStore} from "../../stores/menu.js";

const menu = useMenuStore();
onMounted(() => menu.fetchData());
</script>
