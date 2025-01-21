import { type Destination, type PdfJs } from '../../../core';
export interface StoreProps {
    bookmarkExpandedMap: Map<string, boolean>;
    doc?: PdfJs.PdfDocument;
    jumpToDestination?(destination: Destination): void;
}
