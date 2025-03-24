import { createRouter, createWebHistory } from "vue-router";
import { UserService } from "../api/user";
import store from "../store";
import AdminLayout from "../layouts/AdminLayout.vue";
import VisitorLayout from "../layouts/VisitorLayout.vue";
import RegisterHome from "../views/Visitor/Home.vue";
import Home from "../views/Admin/Home.vue";
import Login from "../views/Login.vue";
import Account from "../views/Admin/Account.vue";
import LicensePlate from "../views/Admin/licensePlate.vue";
import Stranger from "../views/Security-Guard/OnsiteRegister.vue";
import SecurityGuard from "../layouts/Security-Guard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "/",
      redirect: "/register",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "RegisterHome",
      component: VisitorLayout,
      children: [
        {
          path: "",
          name: "Register",
          component: RegisterHome,
        },
      ],
    },
    {
      path: "/home",
      name: "AdminHome",
      component: AdminLayout,
      redirect: "/home/dashboard", // redirect ไปที่ dashboard
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Home,
        },
        {
          path: "account",
          name: "AdminAccount",
          component: Account,
        },
        {
          path: "licenseplate",
          name: "LicensePlate",
          component: LicensePlate,
        },
      ],
    },
    {
      path: "/stranger",
      name: "SecurityGuard",
      component: SecurityGuard,
      children: [
        {
          path: "",
          name: "Stranger",
          component: Stranger,
        },
      ],
    },
  ],
});

// ฟังก์ชัน Authorize สำหรับตรวจสอบการเข้าสู่ระบบ
const Authorize = async () => {
  let authorize = false;

  // ตรวจสอบว่าใน store มีข้อมูลผู้ใช้งานหรือไม่
  if (store.state.user) {
    authorize = true;
  } else {
    const userservice = new UserService();
    await userservice
      .AuthState()
      .then((result) => {
        if (result.message === "ok") {
          store.state.user = result.data;
          store.state.displayName = result.data.displayName;
          store.state.park = result.data.park;
          store.state.role = result.data.role;
          store.state.userId = result.data.userId;
          authorize = true;
        } else {
          authorize = false;
        }
      })
      .catch(() => {
        authorize = false;
      });
  }
  return authorize;
};

// ตรวจสอบการเข้าสู่ระบบก่อนเปลี่ยนเส้นทาง
router.beforeEach(async (to, from, next) => {
  const auth = await Authorize();

  if (
    !auth &&
    to.name !== "RegisterHome" &&
    to.name !== "Login" &&
    !to.path.startsWith("/register")
  ) {
    next({ name: "RegisterHome" });
  } else {
    const userRole = store.state.user?.role;

    if (userRole === "visitor" && to.name !== "LicensePlate") {
      next({ name: "LicensePlate" }); // Redirect ไปหน้า LicensePlate
    } else if (userRole === "security" && to.name !== "Stranger") {
      next({ name: "Stranger" });
    } else {
      next();
    }
  }
});

export default router;
