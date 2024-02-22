import MuiIcons from "@/components/mui-icons";
export const projects = [
    {
        name: "Projects",
        path: "/app/projects",
        icon: <MuiIcons.RocketLaunchOutlinedIcon  />,
        children: [
            {
                name: "All Projects",
                path: "/app/projects/all-projects",
            },
            {
                name: "Add Project",
                path: "/app/projects/add-project",
            }
        ]
    },
   
]