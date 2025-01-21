import { type PdfJs } from '../../core';
export interface PropertiesData {
    fileName: string;
    info: PdfJs.MetaDataInfo;
    length: number;
}
