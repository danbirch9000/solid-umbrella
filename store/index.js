import Vue from "vue";
import Vuex from "vuex";
import * as svgicon from "vue-svgicon";
import userModule from "./user";
import goalModule from "./goals";
import accountModule from "./account";
import appModule from "./app";
Vue.use(Vuex);
Vue.use(svgicon);
const store = () => {
  return new Vuex.Store({
    modules: {
      userModule,
      goalModule,
      accountModule,
      appModule
    }
  });
};

export default store;
