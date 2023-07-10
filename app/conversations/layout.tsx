import { Sidebar } from '@/app/components';
import { ConversationList } from '@/app/components/ConversationList';
import getConversations from '@/app/actions/getConversations';

interface Props {
    children: React.ReactNode;
}

export default async function ConversationsLayout( { children }: Props ) {
    const conversations = await getConversations();

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={ conversations }/>
                { children }
            </div>
        </Sidebar>
    );
};
