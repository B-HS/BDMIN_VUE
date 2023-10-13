<template>
    <section
        class="h-screen transition-all overflow-hidden border-r"
        :style="{
            width: useAppstore().getMenuHide() ? '0px' : useAppstore().getMenubarWidth() + 'px',
            minWidth: useAppstore().getMenuHide() ? '0px' : isUnder640 ? useAppstore().getMenubarWidth() + 'px' : 0,
        }"
    >
        <header @click="router.push({ path: '/' })" class="bg-base-neutral-content p-3 text-center text-xl cursor-pointer">
            {{ title }}
        </header>
        <Menulist />
    </section>
</template>
<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { getEnv } from '../../module/env'
import { router } from '../../router/router'
import { useAppstore } from '../../store/modules/app'
import Menulist from './menulist.vue'

const title = computed(() => getEnv('VITE_APP_TITLE')).value
const isUnder640 = ref(false)
const menuHide = () => !useAppstore().getMenuHide() && useAppstore().setMenuHide((isUnder640.value = true))
const menuVisible = () => useAppstore().getMenuHide() && useAppstore().setMenuHide((isUnder640.value = false))
nextTick(() => {
    window.innerWidth < 640 ? menuHide() : menuVisible()
    window.addEventListener('resize', () => (window.innerWidth < 640 ? menuHide() : menuVisible()))
})
</script>
