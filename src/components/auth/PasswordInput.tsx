import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.ComponentPropsWithoutRef<typeof Input>;

const PasswordInput = React.forwardRef<
    React.ComponentRef<typeof Input>,
    PasswordInputProps
>(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative">

            <Input
                ref={ref}
                type={showPassword ? "text" : "password"}
                className={cn("pr-10", className)}
                {...props}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                aria-label={
                    showPassword ? "Hide password" : "Show password"
                }
            >
                {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                )}
            </Button>

        </div>
    );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;