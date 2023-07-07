import { FC } from 'react';
import Image from 'next/image';
import { AuthForm, Input } from '@/app/components';

interface SiteProps {
}

const SitePage: FC<SiteProps> = ( {} ) => {
    return (
        <div className="flex flex-col min-h-full justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image src="/images/logo.png" height={ 48 } width={ 48 } alt="Logo" className="mx-auto w-auto"/>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <AuthForm/>
        </div>
    );
};

export default SitePage;
