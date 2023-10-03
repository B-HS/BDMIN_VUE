<template>
    <section class="container flex h-full items-start">
        <Menubar />
        <section>
            <Navibar />
        </section>
    </section>
</template>

<script setup lang="ts">
import Menubar from '../components/menu/menubar.vue'
import Navibar from '../components/navigator/navibar.vue'
</script>
