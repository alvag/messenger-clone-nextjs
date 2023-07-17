import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';

interface Params {
    params: {
        conversationId?: string;
    }
}

export async function POST( req: Request, { params }: Params ) {
    try {
        const currentUser = await getCurrentUser();
        const { conversationId } = params;

        if ( !currentUser?.id || !currentUser?.email ) {
            return NextResponse.json( 'Unauthorized', { status: 401 } );
        }

        const conversation = await prisma.conversation.findUnique( {
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    }
                },
                users: true
            }
        } );

        if ( !conversation ) {
            return NextResponse.json( 'Not Found', { status: 404 } );
        }

        const lastMessage = conversation.messages[ conversation.messages.length - 1 ];

        if ( !lastMessage ) {
            return NextResponse.json( conversation );
        }

        const updatedMessage = await prisma.message.update( {
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        } );

        await pusherServer.trigger( currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [ updatedMessage ]
        } );

        if ( lastMessage.seenIds.indexOf( currentUser.id ) !== -1 ) {
            return NextResponse.json( conversation );
        }

        await pusherServer.trigger( conversationId!, 'message:update', updatedMessage );

        return NextResponse.json( updatedMessage );

    } catch ( error ) {
        return NextResponse.json( 'Internal Error', { status: 500 } );
    }
}
