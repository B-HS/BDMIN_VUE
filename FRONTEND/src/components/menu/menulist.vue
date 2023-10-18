<template>
    <ul class="menu w-full menu-dropdown-toggle">
        <Menuitem v-for="item in menuItems" :key="item.mekey" :item="item" />
    </ul>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '../../store/modules/user'
import Menuitem from './menuitem.vue'
const menuItems = computed(() => useUserStore().getRefectoredMenu())
</script>
