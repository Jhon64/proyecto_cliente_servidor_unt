export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: "cil-speedometer",
        badge: {
          color: "primary",
          text: "NEW",
        },
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["Acceso"],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Acceso",
        route: "/acceso",
        icon: "cil-puzzle",
        items: [
          {
            name: "Usuario",
            to: "/acceso/usuario",
          },
          {
            name: "Rol",
            to: "/acceso/rol",
          },
        ],
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["Components"],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Negocio",
        route: "/negocio",
        icon: "cil-puzzle",
        items: [
          {
            name: "Empresas",
            to: "/negocio/empresas",
          },
          {
            name: "Propietarios",
            to: "/negocio/propietarios",
          },
          {
            name: "Clientes",
            to: "/negocio/clientes",
          },
          {
            name: "Empleados",
            to: "/negocio/empleados",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Pedido",
        route: "/buttons",
        icon: "cil-cursor",
        items: [
          {
            name: "Buttons",
            to: "/buttons/standard-buttons",
          },
        ],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Maestros",
        route: "/maestros",
        icon: "cil-cursor",
        items: [
          {
            name: "Servicios",
            to: "/maestros/servicios",
          },
        ],
      },
      {
        _name: "CSidebarNavItem",
        name: "Atencion",
        to: "/atencion",
        icon: "cil-chart-pie",
      },

      {
        _name: "CSidebarNavDivider",
        _class: "m-2",
      },
    ],
  },
];
