import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    loginDefaultValues,
    loginSchema,
    type LoginFormValues,
} from "@/schemas/auth/auth.schema";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";

const LoginForm = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
        }
    }, [location.state]);
    
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: loginDefaultValues,
    });

    const onSubmit = async (values: LoginFormValues): Promise<void> => {
        try {
            // today LoginFormValues and LoginRequest is same, so we don't need to map them...
            await login(values); // this method will login the user and will fetch its details for the dashboard internally...
            navigate(ROUTES.DASHBOARD,{
                replace: true, // without this user returns to /login, which doesn't make sense after authenticated...
            });

        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    return (
        <Card className="shadow-lg">

            <CardContent className="p-8">

                <Form {...form}>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-8"
                    >

                        {/* AuthHeader */}
                        <AuthHeader
                            title="Welcome Back 👋"
                            description="Sign in to continue your journaling journey."
                        />

                        {/* Username and password input */}

                        <div className="space-y-6">

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Username
                                        </FormLabel>

                                        <FormControl>

                                            <Input
                                                autoFocus
                                                placeholder="Enter your username"
                                                autoComplete="username"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Password
                                        </FormLabel>

                                        <FormControl>

                                            <PasswordInput
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Signing In..."
                                : "Login" }

                        </Button>

                        <div className="text-center text-sm text-muted-foreground">

                            Don't have an account?{" "}

                            <Link
                                to="/signup"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign Up
                            </Link>

                        </div>

                    </form>

                </Form>

            </CardContent>

        </Card>
    );
};

export default LoginForm;