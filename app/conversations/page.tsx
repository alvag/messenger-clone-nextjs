'use client';

import { FC } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { EmptyState } from '@/app/components';
import clsx from 'clsx';

interface ConversationsProps {
}

const ConversationsPage: FC<ConversationsProps> = ( {} ) => {
    const { isOpen } = useConversation();

    return (
        <div className={ clsx(
            "lg:pl-80 h-full lg:block",
            isOpen ? "block" : "hidden"
        ) }>
            <EmptyState/>
        </div>
    );
};

export default ConversationsPage;
