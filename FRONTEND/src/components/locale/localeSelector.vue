<template>
    <div class="dropdown dropdown-top">
        <label tabindex="0" class="tooltip btn btn-outline btn-sm rounded-none border-none group flex">
            <LanguageIcon class="w-5" />
        </label>
        <ul tabindex="0" class="dropdown-content z-[50] menu shadow bg-base-100 w-12 p-0">
            <li class="hover:bg-base-300 p-2 flex items-center cursor-pointer" v-for="locale in localeItems" @click="locale.fn">
                {{ locale.name }}
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { LanguageIcon } from '@heroicons/vue/24/solid'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { menuBuilder } from '../../router/tools/menuBuilder'

const { locale } = useI18n({ useScope: 'global' })

interface LocaleBtn {
    name: 'KO' | 'JP' | 'EN'
    fn: Function
}

const changeLanguageSet = (target: 'ko' | 'jp' | 'en') => {
    console.log('entered')

    locale.value = target
}

const localeItems: LocaleBtn[] = [
    { name: 'KO', fn: () => changeLanguageSet('ko') },
    { name: 'JP', fn: () => changeLanguageSet('jp') },
    { name: 'EN', fn: () => changeLanguageSet('en') },
]

watch(
    () => locale.value,
    () => menuBuilder(),
)
</script>
