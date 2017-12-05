import Vue from 'vue';
import App from './App';
import router from './router';
import CONFIG from '@/config';
import axios from 'axios';
import hljs from 'highlight.js';
import AV from 'leancloud-storage';
import { Alert, Aside, Button, Card, Col, Container, Footer, Header, Loading, Main, Popover, Row, Tag } from 'element-ui';
Vue.use(Alert);
Vue.use(Aside);
Vue.use(Button);
Vue.use(Card);
Vue.use(Col);
Vue.use(Container);
Vue.use(Footer);
Vue.use(Header);
Vue.use(Loading);
Vue.use(Main);
Vue.use(Popover);
Vue.use(Row);
Vue.use(Tag);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
// highlight指令
Vue.directive('highlight', el => {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
      hljs.highlightBlock(block)
  });
});

// leanCloud初始化
const appId = CONFIG.leanCloud.appId;
const appKey = CONFIG.leanCloud.appKey;
AV.init({ appId, appKey });

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
