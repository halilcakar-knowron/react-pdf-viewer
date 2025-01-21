import { type PdfJs, type Store } from '../../core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const useDocument: (store: Store<StoreProps>) => React.MutableRefObject<PdfJs.PdfDocument>;
