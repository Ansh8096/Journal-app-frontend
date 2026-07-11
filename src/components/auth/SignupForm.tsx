import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";

import AuthHeader from "./AuthHeader";
import PasswordInput from "./PasswordInput";

import {
    signupDefaultValues,
    signupSchema,
    type SignupFormValues,
} from "@/schemas/auth/auth.schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import authService  from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import { applyServerFormError } from "@/lib/forms/server-form-error";

const SignupForm = () => {

    const navigate = useNavigate();

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: signupDefaultValues,
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = form;

    const onSubmit = async (values: SignupFormValues): Promise<void> => {
        
        try {
            // today SignupFormValues and RegisterRequest is same, so we don't need to map them...
            await authService.signup(values);            
            navigate(ROUTES.LOGIN,{
                replace: true,
                state: {
                    message: "Account created successfully. Please sign in.",
                },
            })

        } catch (error) {
            if(applyServerFormError(error, form)) return;
            toast.error(getErrorMessage(error));            
        }

    };

    return (
        <Card className="shadow-lg">

            <CardContent className="p-8">

                <Form {...form}>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="space-y-8"
                    >

                        <AuthHeader
                            title="Create Your Account ✨"
                            description="Start your journaling journey today."
                        />

                        <fieldset className="space-y-6">

                            {/* Username */}

                            <FormField
                                control={control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Username
                                        </FormLabel>

                                        <FormControl>

                                            <Input
                                                placeholder="Choose a username"
                                                autoComplete="username"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* Email */}

                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Email
                                        </FormLabel>

                                        <FormControl>

                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                autoComplete="email"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* City */}

                            <FormField
                                control={control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            City
                                        </FormLabel>

                                        <FormControl>

                                            <Input
                                                placeholder="Enter your city"
                                                autoComplete="address-level2"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* Password */}

                            <FormField
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel>
                                            Password
                                        </FormLabel>

                                        <FormControl>

                                            <PasswordInput
                                                placeholder="Create a password"
                                                autoComplete="new-password"
                                                {...field}
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* Weekly Journal Insights */}

                            <FormField
                                control={control}
                                name="sentimentAnalysisEnabled"
                                render={({ field }) => (
                                <FormItem className="flex items-center gap-6 rounded-lg border p-4">

                                    <div className="flex-1 space-y-1">

                                        <FormLabel>
                                            Weekly Journal Insights
                                        </FormLabel>

                                        <FormDescription>
                                            Receive a personalized weekly summary based on your journal entries.
                                        </FormDescription>

                                    </div>

                                    <FormControl>

                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />

                                    </FormControl>

                                </FormItem>
                                )}
                            />

                        </fieldset>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-medium text-primary hover:underline"
                            >
                                Login
                            </Link>

                        </div>

                    </form>

                </Form>

            </CardContent>

        </Card>
    );
};

export default SignupForm;