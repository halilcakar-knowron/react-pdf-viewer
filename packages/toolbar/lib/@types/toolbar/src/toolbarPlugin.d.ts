import { type Plugin } from '../../core';
import { type FullScreenPlugin, type FullScreenPluginProps } from '../../full-screen';
import { type GetFilePlugin, type GetFilePluginProps } from '../../get-file';
import { type OpenPlugin, type OpenPluginProps } from '../../open';
import { type PageNavigationPlugin, type PageNavigationPluginProps } from '../../page-navigation';
import { type PrintPlugin, type PrintPluginProps } from '../../print';
import { type PropertiesPlugin } from '../../properties';
import { type RotatePlugin } from '../../rotate';
import { type ScrollModePlugin } from '../../scroll-mode';
import { type SearchPlugin, type SearchPluginProps } from '../../search';
import { type SelectionModePlugin, type SelectionModePluginProps } from '../../selection-mode';
import { type ThemePlugin } from '../../theme';
import { type ZoomPlugin, type ZoomPluginProps } from '../../zoom';
import * as React from 'react';
import { ToolbarProps } from './Toolbar';
import { type ToolbarSlot } from './types/ToolbarSlot';
import { type TransformToolbarSlot } from './types/TransformToolbarSlot';
export interface ToolbarPlugin extends Plugin {
    renderDefaultToolbar: (transformToolbarSlot: TransformToolbarSlot) => (defaultToolbarSlot: ToolbarSlot) => React.ReactElement;
    Toolbar: (props: ToolbarProps) => React.ReactElement;
    readonly fullScreenPluginInstance: FullScreenPlugin;
    readonly getFilePluginInstance: GetFilePlugin;
    readonly openPluginInstance: OpenPlugin;
    readonly pageNavigationPluginInstance: PageNavigationPlugin;
    readonly printPluginInstance: PrintPlugin;
    readonly propertiesPluginInstance: PropertiesPlugin;
    readonly rotatePluginInstance: RotatePlugin;
    readonly scrollModePluginInstance: ScrollModePlugin;
    readonly searchPluginInstance: SearchPlugin;
    readonly selectionModePluginInstance: SelectionModePlugin;
    readonly themePluginInstance: ThemePlugin;
    readonly zoomPluginInstance: ZoomPlugin;
}
export interface ToolbarPluginProps {
    fullScreenPlugin?: FullScreenPluginProps;
    getFilePlugin?: GetFilePluginProps;
    openPlugin?: OpenPluginProps;
    pageNavigationPlugin?: PageNavigationPluginProps;
    printPlugin?: PrintPluginProps;
    searchPlugin?: SearchPluginProps;
    selectionModePlugin?: SelectionModePluginProps;
    zoomPlugin?: ZoomPluginProps;
}
export declare const toolbarPlugin: (props?: ToolbarPluginProps) => ToolbarPlugin;
