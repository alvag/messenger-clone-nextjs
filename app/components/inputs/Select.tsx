import ReactSelect from 'react-select';

interface Props {
    label: string;
    value?: Record<string, any>
    onChange?: ( value: Record<string, any> ) => void;
    options: Record<string, any>[];
    disabled?: boolean;
}

export const Select = ( { label, value, onChange, options, disabled }: Props ) => {
    return (
        <div className="z-[100]">
            <label className="black text-sm font-medium leading-6 text-gray-900">
                { label }
            </label>

            <div className="mt-2">
                <ReactSelect isDisabled={ disabled }
                             onChange={ onChange }
                             isMulti
                             options={ options }
                             menuPortalTarget={ document.body }
                             value={ value }
                             styles={ {
                                 menuPortal: base => ( { ...base, zIndex: 9999 } )
                             } }
                             classNames={ {
                                 control: () => "text-sm"
                             } }
                />
            </div>
        </div>
    );
};
