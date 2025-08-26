<template>
  <n-popconfirm positive-text="ok" negative-text="batal" :show-icon="false" @positive-click="handlePositiveClick"
   >
    <template #trigger>
      <n-button secondary type="warning" strong circle>
        <template #icon>
          <BlackIcon />
        </template>
      </n-button>
    </template>
    <div class="flex-col flex gap-y-2">
      <n-text>tambahakan ke daftar blacklist ?</n-text>
      <n-space><n-tag v-show="props.no_ktp">KTP : {{ props.no_ktp }}</n-tag>
        <n-tag v-show="props.no_kk" @close="props.no_kk == 'sdfsd'">KK : {{ props.no_kk }}</n-tag>
        <n-tag v-show="props.no_loan" @close="props.no_loan == null">No Loan : {{ props.no_loan }}</n-tag></n-space>
      <n-input placeholder="keterangan" type="textarea" size="small" style="min-width: 50%"
        v-model:value="dynamicForm.note" />
    </div>
  </n-popconfirm>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { BlockFilled as BlackIcon } from "@vicons/material";
import { useMessage } from 'naive-ui';
import { useApi } from "../../helpers/axios";

const props = defineProps({
  no_ktp: String,
  no_kk: String,
  no_loan: String,
})

const dynamicForm = reactive({

  ktp: computed(() => props.no_ktp),
  kk: computed(() => props.no_kk),
});
const message = useMessage();
const userToken = localStorage.getItem("token");
const handlePositiveClick = async () => {
  const response = await useApi({
    method: "post",
    api: "blacklist",
    data: dynamicForm,
    token: userToken,
  });
  if (!response.ok) {
    message.error('gagal menambahkan daftar blacklist');
  } else {
    message.success('daftar blacklist berhasil ditambahkan');
  }

}
</script>