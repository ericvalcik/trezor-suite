import { ReactNode } from 'react';
import { DropdownMenuItemProps } from '@trezor/components';
import { MetadataAddPayload } from 'src/types/suite/metadata';
import { AccountType } from '@suite-common/wallet-config';
import { NetworkType } from '@suite-common/wallet-config';

export interface Props {
    accountType?: AccountType;
    networkType?: NetworkType;
    path?: string;
    defaultVisibleValue?: ReactNode;
    defaultEditableValue?: string;
    payload: MetadataAddPayload;
    dropdownOptions?: DropdownMenuItemProps[];
    isDisabled?: boolean;
    // override default onSubmit logic
    onSubmit?: (value: string | undefined) => void;
    // override default behavior of metadata labeling element visible only on hover
    visible?: boolean;
    placeholder?: string;
    updateFlag?: any;
}

export interface ExtendedProps extends Props {
    editActive: boolean;
    onSubmit: (value: string | undefined) => void;
    onBlur: () => void;
    'data-testid': string;
}
