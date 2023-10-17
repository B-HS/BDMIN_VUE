<template>
    <span class="absolute h-screen w-screen z-50 bg-base-200 opacity-50" v-if="useAppstore().getPageLoading()">
        <span class="absolute m-auto left-0 right-0 top-1/2 loading loading-lg loading-spinner text-primary"></span>
    </span>
</template>
<script setup lang="ts">
import { useAppstore } from '../store/modules/app'
</script>
