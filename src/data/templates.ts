
const MEME_TEMPLATES_PATH = process.env.PUBLIC_URL + "/meme_templates/";


export interface MemeTemplate {
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
    {
        name: "",
        path: "BatmanSlappingRobin.png"
    },
    {
        name: "",
        path: "BernieSupport.png"
    },
    {
        name: "",
        path: "BikeFall.png"
    },
    {
        name: "",
        path: "BuffDogeVS.png"
    },
    {
        name: "",
        path: "Draw25.png"
    },
    {
        name: "",
        path: "EpicHandshaker.png"
    },
    {
        name: "",
        path: "ExpandingBrain.png"
    },
    {
        name: "",
        path: "GrusPlan.png"
    },
    {
        name: "",
        path: "IsThisAPigeon.png"
    },
    {
        name: "",
        path: "LeftExitOffRamp.png"
    },
    {
        name: "",
        path: "MockingSpongebob.png"
    },
    {
        name: "",
        path: "OneDoesNotSimply.png"
    },
    {
        name: "",
        path: "RunningAwayBalloon.png"
    },
    {
        name: "",
        path: "SadPabloEscobar.png"
    },
    {
        name: "",
        path: "TheyAreTheSamePicture.png"
    },
    {
        name: "",
        path: "TradeOffer.png"
    },
    {
        name: "",
        path: "ThinkAboutIt.png"
    },
    {
        name: "",
        path: "ThisIsFine.png"
    },
    {
        name: "",
        path: "SuprisedPikachu.png"
    },
    {
        name: "",
        path: "LaughingLeo.png"
    },
    {
        name: "",
        path: "ThisIsWhereIdPutMyTrophyIfIHadOne.png"
    },
    {
        name: "",
        path: "FuturamaFry.png"
    },
    {
        name: "",
        path: "YallGotAnyMoreOfThat.png"
    },
    {
        name: "",
        path: "Drake.png"
    },

    {
        name: "",
        path: "SquidwardWindow.png"
    },
    {
        name: "",
        path: "TwoSpiderman.png"
    },
    {
        name: "",
        path: "SpongebobBurningPaper.png"
    },

    
]



export const getTemplatePath = (template: MemeTemplate) => {
    return MEME_TEMPLATES_PATH + template.path 
}