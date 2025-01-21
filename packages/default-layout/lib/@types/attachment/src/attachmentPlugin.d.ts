import { type Plugin } from '../../core/src';
import * as React from 'react';
export interface AttachmentPlugin extends Plugin {
    Attachments: () => React.ReactElement;
}
export declare const attachmentPlugin: () => AttachmentPlugin;
