import { NavigationContainer } from "@react-navigation/native";
import TabUserRoutes from "./tabUser.routes";
import TabCompanyRoutes from "./tabCompany.routes";
import StackRoutes from "./stack.routes";
import { useAuth } from "../contexts/Auth";

export default function Routes() {
    const { isAuthenticated, authType, authData } = useAuth();
    console.log("index: " + authData);
    return (
        <NavigationContainer>
            {authData ? (
                authType === "company" ? (
                    <TabCompanyRoutes />
                ) : 
                    <TabUserRoutes />
            ) : (
                <StackRoutes />
            )}
        </NavigationContainer>
    )
}