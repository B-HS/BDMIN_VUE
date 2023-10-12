<template>
    <section class="border-b p-2 gap-2 flex h-10 align-baseline">
        <section class="flex items-center" v-for="item in useTabStore().getCacheList()">
            <button class="btn btn-outline rounded-none btn-xs px-1 border-r-0" @click="router.push({ name: item })" :key="item">
                {{ item }}
            </button>
            <button class="btn btn-outline rounded-none btn-xs px-0.5 border-l-0"><XMarkIcon class="w-3" /></button>
        </section>
    </section>
</template>
<script setup lang="ts">
import { router } from '../../router/router'
import { useTabStore } from '../../store/modules/tab'
import { XMarkIcon } from '@heroicons/vue/24/solid'
</script>
