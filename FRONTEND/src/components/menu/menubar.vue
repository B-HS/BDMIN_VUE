<template>
    <section
        class="h-screen transition-all overflow-hidden border-r relative"
        :style="{
            width: useAppstore().getMenuHide() ? '0px' : useAppstore().getMenubarWidth() + 'px',
            minWidth: useAppstore().getMenuHide() ? '0px' : isUnder640 ? useAppstore().getMenubarWidth() + 'px' : 0,
        }"
    >
        <header @click="router.push({ path: '/' })" class="bg-base-neutral-content p-3 text-center text-2xl font-bold cursor-pointer">
            {{ title }}
        </header>
        <Menulist />
        <footer class="absolute bottom-1 p-3 flex gap-1 justify-between w-full items-center">
            <span class="font-bold"></span>
            <section class="icons flex">
                <Theme />
            </section>
        </footer>
    </section>
</template>
<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { getEnv } from '../../module/env'
import { router } from '../../router/router'
import { useAppstore } from '../../store/modules/app'

import Menulist from './menulist.vue'
import Theme from '../theme/theme.vue'

const title = computed(() => getEnv('VITE_APP_TITLE')).value
const isUnder640 = ref(false)
const menuHide = () => !useAppstore().getMenuHide() && useAppstore().setMenuHide((isUnder640.value = true))
const menuVisible = () => useAppstore().getMenuHide() && useAppstore().setMenuHide((isUnder640.value = false))
nextTick(() => {
    window.innerWidth < 640 ? menuHide() : menuVisible()
    window.addEventListener('resize', () => (window.innerWidth < 640 ? menuHide() : menuVisible()))
})
</script>
