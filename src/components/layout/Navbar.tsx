import { Input } from "@/components/ui/input";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    User,
    Settings,
    LogOut,
    Search,
    Bell,
    Menu
} from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";


type navBarProps = {
    collapsed: boolean,
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({
    collapsed,
    setCollapsed
} : navBarProps) {
    return ( 
        <header
            className="
            flex
            sticky
            top-0
            z-50
            h-14
            items-center
            justify-between
            border-b
            bg-background
            py-3
            px-6
            "
        >
        
        <div className="flex iems-center gap-6">

            {/* Menu and search bar ...*/}
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="
                            rounded-lg
                            p-2
                            hover:bg-muted
                            transition-colors
                            "
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </TooltipTrigger>

                    <TooltipContent side="bottom">
                        {collapsed
                            ? "Expand Sidebar"
                            : "Collapse Sidebar"
                        }
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>


            <div className="relative w-96">
            <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />

            <Input
                placeholder="Search journals..."
                className="pl-10"
            />
            
            </div>

        </div>
        
        

        <div className="flex items-center gap-2">

            <button className="
                rounded-lg
                p-2
                hover:bg-muted"
            >
                <Bell className="h-5 w-5" />
            </button>

            {/* Right Section */}
        
            <DropdownMenu> {/*'DropdownMenu'-> is the parent container, it manages Open state, Close state, Positioning, Keyboard navigation, Accessibility */}

                {/* 'DropdownMenuTrigger' defines: What should open the dropdown? (in our case: button)*/} 
                {/* asChild is used, beacuse without this Radix creates its own button, which is invalid */}
                <DropdownMenuTrigger asChild>
                <button
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        p-2
                        hover:bg-muted"
                >
                        <Avatar >
                            <AvatarImage src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png'/>
                            <AvatarFallback>
                                AV
                            </AvatarFallback>
                        </Avatar>

                        <span className="font-medium">
                            Ansh Verma
                        </span>
                    {/* <span>▼</span> */}
                </button>
                </DropdownMenuTrigger>

                {/* Defines the dropdown panel. */}
                <DropdownMenuContent align="end">
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

        </div>
        </header>
    );

}
