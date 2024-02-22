// ** file for creating navigation ui for the app including mobile menu with appropriate folder structure.

import { analytic } from "./analytic";
import { dashboard } from "./dashboard";
import { employees } from "./employees";
import { projects } from "./projects";

export const NavigationData = [
    ...dashboard,
    ...analytic,
    ...employees,
    ...projects,
]