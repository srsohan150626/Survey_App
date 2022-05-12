import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Survey from "../views/Survey.vue";
import store from "../store";
import AuthLayout from "../components/AuthLayout.vue";
import SurveyView from "../views/SurveyView.vue";
import SurveyPublicView from "../views/SurveyPublicView.vue";
import SurveyAnswerView from "../views/SurveyAnswerView.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: {requireAuth: true},
        children: [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/surveys', name: 'Survey', component: Survey },
            { path: 'survey/create', name: 'SurveyCreate', component: SurveyView },
            { path: 'survey/:id', name: 'SurveyView', component: SurveyView },
            {path: '/survey/:id/answer',name: 'SurveyAnswerView', component: SurveyAnswerView}
        ]
    },
    {
      path: '/auth',
        redirect: '/login',
        name: 'Auth',
        component: AuthLayout,
        meta: {isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]

    },
    {
        path: '/view/survey/:slug',
        name: 'SurveyPublicView',
        component: SurveyPublicView
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=> {
    if(to.meta.requireAuth && !store.state.user.token ) {
        next({name: 'Login'})
    } else if(store.state.user.token && (to.meta.isGuest)) {
        next({name: 'Dashboard'})
    } else {
        next();
    }
})
export default router
