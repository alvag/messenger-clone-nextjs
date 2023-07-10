import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Avatar from '@/app/components/Avatar';

interface Props {
    user: User;
}

export const UserBox = ( { user }: Props ) => {
    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState<boolean>( false );

    const handleClick = useCallback( () => {
        setIsLoading( true );
        const { id: userId } = user;
        axios.post( '/api/conversations', { userId } )
            .then( data => {
                const { id: conversationId } = data.data;
                router.push( `/conversations/${ conversationId }` );
            } )
            .finally( () => setIsLoading( false ) );
    }, [ user, router ] );

    return (
        <div onClick={ handleClick }
             className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer">
            <Avatar user={ user }/>
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-gray-900">
                            { user.name }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
