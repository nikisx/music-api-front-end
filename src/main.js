import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mitt from 'mitt';


const emitter = mitt();

const clickOutside = {
    beforeMount: (el, binding) => {
      el.clickOutsideEvent = event => {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target) || el.id != 'open-modal')) {
          // and if it did, call method provided in attribute value
          binding.value();
        }
      };
      document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: el => {
      document.removeEventListener("click", el.clickOutsideEvent);
    },
  };

const app = createApp(App)
.directive("click-outside", clickOutside)
.use(store)
.use(router)
.use(VueAxios, axios)

app.config.globalProperties.emitter = emitter;
app.mount('#app');
