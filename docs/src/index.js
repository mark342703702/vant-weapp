import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';
import VantDoc, { progress } from 'vant-doc';
import { syncPath } from './utils';

Vue.use(VueRouter).use(VantDoc);

const router = new VueRouter({
  mode: 'hash',
  routes: routes()
});

router.beforeEach((route, redirect, next) => {
  progress.start();
  document.title = route.meta.title || document.title;
  next();
});

router.afterEach(() => {
  progress.done();
  window.scrollTo(0, 0);
  syncPath(router.history.current.path);
});

window.vueRouter = router;

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false;
}

new Vue({ // eslint-disable-line
  render: h => h(App),
  router,
  el: '#app'
});
