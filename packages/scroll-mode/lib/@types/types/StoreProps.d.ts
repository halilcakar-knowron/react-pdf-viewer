import { ScrollMode, ViewMode } from '../../../core';
export interface StoreProps {
    scrollMode: ScrollMode;
    viewMode: ViewMode;
    switchScrollMode(scrollMode: ScrollMode): void;
    switchViewMode(viewMode: ViewMode): void;
}
