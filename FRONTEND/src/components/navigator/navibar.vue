<template>
    <div class="navbar bg-base-100 border-b">
        <div class="navbar-start">
            <button @click="() => menuToggle()" class="btn btn-ghost"><Bars3Icon class="text-ghost h-1/2" /></button>
        </div>
        <div class="navbar-center">
            <span class="normal-case text-xl font-bold" v-if="router.currentRoute.value.meta.title === 'HOME'">{{}}</span>
            <div class="breadcrumbs p-0">
                <ul>
                    <li class="overflow-hidden" v-for="item in breadcrumbs" :key="item">
                        <span class="normal-case text-xl font-bold">{{ item }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-end">
            <button class="btn btn-ghost" @click="() => searchModal.open()">
                <MagnifyingGlassIcon class="text-ghost h-1/2" />
            </button>
            <button class="btn btn-ghost">
                <BellIcon class="text-ghost h-1/2" />
            </button>
        </div>
        <SearchModal ref="searchModal" />
    </div>
</template>
<script setup lang="ts">
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref, watch } from 'vue'
import { findBreadcrumbPath } from '../../module/breadCrumble'
import { router } from '../../router/router'
import { useAppstore } from '../../store/modules/app'
import { useUserStore } from '../../store/modules/user'
import { MenuItem } from '../../types/user'
import SearchModal from '../menusearch/searchModal.vue'

const searchModal = ref()
const breadcrumbs = ref()
const menuToggle = () => useAppstore().setMenuHide(!useAppstore().getMenuHide())

onMounted(() => {
    breadcrumbs.value = findBreadcrumbPath(useUserStore().getRefectoredMenu() as MenuItem[], router.currentRoute.value.name as string)
})

watch(
    () => router.currentRoute.value,
    (newval) => {
        breadcrumbs.value = findBreadcrumbPath(useUserStore().getRefectoredMenu() as MenuItem[], newval.name as string)
    },
)
watch(
    () => useUserStore().getRefectoredMenu(),
    () => {
        breadcrumbs.value = findBreadcrumbPath(useUserStore().getRefectoredMenu() as MenuItem[], router.currentRoute.value.name as string)
    },
)
</script>
