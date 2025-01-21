import { type PdfJs, type Store } from '../../core';
import { type StoreProps } from './types/StoreProps';
export declare const useDocument: (store: Store<StoreProps>) => {
    currentDoc: PdfJs.PdfDocument;
};
