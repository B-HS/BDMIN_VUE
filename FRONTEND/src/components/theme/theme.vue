<template>
    <section>
        <button class="tooltip btn btn-outline btn-sm rounded-none border-none" @click="themeModal.show" :data-tip="t('THEMES')">
            <PaintBrushIcon class="w-5" />
        </button>
        <DraggableModal ref="themeModal" :title="t('THEMES')" key="thememodal">
            <section class="grid grid-cols-3 gap-3">
                <section class="btns py-2 p-5 border-1 border-black border rounded" v-for="item in Object.keys(daisyuiColors)" :data-theme="item">
                    <button class="btn btn-outline w-full" :data-set-theme="item">
                        {{ item }}
                    </button>
                </section>
            </section>
        </DraggableModal>
    </section>
</template>
<script setup lang="ts">
import { PaintBrushIcon } from '@heroicons/vue/24/solid'
import daisyuiColors from 'daisyui/src/theming/themes'
import { themeChange } from 'theme-change'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DraggableModal from '../draggableModal.vue'

const themeModal = ref()
const { t } = useI18n()

onMounted(() => {
    themeChange(false)
})
</script>
