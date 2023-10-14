<template>
    <li v-if="!item.hide">
        <details v-if="item.children && item.children.length > 0" open>
            <summary class="font-bold text-lg">{{ item.meta.title }}</summary>
            <ul>
                <menuitem v-for="childItem in item.children" :key="childItem.mekey" :item="childItem" />
            </ul>
        </details>
        <router-link :class="[{ active: router.currentRoute.value.path === item.path }]" v-else-if="item.path" :to="item.path">{{
            item.meta.title
        }}</router-link>
        <span v-else>{{ item.meta.title }}</span>
    </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { router } from '../../router/router'

const { item } = defineProps(['item'])
</script>
