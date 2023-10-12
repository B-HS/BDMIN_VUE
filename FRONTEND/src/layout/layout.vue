<template>
    <section v-if="!router.currentRoute.value.meta.isAuthed">
        <Keepaliverouter />
    </section>
    <section class="flex items-start" v-else>
        <Menubar />
        <section class="flex-1">
            <Navibar />
            <Tab />
            <section class="p-3">
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
