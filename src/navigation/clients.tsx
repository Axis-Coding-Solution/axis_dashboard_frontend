import MuiIcons from "@/components/mui-icons";

export const Clients = [
    {
        path: "/clients",
        name: "Clients",
        icon: <MuiIcons.Groups3Icon  />,
        children: [
            {
                path: "/clients",
                name: "All Clients",
            },
            {
                path: "/clients/add-client",
                name: "Add Client",
            },
        ]
    },


]