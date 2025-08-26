<template>
  <fpk-form :view-mode="true">
    <template #addition>
      <n-alert class="mb-2 sticky top-0 z-50" :show-icon="false">
        <div class="flex items-center justify-between">
          <n-text class="text-lg w-full">Konfirmasi</n-text>
          <div class="flex w-full  justify-end gap-2">
            <n-popover trigger="click">
              <template #trigger>
                <n-button type="primary">Konfirmasi</n-button>
              </template>
              <template #header>
                <n-text strong depth="1">
                  Konfirmasi Order
                </n-text>
              </template>
              <n-input type="textarea" autosize placeholder="isi catatan disini" v-model:value="keterangan" />
              <template #footer>
                <div class="flex gap-2">
                <n-button type="primary" secondary @click="handleClick('yes')">Setuju</n-button>
                <n-button secondary type="warning" @click="handleClick('revisi')">
                  Revisi
                </n-button>
                <n-button secondary type="error" @click="handleClick('no')">Tolak</n-button>
                </div>
              </template>
            </n-popover>
          </div>
        </div>
      </n-alert>
    </template>
  </fpk-form>
</template>

<script setup>
import { ref } from "vue";
import FpkForm from "./AddFpkPage.vue";
import { useApi } from "../../../helpers/axios";
import { useMessage } from "naive-ui";
import router from "../../../router";
import { useRoute } from "vue-router";

const keterangan = ref();
const loading = ref();
const message = useMessage();
const baseRoute = useRoute();
const idApp = baseRoute.params.idapplication;
let userToken = localStorage.getItem("token");
const handleClick = async (e) => {
  const bodyPost = {
    cr_application_id: idApp,
    flag: e,
    keterangan: keterangan.value,
  };
  console.log(bodyPost);
  loading.value = true;
  const response = await useApi({
    method: "POST",
    api: `application_approval_kapos`,
    data: bodyPost,
    token: userToken,
  });
  if (!response.ok) {
    message.error("konfirmasi gagal");
    loading.value = false;
  } else {
    message.success("konfirmasi berhasil");
    loading.value = false;
    router.push({ name: 'approval' });
  }
};
</script>
