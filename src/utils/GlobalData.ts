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
    zoom: 1
}