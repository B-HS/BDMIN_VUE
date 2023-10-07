<template>
    <section v-if="!router.currentRoute.value.meta.isAuthed">
        <RouterView />
    </section>
    <section class="flex items-start" v-else>
        <Menubar />
        <section class="flex-1">
            <Navibar />
            <section class="p-3">
                <RouterView />
            </section>
        </section>
    </section>
</template>

<script setup lang="ts">
import Menubar from '../components/menu/menubar.vue'
import Navibar from '../components/navigator/navibar.vue'
import { router } from '../router/router'
</script>
