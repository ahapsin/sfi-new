<template>
        <n-upload ref="upload" name="image" action="https://api.kspdjaya.id/image_upload_prospect" :data="{
                'cr-prospect-id': '99', 'type': 'ktp'
        }" :headers="{
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
        }" :custom-request="customRequest">
                <n-button>Upload</n-button>
        </n-upload>
</template>

<script>
import { defineComponent, ref } from "vue";
import { lyla } from "@lylajs/web";
import axios from "axios";
import { useMessage } from "naive-ui";


export default defineComponent({
        setup() {
                const bearerToken = localStorage.getItem("token");
                const upload = ref(null);
                const message = useMessage();
                const customRequest = ({
                        file,
                        withCredentials,
                        headers,
                        action,
                        onFinish,
                        onError,
                        onProgress
                }) => {
                        let bodyData = {
                                image: file.file,
                                cr_prospect_id: '32d34',
                                type: 'ktp',
                        }
                        const headersxhr = {
                                'Authorization': `Bearer 190|sIOTzv2UNlKKmbB3mGUPMxVffhbdNBF6juGcNwtadfb296dd`,
                                'Content-Type': 'application/json',
                                'Content-Type': 'multipart/form-data'
                        };

                        axios.post('https://api.kspdjaya.id/image_upload_prospect', bodyData, {
                                headers: headersxhr,
                        }).then((json) => {
                                console.log(json);
                                onFinish();
                        }).catch((error) => {
                                console.log(headersxhr);
                                message.success(error.message);
                                onError();
                        });
                };
                return {
                        customRequest, upload
                };
        }
});
</script>