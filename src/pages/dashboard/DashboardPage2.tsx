import WelcomeCard from "@/components/dashboard/WelcomeCard";
import QuickActions from "@/components/dashboard/QuickActions";
import AppLayout from "@/layouts/app/AppLayout";
import MotivationCard from "@/components/dashboard/MotivationCard";

const DashboardPage2 = () => {
    return (
        <AppLayout>
            <section className="space-y-6 pb-6">

                <WelcomeCard />

                <QuickActions />

                <MotivationCard />

            </section>
        </AppLayout>    
    );
};

export default DashboardPage2;