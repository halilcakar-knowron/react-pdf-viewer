import { type PdfJs } from '../../core';
import * as React from 'react';
import { type PropertiesData } from './types/PropertiesData';
export declare const PropertiesLoader: React.FC<{
    doc: PdfJs.PdfDocument;
    render(doc: PropertiesData): React.ReactElement;
}>;
