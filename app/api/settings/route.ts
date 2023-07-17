import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST( req: Request ) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { name, image } = body;

        if ( !currentUser?.id ) {
            return NextResponse.json( 'Unauthorized', { status: 401 } );
        }

        const updatedUser = await prisma.user.update( {
            where: {
                id: currentUser.id
            },
            data: {
                name,
                image
            }
        } );

        return NextResponse.json( updatedUser );

    } catch ( error ) {
        return NextResponse.json( 'Internal Server Error', { status: 500 } );
    }
}
