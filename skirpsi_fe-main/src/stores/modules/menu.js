// src/store/menu.js
import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
    state: () => ({
        menuItems: [
            {
                id: 1,
                title: "Dashboard",
                slug: "/dashboard",
                icon_path: "mdi-view-dashboard-outline",
                position: 'nav',
                level: 1,
                sort_priority: 1,
                parent_id: null,
                children: null,
            },
            {
                id: 2,
                title: "User Management",
                slug: null,
                icon_path: "mdi-account",
                position: 'nav',
                level: 1,
                sort_priority: 2,
                parent_id: null,
                children: [
                    {
                        id: 21,
                        title: "List User",
                        slug: "/dashboard/user-management/list-user",
                        icon_path: "mdi-account-circle",
                        level: 2,
                        sort_priority: 1,
                        parent_id: 2,
                    },
                ],
            },
            {
                id: 3,
                title: "Form Survey",
                slug: null,
                icon_path: "mdi-file-question",
                position: 'nav',
                level: 1,
                sort_priority: 2,
                parent_id: null,
                children: [
                    {
                        id: 31,
                        title: "List Form",
                        slug: "/dashboard/form/list-form",
                        icon_path: "mdi-list-box",
                        level: 2,
                        sort_priority: 1,
                        parent_id: 2,

                    },
                ],
            },
            {
                id: 4,
                title: "Answers",
                slug: null,
                icon_path: "mdi-file-account",
                position: 'nav',
                level: 1,
                sort_priority: 2,
                parent_id: null,
                children: [
                    {
                        id: 41,
                        title: "List Answers",
                        slug: "/dashboard/answers/list-answers",
                        icon_path: "mdi-clipboard-list",
                        level: 2,
                        sort_priority: 1,
                        parent_id: 2,

                    },
                ],
            },
            {
                id: 5,
                title: "Setting",
                slug: "/dashboard/setting",
                icon_path: "mdi-cog",
                position: 'nav',
                level: 1,
                sort_priority: 4,
                parent_id: null,
                children: null,
            },

        ]
    }),
    actions: {

    },
    getters: {
        sortedMenuItems: (state) => {
            return state.menuItems
                .filter(item => item.position === 'nav' || item.position === null)
                .sort((a, b) => a.sort_priority - b.sort_priority);
        },
        getChildrenRecursive: (state) => {
            console.log(state.menuItems);
            const findChildren = (id, level = 1, maxLevel = 3) => {
                if (level > maxLevel) return [];

                const item = state.menuItems.find(item => item.id === id);
                if (!item || !item.children) return [];

                return item.children.flatMap(child => [
                    child,
                    ...findChildren(child.id, level + 1, maxLevel)
                ]);
            };

            return (id) => findChildren(id);
        }
    },
});
