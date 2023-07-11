import { FC } from 'react';
import getConversationById from '@/app/actions/getConversationById';
import getMessages from '@/app/actions/getMessages';
import { EmptyState } from '@/app/components';
import { Header } from '@/app/components/Header';
import { Body } from '@/app/components/Body';
import { Form } from '@/app/components/Form';

interface ConversationProps {
    params: {
        conversationId: string;
    }
}

const ConversationPage: FC<ConversationProps> = async ( { params } ) => {
    const conversation = await getConversationById( params.conversationId );
    const messages = await getMessages( params.conversationId );

    if ( !conversation ) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState/>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={ conversation }/>
                <Body initialMessages={ messages }/>
                <Form/>
            </div>
        </div>
    );
};

export default ConversationPage;
