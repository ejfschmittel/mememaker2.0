
const MEME_TEMPLATES_PATH = process.env.PUBLIC_URL + "/meme_templates/";


interface MemeTemplate {
    name: string,
    path: string
}


export const MEME_TEMPLATES: MemeTemplate[] = [
    {
        name: "",
        path: "TwoButtons.png"
    },
    {
        name: "",
        path: "ChangeMyMind.png"
    },
    {
        name: "",
        path: "DistractedBoyfriend.png"
    },
]


export const getTemplatePath = (template: MemeTemplate) => {
    return MEME_TEMPLATES_PATH + template.path 
}