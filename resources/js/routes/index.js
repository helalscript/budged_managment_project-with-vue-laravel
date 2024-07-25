import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/DashboardView.vue";
import App from "@/components/App.vue";
import Userlist from '@/components/Userlist.vue';
import Login from '@/components/Login.vue';
import PurchesesViwe from "../components/PurchesesViwe.vue";
import store from '@/store'
const routes = [
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: `Login`
        }
    },
    {
        path:'/',
        name:'home',
        component: Dashboard,
        meta: {
            middleware: "authUser",
            title: `Home`
        }
    },
    {
        path:'/userlist',
        name:'userlist',
        component:Userlist
    },
    {
        path:'/purcheses',
        name:'purcheses',
        component:PurchesesViwe
    },
];

const router=createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if ( to.meta.middleware == "guest") {
        if (!sessionStorage.getItem("vuex")) {
            next()
        }
        //next()
    }
    else {
        if (store.state.CurrentUser.authenticated && sessionStorage.getItem("vuex")) {
            next()
        } else {
            next({ name: "login" })
        }
    }
})




export default router
