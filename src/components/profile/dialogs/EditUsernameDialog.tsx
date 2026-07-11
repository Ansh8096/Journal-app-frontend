import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useProfileMutations } from "@/hooks/useProfileMutations";
import {toast} from 'sonner'
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    usernameSchema,
    type UsernameFormData,
} from "@/schemas/profile/personal-information"
import { profileConfig } from "../Config";
import type { EventHandler } from "react";
import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { getErrorMessage } from "@/lib/error";
import { applyServerFormError } from "@/lib/forms/server-form-error";

type EditUsernameDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function EditUsernameDialog({
    open,
    onOpenChange,
}: EditUsernameDialogProps) {
    const { user } = useAuth();

    const { changeUsername } = useProfileMutations();

    const form = useForm<UsernameFormData>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: "",
        },
    });

    useEffect(() => {
        if (!open || !user) {
            return;
        }

        form.reset({
            username: user.username ?? "",
        });
    }, [form, open, user]);

    const onSubmit = async (
        data: UsernameFormData,
    ) => {

        try {
            const result = await changeUsername(data);

            if(!result.updated) {
                onOpenChange(false);
                return;
            }

            toast.success("Username updated successfully.")
            
            onOpenChange(false);
        } catch (error) {

            // apllies server errors...
            if (applyServerFormError(error,form)){
                return;
            }

            toast.error(getErrorMessage(error));
        }

    };

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
                        {profileConfig.dialogs.username.title}
                    </DialogTitle>

                    <DialogDescription>
                        {profileConfig.dialogs.username.description}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {profileConfig.labels.username}
                                    </FormLabel>

                                    <FormControl>
                                        <Input
                                            disabled={form.formState.isSubmitting}
                                            autoComplete="username"
                                            placeholder={
                                                profileConfig.placeholders.username
                                            }
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>

                            <Button
                                type="button"
                                variant="outline"
                                disabled={form.formState.isSubmitting}
                                onClick={() =>{
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
            </DialogContent>
        </Dialog>
    );
}