import { type PdfJs } from '../../../core';
export type IsBookmarkExpanded = ({ bookmark, depth, doc, index, }: {
    bookmark: PdfJs.Outline;
    depth: number;
    doc: PdfJs.PdfDocument;
    index: number;
}) => boolean;
