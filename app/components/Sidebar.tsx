import { ReactNode } from 'react';
import { DesktopSidebar } from '@/app/components/DesktopSidebar';
import { MobileFooter } from '@/app/components/MobileFooter';

interface Props {
    children: ReactNode;
}

export const Sidebar = ( { children }: Props ) => {
    return (
        <div className="h-full">
            <DesktopSidebar/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
                { children }
            </main>
        </div>
    );
};
