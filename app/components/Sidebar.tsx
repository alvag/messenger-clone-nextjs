import { ReactNode } from 'react';
import { DesktopSidebar } from '@/app/components/DesktopSidebar';
import { MobileFooter } from '@/app/components/MobileFooter';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface Props {
    children: ReactNode;
}

export const Sidebar = async ( { children }: Props ) => {
    const currentUser = await getCurrentUser();

    return (
        <div className="h-full">
            <DesktopSidebar currentUser={ currentUser! }/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
                { children }
            </main>
        </div>
    );
};






