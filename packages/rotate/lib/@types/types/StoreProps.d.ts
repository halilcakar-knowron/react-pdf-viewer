import { RotateDirection } from '../../core';
export interface StoreProps {
    rotate?(direction: RotateDirection): void;
    rotatePage?(pageIndex: number, direction: RotateDirection): void;
}
