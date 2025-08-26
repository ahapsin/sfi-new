<template>
        <n-upload action="https://naive-upload.free.beeceptor.com/" :headers="{
                'naive-info': 'hello!'
        }" :data="{
        'naive-data': 'cool! naive!'
}" :custom-request="customRequest">
        </n-upload>
</template>
<script setup>
import { onMounted } from "vue";
import { lyla } from "@lylajs/web";
const customRequest = ({
        file,
        data,
        headers,
        withCredentials,
        action,
        onFinish,
        onError,
        onProgress
}) => {
        const formData = new FormData();
        if (data) {
                Object.keys(data).forEach((key) => {
                        formData.append(
                                key,
                                data[key]
                        );
                });
        }
        formData.append(file.name, file.file);
        lyla.post(action, {
                withCredentials,
                headers,
                body: formData,
                onUploadProgress: ({ percent }) => {
                        onProgress({ percent: Math.ceil(percent) });
                }
        }).then(({ json }) => {
                message.success(JSON.stringify(json));
                onFinish();
        }).catch((error) => {
                message.success(error.message);
                onError();
        });
};
onMounted(() => customRequest());
</script>