<template>
    <DraggableModal ref="userModal" :title="t('USER')" :footer="[...footer]" footer-style=" flex gap-3">
        <div class="form-control w-full" v-for="item in Object.keys(state.targetInfo)" :key="item">
            <label v-if="!notRendering.includes(item.toUpperCase())" class="label">
                <span class="label-text">{{ item.toUpperCase() }}</span>
            </label>
            <input
                v-if="!notRendering.includes(item.toUpperCase())"
                type="text"
                v-model="state.targetInfo[item as keyof ServerUserInfo]"
                :disabled="item === 'urkey' || (!!props.userinfo[item as keyof ServerUserInfo] && disabledList.includes(item.toUpperCase()))"
                placeholder="Type here"
                class="input input-bordered w-full"
            />
        </div>
    </DraggableModal>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import DraggableModal from '../../components/draggableModal.vue'
import { ServerUserInfo } from '../../types/user'
import { saveUserList } from '../../api/user'
const { t } = useI18n()
const userModal = ref()
const disabledList = ['URKEY', 'EMAIL', 'LASTLOGIN', 'ROLES']
const notRendering = ['ROW_STATUS']
const props = defineProps<{ userinfo: ServerUserInfo; search: Function }>()
const state = reactive<{ targetInfo: Partial<ServerUserInfo & { row_status?: 'I' | 'U' | 'D' }> }>({
    targetInfo: {
        urkey: undefined,
        email: undefined,
        urname: undefined,
        urnickname: undefined,
        introduce: undefined,
        lastLogin: undefined,
        roles: undefined,
        row_status: undefined,
    },
})

const save = () => {
    if (!!props.userinfo.urkey) {
        state.targetInfo.row_status = 'U'
    } else if (!props.userinfo.urkey) {
        state.targetInfo.row_status = 'I'
    }

    saveUserList([state.targetInfo]).then((res) => {
        res.data && props.search()
        userModal.value.close()
    })
}
const deleteUser = () => {
    state.targetInfo.row_status = 'D'
    saveUserList([state.targetInfo]).then((res) => {
        res.data && props.search()
        userModal.value.close()
    })
}
const footer = [
    { name: t('SAVE'), type: 'outline', fn: save, class: 'btn-sm' },
    { name: t('CLOSE'), type: 'outline', fn: () => userModal.value.close(), class: 'btn-sm' },
    { name: t('DELETE'), type: 'outline', fn: deleteUser, class: 'btn-sm' },
]
defineExpose({
    open: () => {
        userModal.value.show()
        nextTick(() => {
            Object.keys(state.targetInfo).forEach((val) => {
                // @ts-ignore
                state.targetInfo[val] = props.userinfo[val]
            })
        })
    },
    close: () => userModal.value.close(),
})
</script>
