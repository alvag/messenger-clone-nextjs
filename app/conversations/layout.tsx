import { ConversationList } from '@/app/components/ConversationList';
import getConversations from '@/app/actions/getConversations';
import { Sidebar } from '@/app/components/Sidebar';

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
