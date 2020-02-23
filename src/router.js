import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index';
import {Message} from 'element-ui';

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {layout: 'main-layout', murr_some_data: '42'},
            component: () => import('./views/Home.vue')
        },

        // murren
        {
            path: '/login',
            name: 'login',
            meta: {layout: 'empty-layout'},
            component: () => import('./views/murren/Login.vue')
        },
        {
            path: '/signup',
            name: 'signup',
            meta: {layout: 'empty-layout'},
            component: () => import('./views/murren/SignUp.vue')
        },
        {
            path: '/check_email',
            name: 'check_email',
            meta: {layout: 'main-layout'},
            component: () => import('./views/murren/CheckEmail.vue')
        },
        {
            path: '/murren_email_activate',
            name: 'murren_email_activate',
            meta: {layout: 'main-layout'},
            component: () => import('./views/murren/ConfirmEmail.vue')
        },
        {
            path: '/set_new_password',
            name: 'set_new_password',
            meta: {layout: 'main-layout'},
            component: () => import('./views/murren/SetNewPassword.vue')
        },

        // murr
        {
            path: '/create_murr',
            name: 'create_murr',
            meta: {layout: 'main-layout', accessTokenExpected: true},
            component: () => import('./views/murr/CreateMurr.vue')
        },
        {
            path: '/watch_on_murr',
            name: 'watch_on_murr',
            meta: {layout: 'main-layout',
                // accessTokenExpected: true
            },
            component: () => import('./views/murr/WatchOnMurr.vue')
        },
    ]
});

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.accessTokenExpected)) {

        if (!store.getters.accessToken_getters) {

            store.dispatch('changeShowLoginForm_actions');

            Message({
                message: 'Требуется авторизация 😳',
                center: true,
                customClass: 'element-ui-message__error',
                type: 'warning',
                showClose: true
            });

        } else {

            next()
        }
    } else {

        next()
    }
});

export default router


// workaround for push to "/some_url" when client on "/some_url"
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
//

Vue.use(Router);
