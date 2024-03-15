import { createContext } from "react";
import { ViolenceType } from "enums/violencetype";


interface ParentDashboardContextData {
    parentDashboardState: "general" | "denuncia";
    setParentDashboardState: (parentDashboardState: "general" | "denuncia") => void;
}


export const ParentDashboardContext = createContext<ParentDashboardContextData>({
        parentDashboardState: "general",
        setParentDashboardState: () => {}
});