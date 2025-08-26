<template>
        <pre> {{ MenuOptions }}</pre>
        <n-space vertical>
                <n-switch v-model:value="accordion">
                        <template #checked>
                                Hide menu
                        </template>
                        <template #unchecked>
                                Show menu
                        </template>
                </n-switch>
                <n-menu :options="dataMenu" />
        </n-space>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useApi } from "../../helpers/axios"
import { useMessage } from "naive-ui";
import { NIcon } from "naive-ui";
import {
        Accessibility32Filled as BookIcon,
        AccessTime20Regular as PersonIcon
} from "@vicons/fluent";

const message = useMessage();
const dataMenu = ref();
const accordionRef = ref(false);
const getMenu = async () => {
        let userToken = localStorage.getItem("token");
        const response = await useApi({
                method: 'GET',
                api: 'menu-sub-list',
                token: userToken
        });
        if (!response.ok) {
                message.error(response.error.data.message);
        } else {
                dataMenu.value = response.data.response;
        }
}

function renderIcon(icon) {
        return () => h(NIcon, null, { default: () => h(icon) });
}
const MenuOptions = computed(() => [
        {
                label: "parent 1",
                icon: renderIcon(PersonIcon),
                key: "1",
                children: [
                        {
                                label: "1.1",
                                key: "2"
                        }
                ]
        },
        {
                label: "parent 2",
                key: "3",
                icon: renderIcon(BookIcon),
                show: !accordionRef.value,
                children: [
                        {
                                label: "2.1",
                                key: "4"
                        },
                        {
                                label: "2.2",
                                key: "5"
                        },
                        {
                                label: "2.3",
                                key: "6"
                        }
                ]
        }
]);
onMounted(() => getMenu());
</script>