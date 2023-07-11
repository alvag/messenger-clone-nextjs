import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

const getConversationById = async ( conversationId: string ) => {
    try {
        const currentUser = await getCurrentUser();

        if ( !currentUser?.email ) return null;

        return await prisma?.conversation.findUnique( {
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        } );
    } catch ( error ) {
        return null;
    }
}

export default getConversationById;
