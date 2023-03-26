import { Mode } from "../scenes/UI";

interface iGlobalData {
    screen: {
        x: number,
        y: number
    };
    game: {
        x: number,
        y: number
    }
    zoom: number;
    scroll: {
        x: number,
        y: number
    }
    mode: Mode
}

export const GlobalData: iGlobalData = {
    screen: {
        x: 0,
        y: 0
    },
    game: {
        x: 0,
        y: 0
    },
    scroll: {
        x: 0,
        y: 0
    },
    zoom: 1,
    mode: Mode.None
}