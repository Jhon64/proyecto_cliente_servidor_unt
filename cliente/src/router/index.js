import Vue from "vue";
import Router from "vue-router";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

const Colors = () => import("@/views/theme/Colors");

const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");
const Registrar = () => import("@/views/pages/Registrar");

// Users
const Usuarios = () => import("@/views/acceso/usuario/Index");

const Rol = () => import("@/views/acceso/Rol");

// maestros
const empleados = () => import("@/views/maestros/empleados/Index");
const Servicios = () => import("@/views/maestros/servicios/Index");

//negocio
const Empresas = () => import("@/views/negocio/empresa/Index");
const Propietarios = () => import("@/views/negocio/propietario/Index");
const Clientes = () => import("@/views/negocio/clientes/Index");

Vue.use(Router);

export default new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/registrar",
      name: "Login",
      component: Registrar,
    },
    {
      path: "/register",
      name: "Login",
      component: Register,
    },
    {
      path: "/",
      redirect: "/login",
      name: "Home",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
        },
        {
          path: "compras",
          redirect: "/compras",
          name: "compras",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "colors",
              name: "Colors",
              component: Colors,
            },
          ],
        },

        {
          path: "acceso",
          meta: {
            label: "Acceso",
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "usuario",
              name: "Usuario",
              component: Usuarios,
            },
            {
              path: "rol",
              name: "Rol",
              component: Rol,
            },
          ],
        },
        {
          path: "maestros",
          redirect: "/maestros/servicios",
          name: "Maestros",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "servicios",
              name: "Servicios",
              component: Servicios,
            },
          ],
        },
        {
          path: "negocio",
          redirect: "/negocio/empresas",
          name: "Negocio",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "empresas",
              name: "Empresas",
              component: Empresas,
            },
            {
              path: "propietarios",
              name: "Propietarios",
              component: Propietarios,
            },
            {
              path: "clientes",
              name: "Clientes",
              component: Clientes,
            },
            {
              path: "empleados",
              name: "Empleados",
              component: empleados,
            },
          ],
        },
      ],
    },
  ];
}
