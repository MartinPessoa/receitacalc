import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/ingredientes",
  },
  {
    path: "/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/ingredientes",
      },
      {
        path: "ingredientes",
        component: () => import("@/views/IngredientesPage.vue"),
        props: true,
      },
      {
        path: "ingredientes/:nomeDaReceita",
        component: () => import("@/views/IngredientesPage.vue"),
        props: true,
      },
      {
        path: "calculadora",
        component: () => import("@/views/CalculadoraPage.vue"),
      },
      {
        path: "listadereceitas",
        component: () => import("@/views/ListaDeReceitasPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
