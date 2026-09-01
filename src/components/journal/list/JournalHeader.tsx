import { BookOpen, Plus } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import { journalPageConfig } from "./JournalListConfig";

interface JournalHeaderProps {
    onCreate?: () => void;
}

export default function JournalHeader({
    onCreate,
}: JournalHeaderProps) {

    return (
        <PageHeader
            title={journalPageConfig.title}
            description={journalPageConfig.description}
            icon={BookOpen}
            iconClassName="text-violet-600 dark:text-violet-400"
            actionLabel={journalPageConfig.actions.createJournal}
            actionIcon={Plus}
            onAction={onCreate}
        />
    );
}