import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getGreeting } from "@/utils/greeting";

const WelcomeCard = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }
    
    return (
        <Card>
            <CardContent className="space-y-2 p-6 md:p-8">

                <h1 className="text-2xl font-bold md:text-3xl">
                    {getGreeting()}, {user.username} 👋
                </h1>

                <p className="text-muted-foreground">
                    Ready to capture today's thoughts?
                </p>

            </CardContent>
        </Card>
    );
};

export default WelcomeCard;