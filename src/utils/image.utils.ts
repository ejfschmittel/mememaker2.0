export const loadImage = async (image: any): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src  =  URL.createObjectURL(image)    
    })
}


export const loadImageFromURL = async (imageURL: string):Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src  =  imageURL  
    })
}


export const canvasToBlob = async (canvas: HTMLCanvasElement) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        })
    })
}
