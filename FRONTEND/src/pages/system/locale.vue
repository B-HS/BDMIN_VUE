<template>
    <section>
        <Card class="flex gap-2 justify-end">
            <button class="btn btn-primary btn-xs" @click="getTrtext">SEARCH</button>
            <button class="btn btn-primary btn-xs">ADD</button>
            <button class="btn btn-primary btn-xs">DELETE</button>
        </Card>
        <!-- COLAPSE로 ADD > 폼 추가 > 저장-->
        <!-- ADD여러번하면 그만큼 탭 추가 > 저장하면 LIST로 말아서 서버로 저장 -->
        <!-- UPDATE는 MODAL로, 역시 수정된 LIST는 모아서 서버로 저장 -->
        <!-- DELETE는 그냥 체크된 것들 msg_key만 모아서 서버로 -->
        <EasyDataTable :headers="headers" :items="state.items" hide-footer />
    </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { requestFullLocaleList } from '../../api/locale'
import Card from '../../components/card.vue'
import { locale } from '../../types/app'

interface localState {
    items: locale[]
}

const state = reactive<localState>({
    items: [
        {
            msg_key: 'hello',
            lang_type: 'KR',
            trtext: 'hello',
        },
    ],
})

const headers = [
    { text: 'MESSAGE_KEY', value: 'msg_key' },
    { text: 'LANGUAGE', value: 'lang_type', sortable: true },
    { text: 'TRANSLATION', value: 'trtext', sortable: true },
]

const getTrtext = async () => {
    state.items = []
    const { data } = await requestFullLocaleList()
    const trtexts = data as locale[]
    state.items = trtexts
}
</script>
