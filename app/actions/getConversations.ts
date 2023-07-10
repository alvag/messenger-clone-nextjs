import getCurrentUser from '@/app/actions/getCurrentUser';
import { FullConversationType } from '@/app/types';

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if ( !currentUser?.id ) return [];

    try {
        return await prisma?.conversation.findMany( {
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        } ) as FullConversationType[];
    } catch ( error ) {
        return [];
    }
}

export default getConversations;
