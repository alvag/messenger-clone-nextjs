import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

export async function POST( req: Request ) {
    try {
        const currentUser = await getCurrentUser();

        if ( !currentUser?.id || !currentUser?.email ) {
            return NextResponse.json( 'Unauthorized', { status: 401 } );
        }

        const body = await req.json();
        const { message, image, conversationId } = body;

        const newMessage = await prisma?.message.create( {
            data: {
                body: message,
                image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                seen: true,
                sender: true
            }
        } );

        const updatedConversation = await prisma?.conversation.update( {
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage?.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    }
                }
            }
        } );

        return NextResponse.json( newMessage );

    } catch ( error ) {
        return NextResponse.json( 'Internal Server Error', { status: 500 } );
    }
}
