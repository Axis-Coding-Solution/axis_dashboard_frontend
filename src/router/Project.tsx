import AddProject from "@/pages/projects/add-project";
import Projects from "@/pages/projects/all-project";


export default [
    {
        element: <Projects />,
        path: "/app/projects/projects",
        meta : {
            layout : "default"
        }
    },
    {
        element: <AddProject />,
        path: "/app/projects/add-project",
        meta : {
            layout : "default"
        }
    }
]