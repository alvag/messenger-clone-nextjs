import { FC, ReactNode } from 'react';
import { Sidebar } from '@/app/components';

interface LayoutProps {
    children: ReactNode;
}

const LayoutPage: FC<LayoutProps> = ( { children } ) => {
    return (
        <Sidebar>
            <div className="h-full">
                { children }
            </div>
        </Sidebar>
    );
};

export default LayoutPage;
