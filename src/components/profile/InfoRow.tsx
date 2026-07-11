
type InfoRowProps = {
    label: React.ReactNode;
    value?: string;
    action?: React.ReactNode; // now we can pass anything (such as: button, labels, etc)
};
export function InfoRow({
    label,
    value,
    action,
}: InfoRowProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                    {label}
                </p>

                {action}
            </div>

            <p className="text-base font-medium">
                {value || "Not provided"}
            </p>
        </div>
    );
}