<template>
    <section
        class="h-screen transition-all overflow-hidden border-r"
        :style="{ width: useAppstore().getMenuHide() ? '0px' : useAppstore().getMenubarWidth() + 'px' }"
    >
        <header @click="router.push('/')" class="bg-base-neutral-content p-3 text-center text-xl cursor-pointer">
            {{ title }}
        </header>
        <Menulist />
    </section>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { getEnv } from '../../module/env'
import { router } from '../../router/router'
import { useAppstore } from '../../store/modules/app'
import Menulist from './menulist.vue'

const title = computed(() => getEnv('VITE_APP_TITLE')).value
</script>
