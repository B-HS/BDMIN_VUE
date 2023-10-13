<template>
    <div class="navbar bg-base-100 border-b">
        <div class="navbar-start">
            <button @click="() => menuToggle()" class="btn btn-ghost btn-circle"><Bars3Icon class="text-ghost h-1/2" /></button>
        </div>
        <div class="navbar-center">
            <span class="normal-case text-xl font-bold" v-if="router.currentRoute.value.meta.title === 'HOME'">{{
                router.currentRoute.value.meta.title
            }}</span>
            <div class="breadcrumbs p-0">
                <ul>
                    <li class="overflow-hidden" v-for="item in breadcrumbs" :key="item">
                        <span class="normal-case text-xl font-bold">{{ item }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbar-end">
            <button class="btn btn-ghost btn-circle">
                <MagnifyingGlassIcon class="text-ghost h-1/2" />
            </button>
            <button class="btn btn-ghost btn-circle">
                <BellIcon class="text-ghost h-1/2" />
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Bars3Icon, BellIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref, watch } from 'vue'
import { router } from '../../router/router'
import { useAppstore } from '../../store/modules/app'
import { useUserStore } from '../../store/modules/user'
import { MenuItem } from '../../types/user'

const breadcrumbs = ref()
const menuToggle = () => useAppstore().setMenuHide(!useAppstore().getMenuHide())
const findBreadcrumbPath = (menu: MenuItem[], targetName: string, path = ''): string[] | null => {
    for (const item of menu) {
        const currentPath = path === '' ? item.name : `${path}/${item.meta.title}`
        if (item.name === targetName) {
            return currentPath.split('/')
        }

        if (item.children) {
            const result = findBreadcrumbPath(item.children, targetName, currentPath)
            if (result) {
                return result && result
            }
        }
    }
    return null
}
onMounted(() => {
    findBreadcrumbPath(useUserStore().getRefectoredMenu() as MenuItem[], router.currentRoute.value.name as string)
})

watch(
    () => router.currentRoute.value,
    (newval) => {
        breadcrumbs.value = findBreadcrumbPath(useUserStore().getRefectoredMenu() as MenuItem[], newval.name as string)
    },
)
</script>
