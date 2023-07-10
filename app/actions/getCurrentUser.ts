import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
    try {
        const session = await getSession();

        if ( !session?.user?.email ) return null;

        const { email } = session.user;

        return await prisma.user.findUnique( {
            where: { email }
        } );
    } catch ( error ) {
        return null;
    }
};

export default getCurrentUser;
