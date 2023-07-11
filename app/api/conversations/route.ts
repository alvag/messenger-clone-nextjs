import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST( req: Request ) {
    try {
        const { userId, isGroup, members, name } = await req.json();
        const currentUser = await getCurrentUser();

        if ( !currentUser?.id || !currentUser?.email ) {
            return NextResponse.json( { error: 'Unauthorized' }, { status: 401 } );
        }

        if ( isGroup && ( !members || members.length < 2 || !name ) ) {
            return NextResponse.json( { error: 'Invalid Request' }, { status: 400 } );
        }

        if ( isGroup ) {
            const newConversation = await prisma?.conversation.create( {
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map( ( member: { value: string } ) => ( { id: member.value } ) ),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            } );

            return NextResponse.json( newConversation );
        }

        const existingConversations = await prisma?.conversation.findMany( {
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [ currentUser.id, userId ]
                        }
                    },
                    {
                        userIds: {
                            equals: [ userId, currentUser.id ]
                        }
                    }
                ]
            }
        } );

        if ( existingConversations?.length ) {
            return NextResponse.json( existingConversations[ 0 ] );
        }

        const newConversation = await prisma?.conversation.create( {
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        } );

        return NextResponse.json( newConversation );
    } catch ( error ) {
        return NextResponse.json( { error: 'Internal Error' }, { status: 500 } );
    }
}
