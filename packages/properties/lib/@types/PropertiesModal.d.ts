import { type PdfJs } from '../../core';
import * as React from 'react';
export declare const PropertiesModal: React.FC<{
    doc: PdfJs.PdfDocument;
    fileName: string;
    onToggle(): void;
}>;
