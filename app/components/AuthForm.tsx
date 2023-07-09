'use client';

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/app/components/inputs/Input'
import { Button } from '@/app/components/Button'
import { AuthSocialButton } from '@/app/components/AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

export const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

    useEffect( () => {
        if ( session?.status === 'authenticated' ) {
            router.push( '/users' );
        }
    }, [ session?.status, router ] );


    const [ variant, setVariant ] = useState<Variant>( 'LOGIN' );
    const [ isLoading, setIsLoading ] = useState<boolean>( false );

    const toggleVariant = useCallback( () => {
        if ( variant === 'LOGIN' ) {
            setVariant( 'REGISTER' );
        } else {
            setVariant( 'LOGIN' );
        }
    }, [ variant ] );

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>( {
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    } );

    const onSubmit: SubmitHandler<FieldValues> = async ( data ) => {
        setIsLoading( true );

        try {
            if ( variant === 'REGISTER' ) {
                await axios.post( '/api/register', data );
            }
            await onSignIn( 'credentials', data );
            router.push( '/users' );
        } catch ( error ) {
            let errorMessage = 'Something went wrong!';
            if ( error instanceof AxiosError ) {
                errorMessage = error.response?.data?.error;
            }
            toast.error( errorMessage );
        } finally {
            setIsLoading( false );
        }


    }

    const onSignIn = async ( provider: string, data = {} ) => {
        setIsLoading( true );
        try {
            const resp = await signIn( provider, { ...data, redirect: false } );
            console.log( resp )
            if ( resp?.error ) {
                return toast.error( resp.error );
            }

            if ( resp?.ok ) {
                toast.success( 'Logged in successfully!' );
            }
        } catch ( error ) {
            console.log( error );
        } finally {
            setIsLoading( false );
        }
    }


    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={ handleSubmit( onSubmit ) }>
                    { variant === 'REGISTER' && (
                        <Input label="Name"
                               id="name"
                               type="text"
                               register={ register }
                               errors={ errors }
                               disabled={ isLoading }
                        />
                    ) }

                    <Input label="Email"
                           id="email"
                           type="email"
                           register={ register }
                           errors={ errors }
                           disabled={ isLoading }
                    />

                    <Input label="Password"
                           id="password"
                           type="password"
                           register={ register }
                           errors={ errors }
                           disabled={ isLoading }
                    />

                    <div>
                        <Button fullWidth disabled={ isLoading } type="submit">
                            { variant === 'LOGIN' ? 'Sign in' : 'Register' }
                        </Button>
                    </div>

                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"/>
                        </div>

                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or continue with
                            </span>
                        </div>

                    </div>

                    <div className="mt-6 flex gap-3">
                        <AuthSocialButton icon={ BsGithub } onClick={ () => onSignIn( 'github' ) }/>
                        <AuthSocialButton icon={ BsGoogle } onClick={ () => onSignIn( 'google' ) }/>
                    </div>
                </div>

                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        { variant === 'LOGIN' ? 'Don\'t have an account?' : 'Already have an account?' }
                    </div>

                    <div className="underline cursor-pointer"
                         onClick={ toggleVariant }>
                        { variant === 'LOGIN' ? 'Register' : 'Sign in' }
                    </div>
                </div>
            </div>
        </div>
    );
};
