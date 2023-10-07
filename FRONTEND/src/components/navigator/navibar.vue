<template>
    <div class="navbar bg-base-100 border-b">
        <div class="navbar-start">
            <button @click="() => menuToggle()" class="btn btn-ghost btn-circle"><Bars3Icon class="text-ghost h-1/2" /></button>
        </div>
        <div class="navbar-center">
            <a class="btn btn-ghost normal-case text-xl">{{ router.currentRoute.value.meta.title }}</a>
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
import { useAppstore } from '../../store/modules/app'
import { router } from '../../router/router'

const menuToggle = () => useAppstore().setMenuHide(!useAppstore().getMenuHide())
</script>
