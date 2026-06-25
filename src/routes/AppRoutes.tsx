import { Route, Routes, Navigate } from "react-router-dom";

import DashBoard from "@/pages/DashBoard";
import Journals from "@/pages/Journals";
import CreateJournal from "@/pages/CreateJournal";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/"  element= {<Navigate to="/dashboard" />} />  
            
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/journals" element={<Journals/>} />
            <Route path="/create-journal" element={<CreateJournal/>} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
    );
}