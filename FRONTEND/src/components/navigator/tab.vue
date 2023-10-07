<template>
    <section class="border-b p-2 gap-2 flex h-10 align-baseline">
        <section class="flex items-center" v-for="item in useTabStore().getCacheList()">
            <button class="btn btn-outline rounded-none btn-xs px-1" @click="router.push({ name: item })" :key="item">
                {{ item }}
            </button>
        </section>
    </section>
</template>
<script setup lang="ts">
import { router } from '../../router/router'
import { useTabStore } from '../../store/modules/tab'
</script>
