import {
    LayoutDashboard,
    BookOpen,
    SquarePen,
    User,
    Settings,
    LogOut
} from 'lucide-react'

import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger

}   from '@/components/ui/dropdown-menu';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import{
    Avatar , AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'

import { NavLink } from 'react-router-dom';
import { Separator} from '@/components/ui/separator';

// TypeScript now knows: collapsed → boolean, setCollapsed → function
type sidebarProps ={
    collapsed: boolean,
};

export default function Sidebar({
    collapsed,
} : sidebarProps) { 

    const menuItems = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "My Journals",
            path: "/journals",
            icon: BookOpen,
        },
        {
            title: "Create Journal",
            path: "/create-journal",
            icon: SquarePen,
        },
        {
            title: "Profile",
            path: "/profile",
            icon: User,
        },
        {
            title: "Settings",
            path: "/settings",
            icon: Settings,
        },
    ];

    return ( 
    // 'aside' -> HTML semantic tag. Used for sidebars and secondary content. 
    // Equivalent to: <div> but more meaningful...
    <aside className={`flex h-full flex-col border-r bg-background p-4 transition-all duration-300 ${collapsed ? "w-20" : "w-56"}`}> {/* border-r -> add border on right side... */} 
        
        <TooltipProvider>
            {/* Logo:  */}
            <div className="mb-8">
                {!collapsed && (
                    <h2 className="text-2xl font-bold tracking-tight">
                        Journal App
                    </h2>
                )}
            </div>

            {/* 'nav' -> HTML tag for navigation links. */}
            <nav className="space-y-2 flex-1" > {/* 'flex-1' consumes all available space and pushes everything below it to the bottom... */}

                {menuItems && menuItems.map( (item) => {
                    const Icon = item.icon;
                    return (
                        <Tooltip key={item.path}>  {/* 'Tooltip' -> this is a parent container... */}
                            {/* 'TooltipTrigger' ->  What should show the tooltip? */}
                            <TooltipTrigger asChild> 

                                <div>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                        `flex items-center
                                        ${collapsed ? "justify-center" : "gap-3"}
                                        p-2 rounded-lg transition-colors
                                        ${
                                            isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                        }`}
                                    >
                                        <Icon size={18} />
                                
                                        {!collapsed && (
                                            <span>{item.title}</span>
                                        )}
                                    </NavLink>
                                </div>
                                
                            </TooltipTrigger>
                                
                            {collapsed && (
                                <TooltipContent side="right"> {/* 'TooltipContent' -> This is the popup info itself... */} 
                                    {item.title}
                                </TooltipContent>
                            )}

                        </Tooltip>
                    );
                })}
            </nav>

            <Separator className='my-4'/>
            
            <DropdownMenu> {/*'DropdownMenu'-> is the parent container, it manages Open state, Close state, Positioning, Keyboard navigation, Accessibility */}
                
                <Tooltip>

                    <TooltipTrigger asChild>

                        {/* 'DropdownMenuTrigger' defines: What should open the dropdown? (in our case: button)*/}
                        {/* asChild is used, beacuse without this Radix creates its own button, which is invalid */}
                        <DropdownMenuTrigger asChild>
                            <button
                                className={`
                                    flex
                                    w-full
                                    items-center
                                    ${collapsed ? "justify-center" : "justify-between"}
                                    rounded-lg
                                    p-2
                                    hover:bg-muted    
                                `}
                            >
                            
                                <div className="flex items-center gap-3">
                                    <Avatar >
                                        <AvatarImage src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'/>
                                        <AvatarFallback>
                                            AV
                                        </AvatarFallback>
                                    </Avatar>
                                
                                    {!collapsed && 
                                    <div className="text-left">
                                        <p className="text-sm font-medium">
                                            Ansh Verma
                                        </p>
                                    
                                        <p className="text-xs text-muted-foreground">
                                            Journal User
                                        </p>
                                    
                                    </div>}
                                </div>
                                
                            </button>
                        </DropdownMenuTrigger>
                                    
                    </TooltipTrigger>
                                    
                    {collapsed && (
                        <TooltipContent side="right">
                            Profile Menu
                        </TooltipContent>
                    )}

                </Tooltip>
                
                {/* Defines the dropdown panel. */}
                <DropdownMenuContent
                    side="top"
                    align="end"
                    className="w-48"
                >
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                
                    <DropdownMenuItem>
                        <Settings className='mr-2 h-4 w-4'/>
                        Settings
                    </DropdownMenuItem>
                
                    <DropdownMenuItem className="text-red-500">
                        <LogOut className='mr-2 h-4 w-4'/>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
                
            </DropdownMenu>
        </TooltipProvider>

    </aside>
    
    ); 
}