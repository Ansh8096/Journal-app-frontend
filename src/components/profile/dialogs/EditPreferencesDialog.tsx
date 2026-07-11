import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { profileConfig } from "../Config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    preferencesSchema,
    type PreferencesFormData,
} from "@/schemas/profile/personal-information";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, type EventHandler } from "react";
import LoadingSubmitButton from "@/components/common/LoadingSubmitButton";
import { toast } from "sonner";
import { useProfileMutations } from "@/hooks/useProfileMutations";
import { getErrorMessage } from "@/lib/error";

type EditPreferencesDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function EditPreferencesDialog({
    open,
    onOpenChange,
}: EditPreferencesDialogProps) {

    const {user} = useAuth();
    const {updatePreferences} = useProfileMutations();

    const form = useForm<PreferencesFormData>({
        resolver: zodResolver(preferencesSchema),
        defaultValues: {
            city: "",
            sentimentAnalysisEnabled: false,
        },
    });

    const onSubmit = async (
        data: PreferencesFormData,
    ) => {
        try {
            const result = await updatePreferences(data);

            if (!result.updated) {
                onOpenChange(false);
                return;
            }

            toast.success(
                "Preferences updated successfully."
            );

            onOpenChange(false);
        } catch (error) {
            toast.error(getErrorMessage(error));
        }
    };

    useEffect(() => {
        if (!open || !user) {
            return;
        }

        form.reset({
            city: user.city ?? "",
            sentimentAnalysisEnabled:
                user.sentimentAnalysisEnabled,
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
                onOpenAutoFocus={(e) => {
                    e.preventDefault();
                }}
                onPointerDownOutside={preventCloseWhileSubmitting}
                onEscapeKeyDown={preventCloseWhileSubmitting}
            >
                <DialogHeader>
                    <DialogTitle>
                        {profileConfig.dialogs.preferences.title}
                    </DialogTitle>

                    <DialogDescription>
                        {profileConfig.dialogs.preferences.description}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {profileConfig.labels.city}
                                        </FormLabel>
                                
                                        <FormControl>
                                            <Input
                                                autoComplete="address-level2"
                                                placeholder={
                                                    profileConfig.placeholders.city
                                                }
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
                                name="sentimentAnalysisEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                disabled={form.formState.isSubmitting}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                {profileConfig.labels.sentimentAnalysis}
                                            </FormLabel>
                                
                                            <FormDescription>
                                                {profileConfig.descriptions.weeklySentimentEmails}
                                            </FormDescription>
                                
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={form.formState.isSubmitting}
                                    onClick={() => {
                                        // when the upload is cancelled, reset form user actual details... 
                                        if (user) {
                                            form.reset({
                                                city: user.city ?? "",
                                                sentimentAnalysisEnabled: user.sentimentAnalysisEnabled,
                                            });
                                        }
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