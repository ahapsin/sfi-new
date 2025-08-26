<template>
        <n-space vertical>
                <n-input-number :default-value="1075" :parse="parse" :format="format" @blur:value="parse" />
                <n-input-number :default-value="1075" :parse="parseCurrency" :format="formatCurrency" />
        </n-space>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
        setup() {
                return {
                        parse: (input) => {
                                const nums = input.replace(/,/g, "").trim();
                                if (/^\d+(\.(\d+)?)?$/.test(nums))
                                        return Number(nums);
                                return nums === "" ? null : Number.NaN;
                        },
                        format: (value) => {
                                if (value === null)
                                        return "";
                                return value.toLocaleString("en-US");
                        },
                        parseCurrency: (input) => {
                                const nums = input.replace(/(,|\$|\s)/g, "").trim();
                                if (/^\d+(\.(\d+)?)?$/.test(nums))
                                        return Number(nums);
                                return nums === "" ? null : Number.NaN;
                        },
                        formatCurrency: (value) => {
                                if (value === null)
                                        return "";
                                return `${value.toLocaleString("en-US")} $`;
                        }
                };
        }
});
</script>