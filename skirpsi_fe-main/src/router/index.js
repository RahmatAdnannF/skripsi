import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/stores";
import Cookies from "js-cookie";

const routes = [
    // Auth
    {
        path: "/auth",
        children: [
            {
                path: "login",
                name: "Login",
                component: () => import("@/pages/auth/login.vue"),
                meta: {
                    hideNavbar: true,
                    hideSidebar: true,
                },
            },
            {
                path: "register",
                name: "Register",
                component: () => import("@/pages/auth/register.vue"),
                meta: {
                    hideNavbar: true,
                    hideSidebar: true,
                },
            },
        ],
    },
    {
        path: "/",
        name: "LandingPage",
        component: () => import("@/pages/index.vue"),
        meta: {
            title: "Landing Page",
            landingPage: true,

        },
    },

    {
        path: "/survey/:id",
        name: "SurveyForm",
        component: () => import("@/pages/survey.vue"),
        meta: {
            title: "Survey",
            landingPage: true,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
            title: "Dashboard",
            requiresAuth: true,
            requiresRole: [1],
        },
    },
    {
        name: "UserManagement",
        path: "/dashboard/user-management/",
        children: [
            {
                path: "list-user",
                name: "listUser",
                component: () => import("@/pages/dashboard/user-management/list-user.vue"),
                meta: {
                    title: "List User",
                    requiresRole: [1],
                }
            },
            {
                path: "update-user/:id",
                name: "updateUser",
                component: () => import("@/pages/dashboard/user-management/update.vue"),
                meta: {
                    title: "Update User",
                    requiresRole: [1],
                }
            },
        ],
    },
    {
        name: "FormSurvey",
        path: "/dashboard/form/",
        children: [
            {
                path: "list-form",
                name: "listForm",
                component: () => import("@/pages/dashboard/form/index.vue"),
                meta: {
                    title: "List Form",
                    requiresRole: [1],

                }
            },
            {
                path: "detail/:id",
                name: "formDetail",
                component: () => import("@/pages/dashboard/form/[id].vue"),
                meta: {
                    title: "Form Detail",
                    requiresRole: [1],

                }
            },
            {
                path: "create",
                name: "createForm",
                component: () => import("@/pages/dashboard/form/create.vue"),
                meta: {
                    title: "Form Create",
                    requiresRole: [1],

                }
            },
            {
                path: "edit/:id",
                name: "formEdit",
                component: () => import("@/pages/dashboard/form/edit.vue"),
                meta: {
                    title: "Form Edit",
                    requiresRole: [1],

                }
            },
        ],
    },

    {
        name: "Answers",
        path: "/dashboard/answers",
        children: [
            {
                path: "list-answers",
                name: "listAnswers",
                component: () => import("@/pages/dashboard/answers/index.vue"),
                meta: {
                    title: "List Answers",
                    requiresRole: [1],
                }
            },
            {
                path: "detail/:userId/:formId",
                name: "detailAnswers",
                component: () => import("@/pages/dashboard/answers/[id].vue"),
                meta: {
                    title: "Detail Answers",
                    requiresRole: [1],

                }
            },
        ]

    },

    {
        path: "/dashboard/setting",
        name: "Setting",
        component: () => import("@/pages/dashboard/setting/index.vue"),
        meta: {
            title: "Setting",
        },
    },
    {
        path: '/:catchAll(.*)',
        name: "404",
        component: () => import("@/pages/errorPage.vue"),
        props: { errorCode: '404' },
    },
    {
        path: '/500',
        name: "500",
        component: () => import("@/pages/errorPage.vue"),
        props: { errorCode: '500' },
    },
    {
        path: '/not-authorized',
        name: 'NotAuthorized',
        component: () => import('@/pages/NotAuthorized.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const userProfile = Cookies.get("profile") ? JSON.parse(Cookies.get("profile")) : null;

    authStore.checkAuth();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next({ path: "/auth/login" });
    }
    if (to.meta.requiresRole && (!userProfile || !to.meta.requiresRole.includes(userProfile.role) == 1)) {
        return next({ path: '/not-authorized' });
    }

    return next();
});

export default router;
