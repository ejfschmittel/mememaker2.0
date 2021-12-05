

export interface CanvasObjectBase {
    id: string,
    x: number,
    y: number,
    rotation: number,
    width: number,
    height: number,
}

export interface ImageCanvasObject extends CanvasObjectBase{
    src: object,
    sprite?: any,
    ogImgWidth?: number,
    ogImgHeight?: number,
}

export interface TextCanvasObject extends CanvasObjectBase{
    fontSize: number,
    tint: string,
    borderTint: string,
    borderWidth: number,
}


export type CanvasObject = ImageCanvasObject | TextCanvasObject;