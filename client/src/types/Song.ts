export interface ISong {
    _id: string;
    title: string;
    keyStrokes: number[];
}

export interface ISongs {
    songs: ISong[];
}

export type ISoungMutation = {
    addSong: ISong;
};
