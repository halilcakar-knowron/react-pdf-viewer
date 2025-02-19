/**
 * A React component to view a PDF document
 *
 * @see https://react-pdf-viewer.dev
 * @license https://react-pdf-viewer.dev/license
 * @copyright 2019-2024 Nguyen Huu Phuoc <me@phuoc.ng>
 */

import { Icon } from '../../core';
import * as React from 'react';

export const DualPageCoverViewModeIcon: React.FC = () => (
    <Icon size={16}>
        <rect x="0.5" y="0.497" width="22" height="22" rx="1" ry="1" />
        <line x1="0.5" y1="6.497" x2="22.5" y2="6.497" />
        <line x1="11.5" y1="6.497" x2="11.5" y2="22.497" />
    </Icon>
);
