/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

'use client';

import { getDestination, type PdfJs, type Store } from '../../core';
import * as React from 'react';
import { BookmarkList } from './BookmarkList';
import { DownArrowIcon } from './DownArrowIcon';
import { RightArrowIcon } from './RightArrowIcon';
import { shouldBeCollapsed } from './shouldBeCollapsed';
import styles from './styles/bookmarkItem.module.css';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
import { type StoreProps } from './types/StoreProps';
import { useCollapse } from './useCollapse';

export const BookmarkItem: React.FC<{
    bookmark: PdfJs.Outline;
    depth: number;
    doc: PdfJs.PdfDocument;
    index: number;
    isBookmarkExpanded?: IsBookmarkExpanded;
    numberOfSiblings: number;
    pathFromRoot: string;
    renderBookmarkItem?: RenderBookmarkItem;
    store: Store<StoreProps>;
}> = ({
    bookmark,
    depth,
    doc,
    index,
    isBookmarkExpanded,
    numberOfSiblings,
    pathFromRoot,
    renderBookmarkItem,
    store,
}) => {
    const path = pathFromRoot ? `${pathFromRoot}.${index}` : `${index}`;
    const defaultIsCollapsed = React.useMemo(() => shouldBeCollapsed(bookmark), [bookmark]);
    const bookmarkExpandedMap = store.get('bookmarkExpandedMap');
    const defaultExpanded = isBookmarkExpanded
        ? isBookmarkExpanded({ bookmark, doc, depth, index })
        : bookmarkExpandedMap && bookmarkExpandedMap.has(path)
          ? bookmarkExpandedMap.get(path)!
          : !defaultIsCollapsed;

    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const toggle = () => setExpanded((v) => !v);
    const [subItemsListRef, collapseSubItems, expandSubItems] = useCollapse(toggle);

    const hasSubItems = bookmark.items && bookmark.items.length > 0;

    const toggleSubItems = (): void => {
        store.updateCurrentValue('bookmarkExpandedMap', (currentValue) => currentValue.set(path, !expanded));
        expanded ? collapseSubItems() : expandSubItems();
    };

    const jumpToDest = () => {
        const { dest } = bookmark;
        if (!dest) {
            return;
        }
        const jumpToDestination = store.get('jumpToDestination');

        getDestination(doc, dest).then((target) => {
            if (jumpToDestination) {
                jumpToDestination({
                    label: bookmark.title,
                    ...target,
                });
            }
        });
    };

    const clickBookmark = (): void => {
        if (hasSubItems && bookmark.dest) {
            jumpToDest();
        }
    };

    const clickItem = (): void => {
        if (!hasSubItems && bookmark.dest) {
            jumpToDest();
        }
    };

    const defaultRenderItem = (onClickItem: () => void, children: React.ReactNode) => (
        <div
            className={styles.item}
            style={{
                paddingLeft: `${depth * 1.25}rem`,
            }}
            onClick={onClickItem}
        >
            {children}
        </div>
    );

    const defaultRenderToggle = (expandIcon: React.ReactElement, collapseIcon: React.ReactElement) =>
        hasSubItems ? (
            <span className={styles.toggle} data-testid={`bookmark__toggle-${depth}-${index}`} onClick={toggleSubItems}>
                {expanded ? expandIcon : collapseIcon}
            </span>
        ) : (
            <span className={styles.toggle} />
        );

    const defaultRenderTitle = (onClickBookmark: () => void) =>
        bookmark.url ? (
            <a
                className={styles.title}
                href={bookmark.url}
                rel="noopener noreferrer nofollow"
                target={bookmark.newWindow ? '_blank' : ''}
            >
                {bookmark.title}
            </a>
        ) : (
            <div className={styles.title} aria-label={bookmark.title} onClick={onClickBookmark}>
                {bookmark.title}
            </div>
        );

    return (
        <li
            aria-expanded={expanded ? 'true' : 'false'}
            aria-label={bookmark.title}
            aria-level={depth + 1}
            aria-posinset={index + 1}
            aria-setsize={numberOfSiblings}
            role="treeitem"
            tabIndex={-1}
        >
            {renderBookmarkItem
                ? renderBookmarkItem({
                      bookmark,
                      depth,
                      hasSubItems,
                      index,
                      isExpanded: expanded,
                      path,
                      defaultRenderItem,
                      defaultRenderTitle,
                      defaultRenderToggle,
                      onClickItem: clickItem,
                      onClickTitle: clickBookmark,
                      onToggleSubItems: toggleSubItems,
                  })
                : defaultRenderItem(
                      clickItem,
                      <>
                          {defaultRenderToggle(<DownArrowIcon />, <RightArrowIcon />)}
                          {defaultRenderTitle(clickBookmark)}
                      </>,
                  )}
            {hasSubItems && (
                <BookmarkList
                    bookmarks={bookmark.items}
                    depth={depth + 1}
                    doc={doc}
                    isBookmarkExpanded={isBookmarkExpanded}
                    isRoot={false}
                    pathFromRoot={path}
                    ref={subItemsListRef}
                    renderBookmarkItem={renderBookmarkItem}
                    store={store}
                />
            )}
        </li>
    );
};
