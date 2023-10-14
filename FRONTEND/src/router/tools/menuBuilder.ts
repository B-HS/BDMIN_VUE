import { RouteRecordRaw, Router } from 'vue-router'
import { useUserStoreWithoutInit } from '../../store/modules/user'
import { MenuItem } from '../../types/user'
import { router as defaultRouter } from '../router'

const dynamicMenuImporting = (menu: MenuItem[]) => {
    const components = import.meta.glob('../../pages/**/*.vue')
    const componentNames = Object.keys(components).map((val) => '/' + val.split('../../pages/')[1].split('.vue')[0])
    menu.forEach((val) => {
        val.meta = { isAuthed: true, hide: val.hide, cache: val.cache, title: val.mename, raw: { ...val } }
        if (!val.parentmekey) {
            val.name = val.mename
            val.path = val.file
        } else if (componentNames.includes(val.file)) {
            val.name = val.file.split('/').splice(-1)[0].split('.vue')[0]
            val.path = val.file
            val.component = components[`../../pages${val.file}.vue`]
        } else {
            val.name = val.file.split('/').splice(-1)[0].split('.vue')[0]
            val.path = ''
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

export const menuBuilder = (routerObj?: Router) => {
    const router = routerObj || defaultRouter
    const menu = useUserStoreWithoutInit().getState('rawMenu') as object | undefined
    if (menu) {
        const copiedMenu = JSON.parse(JSON.stringify(menu))
        const menuWithImportedComponent = dynamicMenuImporting(JSON.parse(JSON.stringify(copiedMenu)))
        const nestedMenu = recursiveMenuMaker(JSON.parse(JSON.stringify(menuWithImportedComponent)))
        useUserStoreWithoutInit().setRefectoredMenu(JSON.parse(JSON.stringify([...nestedMenu])))

        nestedMenu?.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw)
        })
        return nestedMenu as unknown as RouteRecordRaw[]
    }
}
