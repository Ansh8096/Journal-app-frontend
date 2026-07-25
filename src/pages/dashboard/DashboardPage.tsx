import FirstTimeDashboard from "@/components/dashboard/first-time/FirstTimeDashboard";
import RegularDashboard from "@/components/dashboard/regular/RegularDashboard";
import AppLayout from "@/layouts/app/AppLayout"


function DashboardPage() {
    const firsTime = false;

    return (
        <AppLayout>
            {firsTime? (
                <FirstTimeDashboard/>
            ) : (
                <RegularDashboard/>
            )}
        </AppLayout>
    )
}

export default DashboardPage;