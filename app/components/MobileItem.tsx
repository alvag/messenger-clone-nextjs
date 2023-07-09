'use client';

import Link from 'next/link';
import clsx from 'clsx';

interface Props {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

export const MobileItem = ( { href, icon: Icon, active, onClick }: Props ) => {

    const handleClick = () => {
        if ( onClick ) onClick();
    }

    return (
        <Link href={ href }
              onClick={ handleClick }
              className={ clsx( `
              group 
              flex 
              flex-x-3
              text-sm
              leading-6
              font-semibold
              w-full
              justify-center
              p-4
              text-gray-500
              hover:text-black
              hover:bg-gray-100
              `,
                  active && "bg-gray-100 text-black" ) }>
            <Icon className="h-6 w-6"/>
        </Link>
    );
};
