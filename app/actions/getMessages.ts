import { FullMessageType } from '@/app/types';
import prisma from '@/app/libs/prismadb';

const getMessages = async ( conversationId: string ) => {
    try {
        return await prisma?.message.findMany( {
            where: {
                conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        } ) as FullMessageType[];
    } catch ( error ) {
        return [];
    }
}

export default getMessages;
