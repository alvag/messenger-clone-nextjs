import { Modal } from '@/app/components/Modal';
import Image from 'next/image';

interface Props {
    src?: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ImageModal = ( { src, isOpen, onClose }: Props ) => {
    if ( !src ) return null;

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <div className="w-80 h-80">
                <Image className="object-cover" fill src={ src } alt="Image"/>
            </div>
        </Modal>
    );
};
