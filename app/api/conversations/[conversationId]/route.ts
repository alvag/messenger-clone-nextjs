import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface Props {
    params: {
        conversationId: string;
    }
}

export async function DELETE( req: Request, { params }: Props ) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if ( !currentUser?.id ) {
            return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );
        }

        const existingConversation = await prisma.conversation.findUnique( {
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        } );

        if ( !existingConversation ) {
            return NextResponse.json( { error: 'Not Found' }, { status: 404 } );
        }

        const deleteConversation = await prisma.conversation.deleteMany( {
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [ currentUser.id ]
                }
            }
        } );

        return NextResponse.json( deleteConversation );

    } catch ( error ) {
        console.log( error );
        return NextResponse.json( 'Internal Server Error', { status: 500 } );
    }
}
