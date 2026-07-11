import {
    AccountInformationCard,
    PersonalInformationCard,
    PreferencesCard,
    ProfileHeader,
    UserAvatar,
} from "@/components/profile";
import { ChangeEmailDialog } from "@/components/profile/dialogs/ChangeEmailDialog";
import { EditPreferencesDialog } from "@/components/profile/dialogs/EditPreferencesDialog";
import { EditUsernameDialog } from "@/components/profile/dialogs/EditUsernameDialog";
import AppLayout from "@/layouts/app/AppLayout";
import { useState } from "react";

export default function ProfilePage() {
    
    const [preferencesDialogOpen, setPreferencesDialogOpen] = useState(false);
    const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);

    return (
        <AppLayout>

            <div className="space-y-8">
                <ProfileHeader />
        
                <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

                    {/* UserAvatar card */}
                    <UserAvatar />
        
                    <div className="space-y-6">

                        {/* Personal Information Card and its edit dialog */}
                        <PersonalInformationCard
                            onEditEmail={() => {setEmailDialogOpen(true)}}
                            onEditUsername={() => {setUsernameDialogOpen(true)}}
                        />
                        <ChangeEmailDialog 
                            open = {emailDialogOpen}
                            onOpenChange={setEmailDialogOpen}
                        />
                        <EditUsernameDialog
                            open = {usernameDialogOpen}
                            onOpenChange={setUsernameDialogOpen}
                        />

                        {/* Preference Card and its edit dialog */}
                        <PreferencesCard
                            onEdit={() => {setPreferencesDialogOpen(true)}}
                        />
                        
                        <EditPreferencesDialog
                            open={preferencesDialogOpen}
                            onOpenChange={setPreferencesDialogOpen}
                        />

                        {/* Account Information Card */}
                        <AccountInformationCard />
                    </div>

                </div>

            </div>

        </AppLayout>    
    );
}