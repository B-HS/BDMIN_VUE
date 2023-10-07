import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '../../store/modules/user'
import { MenuItem } from '../../types/user'
import { router } from '../router'

const dynamicMenuImporting = async (menu: MenuItem[]) => {
    const components = import.meta.glob('../../pages/*.vue')
    const componentNames = Object.keys(components).map((val) => val.split('/').slice(-1)[0].split('.')[0])

    menu.forEach((val) => {
        if (componentNames.includes(val.file)) {
            val.component = components[`../../pages/${val.file}.vue`]
        } else {
            val.component = undefined
        }
    })
    return menu
}

const recursiveMenuMaker = (items: MenuItem[], parentmekey: number | null = null) =>
    items
        // pid별 아이템을 설정함 (각 depth는 pid로 가정)
        .filter((item) => item.parentmekey === parentmekey)
        .map((item) => {
            // 해당 depth 안에 더 깊은 depth가 있는지 확인
            const children = recursiveMenuMaker(items, item.mekey)
            // 해당 depth 안에 또 다른 depth가 없다면 이 값은 말단 값이므로 상위 depth인 item에 children으로 추가,
            if (children.length > 0) {
                item.children = children
            }
            // 해당 값을 리턴
            return item
        })

export const menuBuilder = async () => {
    const menu = useUserStore().getState('rawMenu') as object | undefined
    if (menu) {
        const copiedMenu = JSON.parse(JSON.stringify(menu))
        const menuWithImportedComponent = dynamicMenuImporting(copiedMenu)
        const nestedMenu = recursiveMenuMaker(await menuWithImportedComponent)
        nestedMenu.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
        })
    }
}
