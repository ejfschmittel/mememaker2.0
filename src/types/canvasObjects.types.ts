

export interface CanvasObjectBase {
    id: string,
    type: string,
    x: number,
    y: number,
    rotation: number,
    width: number,
    height: number,
    flipHorizontal: boolean,
    flipVertical: boolean
}

export interface ImageCanvasObject extends CanvasObjectBase{
    src: object,
    sprite?: any,
    ogImgWidth?: number,
    ogImgHeight?: number,
}

export interface TextCanvasObject extends CanvasObjectBase{
    text: string,
    fontSize: number,
    color: string,
    borderColor: string,
    borderWidth: number,
}


export type CanvasObject = ImageCanvasObject | TextCanvasObject;