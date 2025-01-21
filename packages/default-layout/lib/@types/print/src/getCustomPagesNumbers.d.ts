import { type PdfJs } from '../../core';
export declare const getCustomPagesNumbers: (customPages: string) => ((doc: PdfJs.PdfDocument) => number[]);
