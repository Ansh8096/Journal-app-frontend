import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// In TypeScript, type is used to define the shape of data. Think of it like creating a blueprint.
// "This component expects a prop called children." and "children must be something React can render."
type DashboardLayoutProps= {
    children: React.ReactNode; // 'React.ReactNode' -> Anything React can display
}

export default function DashboardLayout({
    children
    }:DashboardLayoutProps)  // ':DashboardLayoutProps' -> props must follow DashboardLayoutProps
{

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Navbar 
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar 
                collapsed={collapsed}
                />
                <main
                className="
                flex-1
                overflow-y-auto
                bg-muted/20"
                >
                    <div className="p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}