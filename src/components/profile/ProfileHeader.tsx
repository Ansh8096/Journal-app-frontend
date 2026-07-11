import { profileConfig } from "./Config";

export function ProfileHeader() {
    return (
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight">
                    {profileConfig.page.title}
                </h1>

                <p className="text-muted-foreground">
                    {profileConfig.page.description}
                </p>
            </div>
    );
}