import getSession from '@/app/actions/getSession';
import { User } from '@prisma/client';
import prisma from '@/app/libs/prismadb';

const getUsers = async (): Promise<User[]> => {
    const session = await getSession();

    if ( !session?.user?.email ) return [];

    try {
        const { email } = session.user

        return await prisma?.user.findMany( {
            orderBy: { createdAt: 'desc' },
            where: { NOT: { email } }
        } ) as User[];
    } catch ( error ) {
        return [];
    }
}

export default getUsers;
