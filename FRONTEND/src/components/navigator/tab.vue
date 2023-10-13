<template>
    <section class="flex w-full h-10 border-b">
        <section class="tooltip w-11 flex items-center border-r" :data-tip="`Refresh the current page`" @click="useTabStore().refreshCurrentTab()">
            <button class="btn btn-outline btn-sm rounded-none border-none h-full"><ArrowPathIcon class="w-5" /></button>
        </section>
        <section class="p-2 gap-2 flex align-baseline">
            <section class="flex items-center" v-for="item in useTabStore().getCacheList()">
                <button class="btn btn-outline rounded-none btn-xs px-1 border-r-0" @click="router.push({ name: item })" :key="item">
                    {{ item }}
                </button>
                <button class="btn btn-outline rounded-none btn-xs px-0.5 border-l-0" @click="useTabStore().removeCache(item)">
                    <XMarkIcon class="w-3" />
                </button>
            </section>
        </section>
    </section>
</template>
<script setup lang="ts">
import { ArrowPathIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { router } from '../../router/router'
import { useTabStore } from '../../store/modules/tab'
</script>
