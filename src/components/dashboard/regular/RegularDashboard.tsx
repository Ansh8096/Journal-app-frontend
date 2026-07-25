import WelcomeCard from "@/components/dashboard/regular/WelcomeCard";
import QuickActions from "@/components/dashboard/regular/QuickActions";
import MotivationCard from "@/components/dashboard/regular/MotivationCard";
import StatsCard from "@/components/common/StatsCard";
import { regularDashboardConfig } from "@/components/dashboard/regular/Config";
import RecentJournalsCard from "@/components/dashboard/regular/RecentJournalsCard";

export default function RegularDashboard() {

    return (
        <div className="space-y-6">
                {/* Welcome Card */}
                <WelcomeCard />

                {/* Statistics cards */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {regularDashboardConfig.statistics.items.map((stat) => (
                    
                        <StatsCard
                            key={stat.title}
                            title={stat.title}
                            value={stat.value}
                            subtitle={stat.subtitle}
                            icon={stat.icon}
                            iconClassName={stat.iconClassName}
                        />
                    
                    ))}

                </div>

                {/* Recent Journals Card  */}
                <RecentJournalsCard />
                
                {/* Quick actions card... */}
                <QuickActions />

                <MotivationCard />

            </div>

    )
}

