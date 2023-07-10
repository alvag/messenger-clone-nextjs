import { FC, ReactNode } from 'react';
import { Sidebar } from '@/app/components';
import getUsers from '@/app/actions/getUsers';
import { UserList } from '@/app/components/UserList';

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
