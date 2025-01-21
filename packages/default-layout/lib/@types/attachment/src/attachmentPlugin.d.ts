import { type Plugin } from '../../core';
import * as React from 'react';
export interface AttachmentPlugin extends Plugin {
    Attachments: () => React.ReactElement;
}
export declare const attachmentPlugin: () => AttachmentPlugin;
