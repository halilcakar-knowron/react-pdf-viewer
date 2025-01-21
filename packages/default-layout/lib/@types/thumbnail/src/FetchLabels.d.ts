import { type PdfJs } from '../../core';
import * as React from 'react';
export declare const FetchLabels: React.FC<{
    children: (labels: string[]) => React.ReactElement;
    doc: PdfJs.PdfDocument;
}>;
