import { FC, ReactNode } from 'react';
import getUsers from '@/app/actions/getUsers';
import { UserList } from '@/app/components/UserList';
import { Sidebar } from '@/app/components/Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const LayoutPage: FC<LayoutProps> = async ( { children } ) => {

    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <UserList users={ users }/>
                { children }
            </div>
        </Sidebar>
    );
};

export default LayoutPage;
