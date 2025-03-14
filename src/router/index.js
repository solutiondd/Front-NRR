import { createRouter, createWebHistory } from "vue-router";
import { UserService } from "../api/user";
import store from "../store";
import Login from "../views/Login.vue";
import Home from "../views/Admin/Home.vue";
import Account from "../views/Admin/Account.vue";
import VisitorHome from "../views/Visitor/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "AdminHome",
      component: Home,
    },
    {
      path: "/account",
      name: "AdminAccount",
      component: Account,
    },
    {
      path: "/userhome",
      name: "VisitorHome",
      component: VisitorHome,
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  const auth = await Authorize();
  store.replaceState.baseURL = import.meta.env.VITE_APP_BASE_URL;

  if (to.name !== "Login" && !auth) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;

const Authorize = async () => {
  let authorize = false;
  const userservice = new UserService();
  await userservice
    .AuthState()
    .then((result) => {
      // Debugging: log the result of AuthState

      if (result.message === "ok") {
        store.state.user = result.data;
        store.state.displayName = result.data.displayName;
        store.state.park = result.data.park;
        store.state.role = result.data.role;
        store.state.userId = result.data.userId;
        authorize = true;
      } else {
        console.log("Authorization failed:", result);
        authorize = false;
      }
    })
    .catch((err) => {
      console.error("Error during authorization:", err); // Log any errors that occur
    });
  return authorize;
};
