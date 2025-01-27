'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { Label } from '../ui';
import { RequiredSymbol } from './required-symbol';

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <div>
            <p className="font-medium mb-2">
                <Label>{'Адрес'}</Label> <RequiredSymbol />
            </p>
            <AddressSuggestions
                inputProps={{
                    className:
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                }}
                token="987f9b87ac93737b9eabde2e9d56f5d81e72502d"
                onChange={(data) => onChange?.(data?.value)}
            />
        </div>
    );
};
