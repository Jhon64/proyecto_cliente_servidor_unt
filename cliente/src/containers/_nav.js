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
        name: "Compras",
        route: "/compras",
        icon: "cil-puzzle",
        items: [
          {
            name: "Breadcrumbs",
            to: "/base/breadcrumbs",
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
            name: "Empleados",
            to: "/maestros/empleados",
          },
          {
            name: "Empresas",
            to: "/maestros/empresas",
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
