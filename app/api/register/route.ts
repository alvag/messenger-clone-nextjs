import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST( req: Request ) {
    try {
        const body = await req.json();
        const { email, name, password } = body;

        if ( !email || !name || !password ) {
            return NextResponse.json( { error: 'Missing info' }, { status: 400 } );
        }

        const hashedPassword = await bcrypt.hash( password, 12 );

        const user = await prisma.user.create( {
            data: {
                email,
                name,
                hashedPassword,
            }
        } );

        return NextResponse.json( user );
    } catch ( error ) {
        console.log( error, 'REGISTRATION_ERROR' );
        return NextResponse.json( { error: 'Internal Error' }, { status: 500 } );
    }
}
