<template>
    <td contenteditable="true" v-text="innerContent" @input="onInput"></td>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

const { content } = defineProps<{ content: string | number | boolean | undefined }>()
const emits = defineEmits(['input'])

const innerContent = ref(content)

const onInput = (event: InputEvent) => {
    // @ts-ignore
    innerContent.value = event.target?.innerHTML
    emits('input', innerContent.value)
}
</script>
