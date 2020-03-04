export interface Asset
{
    draw(canvasContext: CanvasRenderingContext2D): void
    isAssetLoaded(): Promise<boolean>
}