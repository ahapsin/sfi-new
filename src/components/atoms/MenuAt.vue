<template>
    <div
        :class="`min-w-full text-sm  dark:text-pr-500 cursor-pointer p-1 hover:bg-plate/50 rounded-md hover:text-primary flex items-center justify-between`">
        <div class="flex items-center">
            <div class="">
                <slot name="leading"></slot>
            </div>
            <span class=" flex">
                <slot name="label"></slot>
            </span>
        </div>
        <div>
            <slot name="action"></slot>
        </div>
    </div>
</template>
<script setup>
</script>