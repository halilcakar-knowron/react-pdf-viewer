/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

'use client';

import { type PdfJs, type Store, type StoreHandler } from '../../core';
import * as React from 'react';
import { BookmarkLoader } from './BookmarkLoader';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
import { type StoreProps } from './types/StoreProps';

export const BookmarkListWithStore: React.FC<{
    isBookmarkExpanded?: IsBookmarkExpanded;
    renderBookmarkItem?: RenderBookmarkItem;
    store: Store<StoreProps>;
}> = ({ isBookmarkExpanded, renderBookmarkItem, store }) => {
    const [currentDoc, setCurrentDoc] = React.useState(store.get('doc'));

    const handleDocumentChanged: StoreHandler<PdfJs.PdfDocument> = (doc: PdfJs.PdfDocument) => {
        setCurrentDoc(doc);
    };

    React.useEffect(() => {
        store.subscribe('doc', handleDocumentChanged);

        return () => {
            store.unsubscribe('doc', handleDocumentChanged);
        };
    }, []);

    return (
        <BookmarkLoader
            doc={currentDoc}
            isBookmarkExpanded={isBookmarkExpanded}
            renderBookmarkItem={renderBookmarkItem}
            store={store}
        />
    );
};
