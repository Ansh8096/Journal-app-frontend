import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";
import { ROUTES } from "@/constants/routes";
import JournalPage from "@/pages/journal/JournalPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import DashBoardPage2 from "@/pages/dashboard/DashboardPage2";
// import DashBoardPage from "@/pages/dashboard/DashBoardPage";


const AppRoutes = () => {
    return (
        <Routes>
        
        {/* Default */}
    
            <Route
                path="/"
                element={
                    <Navigate
                        to={ROUTES.DASHBOARD}
                        replace
                    />
                }
            />
    
            {/* Public */}
            <Route element={<PublicRoute />}>
                <Route
                    path={ROUTES.LOGIN}
                    element={<LoginPage />}
                />
    
                <Route
                    path={ROUTES.SIGNUP}
                    element={<SignupPage />}
                />
            </Route>
            
            {/* Protected */}
            <Route element={<ProtectedRoute />}>
                {/* <Route
                    path={ROUTES.DASHBOARD}
                    element={<DashBoardPage />}
                /> */}

                <Route
                    path={ROUTES.DASHBOARD }
                    element={<DashBoardPage2 />}
                />
                <Route
                    path={ROUTES.PROFILE}
                    element={<ProfilePage />}
                />
            </Route>
            
            
            
            <Route
                path={ROUTES.JOURNALS}
                element={<JournalPage />}
            />

            <Route
                path={ROUTES.SETTINGS}
                element={<SettingsPage />}
            />
    
          {/* 404 */}
            
            <Route
                path="*"
                element={
                <Navigate
                    to="/"
                    replace
                />
                }
            />
    
        </Routes>
    );
}

export default AppRoutes;