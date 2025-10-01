export const sideMenu = [
    {
      title: "Main",
      menu: false,
      path: "",
      icon: "",
      child: [],
      Menu_ID: 1,
    },
    {
      title: "Dashboard",
      menu: true,
      icon: "la la-dashboard",
      path: "/app/main/dashboard",
      child: [],
      Menu_ID: 2,
    },
    {
      title: "Employee Management",
      menu: true,
      icon: "la la-user",
      path: "#",
      child: [
        {
          title: "All Employees",
          menu: false,
          icon: "",
          path: "/app/employee/allemployees",
          child: [], 
          Menu_ID: 20,
        },
        {
          title: "Leaves",
          menu: false,
          icon: "",
          path: "/app/employee/leaves-admin",
          child: [],
          Menu_ID: 21,
        },
        {
          title: "Attendance",
          menu: false,
          icon: "",
          path: "/app/employee/attendance-admin",
          child: [],
          Menu_ID: 22,
        },
        {
          title: "Departments",
          menu: false,
          icon: "",
          path: "/app/employee/departments",
          child: [],
          Menu_ID: 23,
        },
        {
          title: "Designations",
          menu: false,
          icon: "",
          path: "/app/employee/designations",
          child: [],
          Menu_ID: 24,
        },
      ],
      Menu_ID: 3,
    },
   
  
    {
      title: "Policies",
      menu: true,
      path: "/app/hr/policies",
      icon: "la la-file-pdf-o",
      child: [],
      Menu_ID: 19,
    },
  ];
  
  