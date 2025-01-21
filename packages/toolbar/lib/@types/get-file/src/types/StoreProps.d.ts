import { type OpenFile, type PdfJs } from '../../../core';
export interface StoreProps {
    doc?: PdfJs.PdfDocument;
    file?: OpenFile;
}
