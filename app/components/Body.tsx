'use client';

import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import useConversation from '@/app/hooks/useConversation';
import { MessageBox } from '@/app/components/MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

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

    useEffect( () => {
        pusherClient.subscribe( conversationId );
        bottomRef?.current?.scrollIntoView( { behavior: 'smooth' } );

        const messageHandler = ( message: FullMessageType ) => {
            axios.post( `/api/conversations/${ conversationId }/seen` );

            setMessages( current => {
                if ( find( current, { id: message.id } ) ) {
                    return current;
                }

                return [ ...current, message ];
            } );
            bottomRef?.current?.scrollIntoView( { behavior: 'smooth' } );
        }

        const updateMessageHandler = ( message: FullMessageType ) => {
            setMessages( current => {
                return current.map( currentMessage => {
                    if ( currentMessage.id === message.id ) {
                        return message;
                    }

                    return currentMessage;
                } );
            } )
        }

        pusherClient.bind( 'messages:new', messageHandler );
        pusherClient.bind( 'message:update', updateMessageHandler );

        return () => {
            pusherClient.unsubscribe( conversationId );
            pusherClient.unbind( 'messages:new', messageHandler );
            pusherClient.unbind( 'message:update', updateMessageHandler );
        }
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
