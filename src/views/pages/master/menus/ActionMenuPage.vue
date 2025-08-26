<template>
  <n-card :segmented="{
    content: true,
    footer: 'soft',
  }" :title="`Form ${$route.name}`">
    <n-form ref="formRef" :model="dynamicForm" :rules="rules" :label-placement="width <= 920 ? 'top' : 'left'"
      require-mark-placement="right-hanging"  label-width="auto">
      <n-alert v-show="errorAPI" title="Peringatan" type="warning" closable class="my-4">
        {{ errorAPI }}
      </n-alert>
      <n-form-item label="Nama Menu">
        <n-input placeholder="nama menu" v-model:value="dynamicForm.menu_name" />
      </n-form-item>
      <n-form-item label="Nama Route">
        <n-input placeholder="nama Route" v-model:value="dynamicForm.route" :disabled="param" />
      </n-form-item>
      <n-form-item label="Parent" v-if="!param">
        <n-select v-model:value="dynamicForm.parent" filterable label-field="menu_name" value-field="id"
          placeholder="parent menu" :options="dataMenu" :loading="loadingMenu"/>
      </n-form-item>
    </n-form>
    <template #action>
      <n-space>
        <n-button :loading="loading" type="primary" @click="handleSave">
          <span v-if="!param">Simpan</span>
          <span v-else>Ubah</span>
        </n-button>
        <n-button type="error" @click="handleCancel"> Batal </n-button>
      </n-space>
    </template>
  </n-card>
</template>
<script setup>
import { useMessage } from "naive-ui";
import { ref, reactive, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();
import { useApi } from "../../../../helpers/axios";
import router from "../../../../router";
import { useRoute } from "vue-router";


const dynamicForm = reactive({
  menu_name: "",
  route: "",
  parent: "",
  order: 1,
  leading: "ri-folder-open-line,ri-folder-open-fill",
  action: "",
});
const loading = ref(false);
const formRef = ref(null);
const errorAPI = ref(null);
const message = useMessage();

const baseRoute = useRoute();
const param = baseRoute.params.idMenu;
const userToken = localStorage.getItem("token");

const rules = {
  CODE: {
    required: true,
    trigger: ["blur", "input"],
    message: "nama wajib diisi",
  },
  NAME: {
    required: true,
    trigger: ["blur"],
    message: "nama wajib diisi",
  },
};

const handleCancel = () => router.go(-1);
const dataMenu = ref([]);
const response = () =>
  useApi({
    method: "get",
    api: `menu/${param}`,
    token: userToken,
  }).then((res) => {
    if (res.ok) {
      dataMenu.value = res.data.response;
      Object.assign(dynamicForm, dataMenu.value[0]);
    }
  });

const handleSave = async () => {
  loading.value = true;

  const response = await useApi({
    method: param ? "PUT" : "POST",
    api: param ? `menu/${param}` : "menu",
    data: dynamicForm,
    token: userToken,
  });

  if (!response.ok) {
    message.error("data gagal disimpan");
    loading.value = false;
    errorAPI.value = response.error.data.message;
  } else {
    message.success("data berhasil disimpan");
    loading.value = false;
    router.replace({ name: "menu" });
  }
};
const loadingData=ref(false);
const getMenu = async () => {
  loadingData.value = true;

  const response = await useApi({
    method: "GET",
    api: "menu",
    data: dynamicForm,
    token: userToken,
  });

  if (!response.ok) {
    loadingData.value = false;
    errorAPI.value = response.error.data.message;
  } else {
    loadingData.value = false;
    dataMenu.value = response.data.response;
  }
};
onMounted(() => {
  if (param) { response() }
  getMenu();
});
</script>