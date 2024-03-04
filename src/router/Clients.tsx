// import AddClient from "@/pages/clients/all-client/add-client"
import AllClient from "@/pages/clients/all-clients"

export default [
    {
        element: <AllClient />  ,
        path: "/clients",
        meta : {
            layout : "default"
        }
    },
    {
        // element: <AddClient />  ,
        path: "/clients/add-client",
        meta : {
            layout : "default"
        }
    }
]