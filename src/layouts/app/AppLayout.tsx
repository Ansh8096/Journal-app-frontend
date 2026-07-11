import { useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";

// In TypeScript, type is used to define the shape of data. Think of it like creating a blueprint.
// "This component expects a prop called children." and "children must be something React can render."
type DashboardLayoutProps= {
    children: React.ReactNode; // 'React.ReactNode' -> Anything React can display
}

const AppLayout = ({
    children
}:DashboardLayoutProps)=> {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="h-screen flex flex-col">
            <Navbar 
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebar={toggleSidebar}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                sidebarCollapsed={sidebarCollapsed}
                />
                <main
                    className="
                    transition-all
                    duration-300
                    flex-1
                    overflow-y-auto
                    bg-muted/20"
                >
                    <div className="container mx-auto p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppLayout;