import {
    Controller,
    type Control,
    type FieldValues,
} from "react-hook-form";

import {
    Input,
} from "@/components/ui/input";

interface JournalTitleInputProps<
    TFormValues extends FieldValues
> {
    control: Control<TFormValues>;
}

export default function JournalTitleInput<
    TFormValues extends FieldValues
>({
    control,
}: JournalTitleInputProps<TFormValues>) {

    return (
        <Controller
            name={"title" as never}
            control={control}
            render={({
                field,
                fieldState,
            }) => (
                <div className="space-y-2">

                    <Input
                        {...field}
                        value={
                            field.value ?? ""
                        }
                        placeholder="Give your journal a title..."
                        aria-invalid={
                            fieldState.invalid
                        }
                    />

                    {fieldState.error && (
                        <p className="text-sm text-destructive">
                            {
                                fieldState.error.message
                            }
                        </p>
                    )}

                </div>
            )}
        />
    );
}