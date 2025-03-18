import { fa } from "vuetify/locale";
import { createStore } from "vuex";

export default createStore({
  state: {
    colorNavbarMode: "dark",
    colorMode: "dark",
    drawer: false,
    user: null,
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    mcolor: "",
    basURL: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    CheckLogin: false,
  },
  mutations: {
    setUser(state) {
      state.isUserType = state;
      state.user = state;
      state.imgUser = state;
      state.siteName = state;
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      const sidenav = document.getElementById("sidenav-main");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        setTimeout(function () {
          sidenav.classList.remove("bg-white");
        }, 100);
        sidenav.classList.remove("bg-transparent");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav.classList.add("bg-white");
        sidenav.classList.remove("bg-transparent");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    UPDATE_FAVORITES(state, payload) {
      state.siteId = payload;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    switchDrawer({ state, commit, dispatch }, drawer) {
      commit("SET_DRAWER", drawer);
    },
    addSiteId(context, payload) {
      const favorites = context.state.siteId;
      siteId.push(payload);
      context.commit("UPDATE_FAVORITES", favorites);
    },
  },
  getters: {
    drawer: (state) => state.drawer,
  },
});
