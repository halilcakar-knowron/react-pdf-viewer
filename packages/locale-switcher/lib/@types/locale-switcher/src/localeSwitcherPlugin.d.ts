import { type Plugin } from '../../core';
import * as React from 'react';
import { LocalePopoverProps } from './LocalePopover';
export interface LocaleSwitcherPlugin extends Plugin {
    LocalePopover: (props: LocalePopoverProps) => React.ReactElement;
}
export declare const localeSwitcherPlugin: () => LocaleSwitcherPlugin;
