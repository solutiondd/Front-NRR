import { createRouter, createWebHistory } from "vue-router";
import { UserService } from "../api/user";
import store from "../store";
import Login from "../views/Login.vue";
import Home from "../views/Admin/Home.vue";
import Account from "../views/Admin/Account.vue";
import RegisterHome from "../views/Visitor/Home.vue";
import LicensePlate from "../views/Admin/licensePlate.vue";

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
      path: "/register",
      name: "RegisterHome",
      component: RegisterHome,
    },
    {
      path: "/licenseplate",
      name: "LicensePlate",
      component: LicensePlate,
    },
  ],
});

router.beforeResolve(async (to, from, next) => {
  // ตรวจสอบว่าอยู่ในหน้า Register หรือไม่
  if (to.name !== "RegisterHome") {
    const auth = await Authorize(); // เรียกฟังก์ชัน Authorize เฉพาะถ้าไม่ใช่หน้า Register
    store.replaceState.baseURL = import.meta.env.VITE_APP_BASE_URL;

    // ถ้ายังไม่ได้ login และไปหน้าอื่นๆ ให้ redirect ไปหน้า Register
    if (!auth && to.name !== "Login") {
      next({ name: "RegisterHome" });
    } else {
      next();
    }
  } else {
    next(); // ถ้าอยู่ในหน้า Register ให้ไปต่อเลย
  }
});

export default router;

const Authorize = async () => {
  let authorize = false;

  // ตรวจสอบว่าใน store มีข้อมูลผู้ใช้งานหรือไม่
  if (store.state.user) {
    // ถ้ามีข้อมูลผู้ใช้งานใน store (แสดงว่า login แล้ว)
    authorize = true;
  } else {
    // ถ้าไม่มีข้อมูลผู้ใช้งาน ก็จะไปตรวจสอบสถานะการล็อกอิน
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
          console.log("Authorization failed:", result);
          authorize = false;
        }
      })
      .catch((err) => {
        console.error("Error during authorization:", err); // Log any errors that occur
        authorize = false;
      });
  }

  return authorize;
};

// router.beforeResolve(async (to, from, next) => {
//   const auth = await Authorize();
//   store.replaceState.baseURL = import.meta.env.VITE_APP_BASE_URL;

//   if (!auth && to.name !== "Login" && to.name !== "RegisterHome") {
//     next({ name: "RegisterHome" });
//   } else if (!auth && to.name === "Login") {
//     next();
//   } else {
//     next();
//   }
// });

// export default router;

// const Authorize = async () => {
//   let authorize = false;
//   const userservice = new UserService();
//   await userservice
//     .AuthState()
//     .then((result) => {
//       // Debugging: log the result of AuthState

//       if (result.message === "ok") {
//         store.state.user = result.data;
//         store.state.displayName = result.data.displayName;
//         store.state.park = result.data.park;
//         store.state.role = result.data.role;
//         store.state.userId = result.data.userId;
//         authorize = true;
//       } else {
//         console.log("Authorization failed:", result);
//         authorize = false;
//       }
//     })
//     .catch((err) => {
//       console.error("Error during authorization:", err); // Log any errors that occur
//     });
//   return authorize;
// };
