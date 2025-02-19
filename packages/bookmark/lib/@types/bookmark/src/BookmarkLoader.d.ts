import { type PdfJs, type Store } from '../../core';
import * as React from 'react';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
import { type StoreProps } from './types/StoreProps';
export declare const BookmarkLoader: React.FC<{
    doc?: PdfJs.PdfDocument;
    isBookmarkExpanded?: IsBookmarkExpanded;
    renderBookmarkItem?: RenderBookmarkItem;
    store: Store<StoreProps>;
}>;
