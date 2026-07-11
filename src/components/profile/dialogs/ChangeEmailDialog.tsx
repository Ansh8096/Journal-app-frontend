import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    emailSchema,
    type ChangeEmailFormData,
} from "@/schemas/profile/personal-information"

import { profileConfig } from "../Config";

import { Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import PasswordInput from "@/components/auth/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, type EventHandler } from "react";
import { toast } from "sonner";
import { useProfileMutations } from "@/hooks/useProfileMutations";
import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { getErrorMessage } from "@/lib/error";
import { applyServerFormError } from "@/lib/forms/server-form-error";

type ChangeEmailDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function ChangeEmailDialog({
    open,
    onOpenChange,
}: ChangeEmailDialogProps) {

    const {user} = useAuth();
    const {changeEmail} = useProfileMutations();

    const form = useForm<ChangeEmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            newEmail: "",
            password: "",
        },
    });

    const onSubmit = async (
        data: ChangeEmailFormData,
    ) => {
        try {
            const result = await changeEmail(data);

            if (!result.updated) {
                onOpenChange(false);
                return;
            }

            toast.success("Email updated successfully.");

            onOpenChange(false);
        } catch (error) {

            // apllies server errors...
            if (applyServerFormError(error,form)){
                return;
            }

            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        if (!open || !user) {
            return;
        }

        form.reset({
            newEmail: user.email ?? "",
            password: "",
        });
    }, [form, open, user]);

    const preventCloseWhileSubmitting : EventHandler<any> = (e) =>{
        if (form.formState.isSubmitting) {
            e.preventDefault();
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) =>{
                if(form.formState.isSubmitting) return; // The dialog shouldn't disappear while the request is in flight.
                onOpenChange(nextOpen);
            }}
        >
            <DialogContent
                className="sm:max-w-lg"
                onPointerDownOutside={preventCloseWhileSubmitting}
                onEscapeKeyDown={preventCloseWhileSubmitting}
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                }}
            >
                <DialogHeader>
                    <DialogTitle>
                        {profileConfig.dialogs.changeEmail.title}
                    </DialogTitle>

                    <DialogDescription>
                        {profileConfig.dialogs.changeEmail.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-6 py-4">
                                <FormField
                                    control={form.control}
                                    name="newEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                {profileConfig.labels.newEmail}
                                            </FormLabel>
                                    
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder={profileConfig.placeholders.newEmail}
                                                    disabled={form.formState.isSubmitting}
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
                                                Current Password
                                            </FormLabel>
                                    
                                            <FormControl>
                                                <PasswordInput
                                                    autoComplete="current-password"
                                                    placeholder={profileConfig.placeholders.currentPassword}
                                                    disabled={form.formState.isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                    
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                                
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={form.formState.isSubmitting}
                                    onClick={() => {
                                        form.reset();
                                        onOpenChange(false);
                                    }}
                                >
                                    {profileConfig.actions.cancel}
                                </Button>
                                
                                <LoadingSubmitButton
                                    loading={form.formState.isSubmitting}
                                    loadingText={profileConfig.actions.saving}
                                >
                                    {profileConfig.actions.save}
                                </LoadingSubmitButton>
                                
                            </DialogFooter>

                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    );
}