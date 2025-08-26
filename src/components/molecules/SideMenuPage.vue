<template>
  <n-collapse accordion>
    <n-collapse-item v-for="menu in dataMenu" :key="menu.id" :title="menu.menuitem.labelmenu" :name="menu.menuitem.labelmenu">
      <div v-for="child in menu.menuitem.submenu" class="p-4 capitalize" :key="child.id" >
        <router-link to="menu" class="flex w-full">
        {{ child.sublabel }}||{{ menu.menuitem.routename }}||{{ child.subroute }}
      </router-link>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>
  
  <script setup>
import { h, onMounted, ref } from "vue";
import { NIcon } from "naive-ui";
import { useApi } from "../../helpers/axios";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

//   const menuOptions = [
//     {
//       label: "Hear the Wind Sing",
//       key: "hear-the-wind-sing",
//     },
//     {
//       label: "Pinball 1973",
//       icon: renderIcon(DefIcon),
//       children: [
//         {
//           label: "Rat",
//           key: "rat"
//         }
//       ]
//     },
//     {
//       label: "A Wild Sheep Chase",
//       key: "a-wild-sheep-chase",
//       disabled: true,
//       icon: renderIcon(DefIcon)
//     },
//     {
//       label: "Dance Dance Dance",
//       key: "Dance Dance Dance",
//       icon: renderIcon(DefIcon),
//       children: [
//         {
//           type: "group",
//           label: "People",
//           key: "people",
//           children: [
//             {
//               label: "Narrator",
//               key: "narrator",
//               icon: renderIcon(DefIcon)
//             },
//             {
//               label: "Sheep Man",
//               key: "sheep-man",
//               icon: renderIcon(DefIcon)
//             }
//           ]
//         },
//         {
//           label: "Beverage",
//           key: "beverage",
//           icon: renderIcon(DefIcon),
//           children: [
//             {
//               label: "Whisky",
//               key: "whisky"
//             }
//           ]
//         },
//         {
//           label: "Food",
//           key: "food",
//           children: [
//             {
//               label: "Sandwich",
//               key: "sandwich"
//             }
//           ]
//         },
//         {
//           label: "The past increases. The future recedes.",
//           key: "the-past-increases-the-future-recedes"
//         }
//       ]
//     }
//   ];
const dataMenu = ref([]);
const getDataMenu = async () => {
  let userToken = localStorage.getItem("token");
  try {
    const response = await useApi({
      method: "GET",
      api: "menu-sub-list",
      token: userToken,
    });
    // const labelArray = response.data.response.map(item => ({
    //   label: item.menuitem.labelmenu
    // }));
    dataMenu.value = response.data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  getDataMenu();
});
</script>