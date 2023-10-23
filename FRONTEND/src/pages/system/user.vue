<template>
    <section>
        <Card class="flex gap-2 justify-end">
            <button class="btn btn-outline btn-xs" @click="openUserAddMdoal">{{ t('ADD') }}</button>
            <button class="btn btn-outline btn-xs" @click="search">{{ t('SEARCH') }}</button>
        </Card>
        <Card>
            <table class="table table-fixed">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column">
                            {{ t(column.toUpperCase()) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in state.listData" :key="item.urkey">
                        <td v-for="column in columns" :key="column" @click="() => openUserModifyModal(item)">
                            {{ item[column as keyof ServerUserInfo] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
        <UserModal ref="userModal" :userinfo="state.modifyProps" :search="search" />
    </section>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { requestUserList } from '../../api/user'
import Card from '../../components/card.vue'
import { ServerUserInfo } from '../../types/user'
import UserModal from '../modal/userModal.vue'

const userModal = ref()
const { t } = useI18n()
const columns = ['urkey', 'email', 'urname', 'urnickname', 'introduce', 'lastLogin']
const state = reactive({
    listData: [] as ServerUserInfo[],
    modifyProps: {} as ServerUserInfo,
})

const openUserModifyModal = (item: ServerUserInfo) => {
    state.modifyProps = item
    userModal.value.open()
}

const openUserAddMdoal = () => {
    state.modifyProps = {} as ServerUserInfo
    userModal.value.open()
}

const search = async () => {
    state.listData = []
    const { data } = await requestUserList()
    state.listData = data
}
</script>
