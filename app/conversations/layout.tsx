import { ConversationList } from '@/app/components/ConversationList';
import getConversations from '@/app/actions/getConversations';
import { Sidebar } from '@/app/components/Sidebar';
import getUsers from '@/app/actions/getUsers';

interface Props {
    children: React.ReactNode;
}

export default async function ConversationsLayout( { children }: Props ) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    users={ users }
                    initialItems={ conversations }/>
                { children }
            </div>
        </Sidebar>
    );
};
