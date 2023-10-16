<template>
    <section v-if="!router.currentRoute.value.meta.isAuthed">
        <Keepaliverouter />
    </section>
    <section class="flex items-start h-screen" v-else>
        <Menubar />
        <section class="h-full flex-1 flex flex-col">
            <Navibar />
            <Tab />
            <section class="p-3 flex-1">
                <Keepaliverouter />
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">
import Menubar from '../components/menu/menubar.vue'
import Navibar from '../components/navigator/navibar.vue'
import Tab from '../components/navigator/tab.vue'
import { router } from '../router/router'
import Keepaliverouter from './keepaliverouter.vue'
</script>
