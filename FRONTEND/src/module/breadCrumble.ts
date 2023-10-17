import { MenuItem } from '../types/user'

const findBreadcrumbPath = (menu: MenuItem[], targetName: string, path = ''): string[] | null => {
    for (const item of menu) {
        const currentPath = path === '' ? (item.meta.title as string) : `${path}/${item.meta.title}`
        if (item.name === targetName) {
            return currentPath.split('/')
        }

        if (item.children) {
            const result = findBreadcrumbPath(item.children, targetName, currentPath)
            if (result) {
                return result && result
            }
        }
    }
    return null
}

export { findBreadcrumbPath }
