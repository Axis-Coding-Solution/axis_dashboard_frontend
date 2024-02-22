import Analytic1 from "@/pages/analytics/analytic-1";
import Analytic2 from "@/pages/analytics/analytic-2";

export default [
    {
        path: "/app/analytics",
    },
    {
        Element: <Analytic1 />,
        path: "/app/analytics/analytic-1",
        meta : {
            layout : "default"
        }
    },
    {
        Element: <Analytic2 />,
        path: "/app/analytics/analytic-2",
        meta : {
            layout : "default"
        }
    }
]