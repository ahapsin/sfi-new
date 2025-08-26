<template>
        <n-upload action="https://kspdjaya.id/image_upload_prospect" :default-file-list="fileList" list-type="image-card">
                Foto Depan
        </n-upload>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
        setup() {
                const showModalRef = ref(false);
                const previewImageUrlRef = ref("");
                function handlePreview(file) {
                        const { url } = file;
                        previewImageUrlRef.value = url;
                        showModalRef.value = true;
                }
                return {
                        handlePreview,
                        showModal: showModalRef,
                        previewImageUrl: previewImageUrlRef,
                        fileList: ref([
                                {
                                        id: "a",
                                        name: "我是上传出错的普通文件.png",
                                        status: "error"
                                },
                                {
                                        id: "b",
                                        name: "我是普通文本.doc",
                                        status: "finished",
                                        type: "text/plain"
                                },
                                {
                                        id: "c",
                                        name: "我是自带url的图片.png",
                                        status: "finished",
                                        url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                                },
                                {
                                        id: "d",
                                        name: "我是上传进度99%的文本.doc",
                                        status: "uploading",
                                        percentage: 70
                                }
                        ]),
                        previewFileList: ref([
                                {
                                        id: "react",
                                        name: "我是react.png",
                                        status: "finished",
                                        url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                                },
                                {
                                        id: "vue",
                                        name: "我是vue.png",
                                        status: "finished",
                                        url: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                                }
                        ])
                };
        }
});
</script>