'use client';

import { FC } from 'react';
import { EmptyState } from '@/app/components';

interface UsersProps {
}

const UsersPage: FC<UsersProps> = ( {} ) => {
    return (
        <div className="hidden lg:block lg:pl-80 h-full">
            <EmptyState/>
        </div>
    );
};

export default UsersPage;
