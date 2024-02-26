import AddProject from "@/pages/projects/add-project";
import AllProjects from "@/pages/projects/all-project";

export default [
    {
        element: <AllProjects />,
        path: "/app/projects/all-projects",
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