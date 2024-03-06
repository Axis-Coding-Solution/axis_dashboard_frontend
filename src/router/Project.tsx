
import Projects from "@/pages/projects/all-project";
import TaskBoard from "@/pages/projects/task-board";


export default [
    {
        element: <Projects />,
        path: "/app/projects/projects",
        meta : {
            layout : "default"
        }
    },
    {
        element: <TaskBoard />,
        path: "/app/projects/task-board",
        meta : {
            layout : "default"
        }
    }
]