import AppLayout from "@/layouts/app/AppLayout"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Flame, Sun, BookText, SquarePen, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const recentJournals = [
    {
        id: 1,
        title: "Learning React Dashboard Layouts",
        createdAt: "2 hours ago",
    },
    {
        id: 2,
        title: "Building Sidebar using shadcn/ui",
        createdAt: "Yesterday",
    },
    {
        id: 3,
        title: "Kafka Revision Notes",
        createdAt: "2 days ago",
    },
];

function DashBoardPage() {
    return (
        <AppLayout >

            <div className="space-y-6">
                {/* Welcome Card */}
                <Card>
                    <CardContent className="p-8"> {/** p-8 adds an internal padding... */}
                        <h1 className="text-3xl font-bold">
                            Good Evening, Ansh 👋
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Welcome back to your journal journey.
                        </p>
                    </CardContent>
                </Card>

                {/* Statistics cards */}
                <div className="grid gap-6 md:grid-cols-3">

                    {/* Card 1 - 'Total Entries' */}
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Total Journals
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        42
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Entries
                                    </p>
                                </div>
                            
                                <BookOpen className="h-8 w-8 text-muted-foreground" />
                            
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 2 - 'streak' */}
                    <Card>
                        <CardContent>
                            <div className="flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Current Streak
                                    </p>
        
                                    <h2 className="mt-2 text-3xl font-bold">
                                        12
                                    </h2>
        
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Days
                                    </p>
                                </div>

                                <Flame className="h-8 w-8 text-orange-500" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3 ->  weather*/}
                    <Card>
                        <CardContent>
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                        Today's Weather
                                        </p>
                                
                                        <h2 className="mt-2 text-3xl font-bold">
                                            34°C
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Chandigarh
                                        </p>
                                    </div>

                                    <Sun className="h-8 w-8 text-yellow-500" />
                                
                                </div>
                        </CardContent>  
                    </Card>

                </div>

                {/* Recent Journals Card  */}
                <Card>
                    <CardContent className="p-6">

                        {/* Heading Part... */}
                        <div className="flex items-start justify-between">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Recent Journals
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Your latest journal entries.
                                </p>
                            </div>

                            {/* View all journals button... */}
                            <div className="mt-6 flex justify-end">
                                <Button variant='ghost' size="sm" asChild>
                                    <Link to='/journals'>
                                    View all 
                                    <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>

                        </div>

                        {/* Recent journals... */}
                        <div className="mt-6 space-y-4">

                            {recentJournals.map((journal) => (
                                <div
                                key={journal.id}
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    rounded-lg
                                    border
                                    p-3
                                    transition-colors
                                    hover:bg-muted/50"
                                >
                                    <BookText className="h-5 w-5 text-muted-foreground" />

                                    <div>
                                        <h3 className="font-medium">
                                            {journal.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {journal.createdAt}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>

                    </CardContent>
                </Card>
                
                {/* Quick actions card... */}
                <Card>
                    <CardContent className="p-5">

                        {/* Heading Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                Quick Actions
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Quickly access common actions.
                            </p>

                            
                        </div>

                        {/* Action Buttons */}
                        <div className="grid gap-4 md:grid-cols-3">
                            
                            {/* Create journal card */}
                            <Link to="/create-journal">              
                                <Card className="transition-all hover:shadow-md hover:-translate-y-1">
                                    <CardContent className="flex flex-col items-center p-6">       
                                        <SquarePen className="mb-3 h-8 w-8" />

                                            <h3 className="font-semibold">
                                                Create Journal
                                            </h3>

                                            <p className="text-sm text-muted-foreground text-center">
                                                Write a new journal entry
                                            </p>
                                    </CardContent>
                                </Card>
                            </Link>

                            {/* All journal card */}
                            <Link to="/journals">    
                                <Card className="transition-all hover:shadow-md hover:-translate-y-1">
                                    <CardContent className="flex flex-col items-center p-6">
                                        <BookOpen className="mb-3 h-8 w-8" />

                                        <h3 className="font-semibold">
                                            My Journals
                                        </h3>

                                        <p className="text-sm text-muted-foreground text-center">
                                            View all journal entries
                                        </p>

                                    </CardContent>
                                </Card>
                            </Link>

                            {/* Profile Card */}
                            <Link to="/profile">          
                                <Card className="transition-all hover:shadow-md hover:-translate-y-1">        
                                    <CardContent className="flex flex-col items-center p-6">

                                        <User className="mb-3 h-8 w-8" />

                                        <h3 className="font-semibold">
                                            Profile
                                        </h3>

                                        <p className="text-sm text-muted-foreground text-center">
                                            Manage your account
                                        </p>

                                    </CardContent>         
                                </Card>              
                            </Link>
                                                
                        </div>
                        
                    </CardContent>
                </Card>

            </div>

        </AppLayout>
    )
}

export default DashBoardPage;