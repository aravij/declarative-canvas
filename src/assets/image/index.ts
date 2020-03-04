import { Asset } from "../type"

interface ImageProps
{
    crop: CropProps,
    scale: ScaleProps,
}

interface CropProps
{
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
}

interface ScaleProps
{
    widthFactor: number,
    heightFactor: number,
}

export class Image implements Asset
{
    constructor(source: string, imageProps: Partial<ImageProps> = {})
    {
        // default props
        this.imageProps =
        {
            crop:
            {
                offsetX: 0,
                offsetY: 0,
                // * Width and height of image is not known yet.
                // * Use zeros to prevent early drawings.
                // * Drawing cropped to zero images throw exception.
                width: 0,
                height: 0,
            }, 
            scale:
            {
                widthFactor: 1,
                heightFactor: 1,
            }
        }


        this.image = document.createElement("img")
        this.image.src = source

        this.image.decode().then(
            () => 
            {
                this.imageProps.crop.width = this.image.width
                this.imageProps.crop.height = this.image.height
                this.imageProps = { ...this.imageProps, ...imageProps }
            }
        )
    }

    draw(canvas: CanvasRenderingContext2D)
    {
        const { crop, scale } = this.imageProps
        canvas.drawImage(this.image, crop.offsetX, crop.offsetY, crop.width, crop.height, 0, 0,
                            scale.widthFactor * crop.width, scale.heightFactor * crop.height )        
    }

    async isAssetLoaded()
    {
        await this.image.decode()
        return this.image.complete
    }

    private image: HTMLImageElement
    private imageProps: ImageProps
}
