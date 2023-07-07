'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/app/components/inputs/Input'
import { Button } from '@/app/components/Button'
import { AuthSocialButton } from '@/app/components/AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';

type Variant = 'LOGIN' | 'REGISTER';

export const AuthForm = () => {
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

        if ( variant === 'REGISTER' ) {
            await axios.post( '/api/register', data );
            setIsLoading( false );
        }
        if ( variant === 'LOGIN' ) {
            // NextAuth login
        }
    }

    const socialAction = ( action: string ) => {
        setIsLoading( true );
        // NextAuth social login
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
                        <AuthSocialButton icon={ BsGithub } onClick={ () => socialAction( 'github' ) }/>
                        <AuthSocialButton icon={ BsGoogle } onClick={ () => socialAction( 'google' ) }/>
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
