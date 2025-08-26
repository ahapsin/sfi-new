<template>
  <canvas ref="canvas" style="display: none"></canvas>
  <div class="border rounded-xl p-2 flex items-center gap-2">
      <n-image
        v-if="state.resizedImage"
        :src="state.resizedImage"
        class="h-20 w-20 bg-pr"
      />
      <n-image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8bikI-KUuM1IWosgqDRS5jyv2U_PPYlG6Tg&s"
        v-else
        class="h-20 w-20 bg-pr"
      />
      <n-upload @change="beforeUpload" :show-file-list="false">
        <div class="flex flex-col">
            <!-- <n-gradient-text :size="24"> {{ props.title }}</n-gradient-text> -->
            <n-button tertiary type="primary"> {{ props.title }}</n-button>
        </div>
      </n-upload>
  </div>
</template>
  
  <script setup>
import { lyla } from "@lylajs/web";
import { useMessage } from "naive-ui";

const message = useMessage();
const userToken = localStorage.getItem("token");
import { computed, reactive, ref } from "vue";

const canvas = ref(null); // Reference to the canvas element

// State object to hold properties
const state = reactive({
  maxWidth: 1280, // Maximum width of the resized image
  maxHeight: 720, // Maximum height of the resized image
  resizedImage: null,
  image: computed(() => state.resizedImage), // The resized image data
  quality: 0.9, // JPEG quality
});
const downscaleImage = (ctx, img, width, height) => {
  ctx.drawImage(img, 0, 0, width, height);
  // Additional logic for downscaling in steps can be added here.
};
const resizeImage = (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;

      let newWidth = img.width;
      let newHeight = img.height;

      // Maintain aspect ratio and resize if necessary
      if (newWidth > state.maxWidth || newHeight > state.maxHeight) {
        if (newWidth > newHeight) {
          newWidth = state.maxWidth;
          newHeight = newWidth / aspectRatio;
        } else {
          newHeight = state.maxHeight;
          newWidth = newHeight * aspectRatio;
        }
      }

      const ctx = canvas.value.getContext("2d");

      // Set canvas dimensions based on new size
      canvas.value.width = newWidth;
      canvas.value.height = newHeight;

      // Optional: downscale the image in steps to improve quality
      downscaleImage(ctx, img, newWidth, newHeight);

      // Get the resized image data as a base64 URL (set quality for JPEG)
      state.resizedImage = canvas.value.toDataURL("image/jpeg", state.quality);
      // console.log(state.resizedImage);
      handleImagePost(state.resizedImage);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
};
const beforeUpload = (data) => {
  resizeImage(data.file.file);
};
const handleImagePost = () => {
  const bodyForm = {
    image: state.resizedImage,
    type: props.type,
    cr_prospect_id: props.idapp,
  };
  // const form = new FormData();
  // form.append("image", state.resizedImage);
  // form.append("type", data.type);
  // form.append("cr_prospect_id", idApp);
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  lyla
    .post(`https://dev.kspdjaya.id/${props.endpoint}`, {
      headers,
      json: bodyForm,
    })
    .then(() => {
      message.success("upload gambar berhasil");
    })
    .catch(() => {
      message.error("upload gambar gagal");
    });
};

const props = defineProps({
  title: String,
  endpoint: String,
  type: String,
  idapp: String,
});
// onMounted(()=>resizeImage());
</script>