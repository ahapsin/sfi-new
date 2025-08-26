<template>
  <div class="py-2" v-show="props.pesan">
    <n-alert title="data ditemukan didaftar blacklist" type="warning">
      <template #icon>
        <n-icon>
          <block-icon />
        </n-icon>
      </template>
      {{ props.pesan }}
    </n-alert>
  </div>
</template>
<script setup>
import { BlockFilled as BlockIcon } from '@vicons/material'
import { onMounted, ref } from "vue";
import { useApi } from "../../helpers/axios";

const props = defineProps({
  pesan: String,
});
// const loader=ref(false);
// const dataCheck=ref([]);
// const userToken = localStorage.getItem("token");
// const hanldeCheck = async () => {
//   loader.value = true;
//   const bodyForm = {
//     param:123323,
//   };
//   const response = await useApi({
//     method: "POST",
//     api: "blacklist_detail",
//     data: bodyForm,
//     token: userToken,
//   });
//   if (!response.ok) {
//     loader.value = true;
//   } else {
//     dataCheck.value = response.data;
//     loader.value=false;
//   }
// };
// onMounted(hanldeCheck);
</script>
