/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { type PdfJs } from '../../core';

export const shouldBeCollapsed = (bookmark: PdfJs.Outline): boolean => {
    const { count, items } = bookmark;
    if (count === undefined) {
        return false;
    }

    if (count >= 0) {
        return false;
    }
    let numSubItems = items.length;
    if (numSubItems === 0) {
        return false;
    }

    let subItems = items.concat([]);
    while (subItems.length > 0) {
        const firstChild = subItems.shift()!;
        const children = firstChild.items;
        if (firstChild.count && children && firstChild.count > 0 && children.length > 0) {
            numSubItems += children.length;
            subItems = subItems.concat(children);
        }
    }

    return Math.abs(count) === numSubItems;
};
