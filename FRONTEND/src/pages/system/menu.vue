<template>
    <section>
        <Card class="flex gap-2 justify-end">
            <button class="btn btn-outline btn-xs" @click="addRow">{{ t('ADD') }}</button>
            <button class="btn btn-outline btn-xs" @click="rowDelete">{{ t('DELETE') }}</button>
            <button class="btn btn-outline btn-xs" @click="save">{{ t('SAVE') }}</button>
            <button class="btn btn-outline btn-xs" @click="search">{{ t('SEARCH') }}</button>
        </Card>
        <Card class="overflow-x-auto">
            <table class="table table-fixed">
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column" @click="toggleSorting(column)">
                            {{ t(column.toUpperCase()) }} {{ sorting[column] === 'asc' ? '▲' : sorting[column] === 'desc' ? '▼' : '' }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, idx) in state.tableData" class="hover:bg-base-200">
                        <EditableTd
                            v-for="elements in columns"
                            :trtext="state.tableData[idx][elements as keyof MenuHeader]?.toString()"
                            :content="state.tableData[idx][elements as keyof MenuHeader]"
                            :contenteditable="state.tableData[idx]['row_status'] !== 'D'"
                            :class="[{ 'opacity-20 cursor-not-allowed line-through': state.tableData[idx]['row_status'] === 'D' }]"
                            @input="(data) => changeEvent(data, idx, elements as keyof MenuHeader)"
                            @click="() => setCurrentCell(idx)"
                            :key="elements + idx"
                        >
                            {{ item.mekey }}
                        </EditableTd>
                    </tr>
                </tbody>
            </table>
        </Card>
    </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { requestMenuList } from '../../api/menu'
import Card from '../../components/card.vue'
import EditableTd from '../../components/table/editableTd.vue'

interface MenuHeader {
    idx?: number
    mekey: number
    mename: string
    parentmekey: number
    path: string
    file: string
    meorder: number
    hide: boolean
    cache: boolean
    icon: string
    row_status?: 'I' | 'U' | 'D'
}

const { t } = useI18n()
const columns = ['mekey', 'mename', 'parentmekey', 'meorder', 'hide', 'cache', 'icon']
const sorting = reactive<{ [key: string]: 'asc' | 'desc' | 'none' }>({})
const state = reactive({
    tableData: [] as Partial<MenuHeader>[],
    orgTableData: [] as Partial<MenuHeader>[],
    currentCellInfo: {} as Partial<MenuHeader>,
})
const search = async () => {
    state.tableData = []
    state.orgTableData = []
    const { data } = await requestMenuList()
    state.tableData = JSON.parse(JSON.stringify(data))
    state.orgTableData = JSON.parse(JSON.stringify(data))
}
const save = () => {
    getChangedDataWithStatus()
    console.log('data', state.tableData)
    console.log('orgData', state.orgTableData)
}

const addRow = () => {
    state.tableData = [...state.tableData, { row_status: 'I' }]
}

const rowDelete = () => {
    console.log(state.currentCellInfo.idx)

    if (state.currentCellInfo.idx !== undefined) {
        console.log(state.currentCellInfo.idx)
        state.tableData[state.currentCellInfo.idx] = { ...state.currentCellInfo, row_status: 'D', idx: undefined }
    }
    state.currentCellInfo = {}
}

const changeEvent = (newContent: any, idx: number, target: keyof MenuHeader) => {
    state.tableData[idx][target] = newContent
}

const getChangedDataWithStatus = () => {
    state.tableData.forEach((item, index) => {
        const orgItem = state.orgTableData[index]
        if (orgItem && !isDataEqual(item, orgItem)) {
            item.row_status = 'U'
        }
    })
}

const isDataEqual = (item1: Partial<MenuHeader>, item2: Partial<MenuHeader>): boolean => {
    let isEqual = true
    Object.keys(item1).forEach((key) => {
        if (key !== 'row_status' && item1[key as keyof MenuHeader] !== item2[key as keyof MenuHeader]) {
            isEqual = false
        }
    })
    return isEqual
}

const setCurrentCell = (idx: number) => (state.currentCellInfo = { idx, ...state.tableData[idx] })

const toggleSorting = (column: string) => {
    if (sorting[column] === 'asc') {
        sorting[column] = 'desc'
    } else if (sorting[column] === 'desc') {
        sorting[column] = 'none'
    } else {
        sorting[column] = 'asc'
    }

    sortTableData(column, sorting[column])
}

const stringer = (target: unknown) => {
    if (!target) {
        return Number.MIN_SAFE_INTEGER
    }
    if (typeof target === 'boolean') {
        return target.toString().toUpperCase()
    }
    return target.toString()
}

const sortTableData = (column: string, order: 'asc' | 'desc' | 'none') => {
    if (order === 'none') {
        state.tableData = [...state.tableData.sort((prev, next) => prev.mekey! - next.mekey!)]
        return
    }

    const compareValues = (a: Record<string, any>, b: Record<string, any>) => {
        const valueA = t(stringer(a[column as keyof MenuHeader]))
        const valueB = t(stringer(b[column as keyof MenuHeader]))
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }

    if (state.tableData.length > 1 && state.tableData.some((item, index) => index > 0 && compareValues(item, state.tableData[index - 1]) !== 0)) {
        state.tableData.sort(compareValues)
    }
}
</script>
