'use client';

import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { MessageBox } from '@/app/components/MessageBox';
import axios from 'axios';

interface Props {
    initialMessages: FullMessageType[];
}

export const Body = ( { initialMessages }: Props ) => {
    const [ messages, setMessages ] = useState( initialMessages );
    const bottomRef = useRef<HTMLDivElement>( null );

    const { conversationId } = useConversation();

    useEffect( () => {
        axios.post( `/api/conversations/${ conversationId }/seen` );
    }, [ conversationId ] );


    return (
        <div className="flex-1 overflow-y-auto">
            {
                messages.map( ( message, i ) => (
                    <MessageBox isLast={ i === messages.length - 1 }
                                message={ message }
                                key={ message.id }/>
                ) )
            }
            <div ref={ bottomRef } className="pt-24"/>
        </div>
    );
};
