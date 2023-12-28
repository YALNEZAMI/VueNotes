import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Modify from "../components/Modify.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/modify/:id",
      name: "modify",
      component: Modify,
    },
  ],
});
export default router;
