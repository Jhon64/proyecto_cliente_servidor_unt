console.log("navegacion");
let usuario = localStorage.getItem("usuario");
let rutas = [];
if (usuario !== null) {
  let usuarioParse = JSON.parse(usuario);
  console.log(usuarioParse);
  let rol = usuarioParse.rol;

  if (rol == 1) {
    rutas = [
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
            _children: ["Components"],
          },

          {
            _name: "CSidebarNavDropdown",
            name: "Reservaciones",
            route: "/buttons",
            icon: "cil-cursor",
            items: [
              {
                name: "Catalogo",
                to: "/reservacion/catalogo",
              },
              {
                name: "Citas",
                to: "/reservacion/cita",
              },
              {
                name: "Reservacion",
                to: "/reservacion/reservacion",
              },
              {
                name: "Pagos",
                to: "/reservacion/cita",
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
  }
  if (rol == 3) {
    rutas = [
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
            name: "Reservaciones",
            route: "/reservacion",
            icon: "cil-cursor",
            items: [
              {
                name: "Citas",
                to: "/reservacion/cita",
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
              {
                name: "Catalogo",
                to: "/maestros/catalogos",
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
  }
}

export default rutas;
