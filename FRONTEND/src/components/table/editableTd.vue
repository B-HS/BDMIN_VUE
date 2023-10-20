<template>
    <td contenteditable="true" @input="onInput" @focusin="onFocusIn" @focusout="onFocusOut">
        {{ focusedValue ? focusedValue : trtext ? t(trtext.toUpperCase()) : innerContent }}
    </td>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
let { content, trtext } = defineProps<{
    content: string | number | boolean | undefined
    trtext: string | undefined
}>()
const emits = defineEmits(['input'])
const innerContent = ref(content)
const focusedValue = ref()
const onInput = (event: InputEvent) => {
    // @ts-ignore
    innerContent.value = event.target?.textContent
    emits('input', innerContent.value)
}

const onFocusIn = () => {
    focusedValue.value = typeof innerContent.value === 'boolean' ? String(innerContent.value) : innerContent.value
}

const onFocusOut = () => {
    focusedValue.value = undefined
}
</script>
