import { RootState, AppThunk } from "../store";
import { ISong } from "../../types/Song";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISongsState {
    songs: ISong[];

    mode: "RECORD" | "PAUSE" | "PLAYING" | "IDLE";
    titleOfrecordableSong: string;
    recordableSong: number[] | [];
    currentSong: number[];
    currentSongId: string;

    currentNote: number;
    currentNoteIndex: number;

    isPianoAcceseble: boolean;
}

const initialState: ISongsState = {
    songs: [],

    mode: "IDLE",
    titleOfrecordableSong: "",
    recordableSong: [],

    currentSong: [],
    currentSongId: "",

    currentNote: 0,
    currentNoteIndex: 0,

    isPianoAcceseble: true,
};

export const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        addLoadedSongsToStore: (state: ISongsState, action: PayloadAction<ISong[]>) => {
            state.songs = [...action.payload];
        },
        addNewSong: (state: ISongsState, action: PayloadAction<ISong>) => {
            state.songs = [...state.songs, action.payload];
            state.recordableSong = [];
            state.mode = "IDLE";
        },
        setPlayingSong: (state: ISongsState, action: PayloadAction<ISong>) => {
            state.mode = "PLAYING";
            state.currentSong = action.payload.keyStrokes;
            state.currentSongId = action.payload._id;
        },
        playNote: (state: ISongsState, action: PayloadAction<number>) => {
            state.currentNoteIndex = action.payload;
            state.currentNote = state.currentSong[action.payload];
        },
        playNextNote: (state: ISongsState) => {
            state.currentNoteIndex = state.currentNoteIndex + 1;
            state.currentNote = state.currentSong[state.currentNoteIndex + 1];
        },
        stopSong: (state: ISongsState) => {
            state.currentSong = [];
            state.currentSongId = "";
            state.currentNote = 0;
            state.currentNoteIndex = 0;
            state.mode = "IDLE";
        },
        pauseSong: (state: ISongsState) => {
            state.mode = "PAUSE";
        },
        startRecording: (state: ISongsState) => {
            state.mode = "RECORD";
        },
        stopRecording: (state: ISongsState) => {
            state.mode = "IDLE";
        },
        recordNote: (state: ISongsState, action: PayloadAction<number>) => {
            state.recordableSong = [...state.recordableSong, action.payload];
        },
        cleanlRecordedSong: (state: ISongsState) => {
            state.mode = "IDLE";
            state.titleOfrecordableSong = "";
            state.recordableSong = [];
        },
        setPianoAccess: (state: ISongsState, action: PayloadAction<boolean>) => {
            state.isPianoAcceseble = action.payload;
        },
    },
});

export const playSongThunk = (song: ISong): AppThunk => {
    return (dispatch, getState) => {
        const {
            songs: { currentNoteIndex },
        } = getState();
        const lengthOfSong = song.keyStrokes.length;

        dispatch(setPlayingSong(song));
        dispatch(playNote(currentNoteIndex));

        const playNextNotes = (noteIndex: number) => {
            const isLastNoteofSong = lengthOfSong === noteIndex;
            const timerID = window.setTimeout(() => {
                const {
                    songs: { mode },
                } = getState();

                if (isLastNoteofSong || mode === "PAUSE") {
                    stopPlay(timerID);
                    isLastNoteofSong && dispatch(stopSong());
                    return;
                } else {
                    dispatch(playNote(noteIndex));
                    playNextNotes(noteIndex + 1);
                }
            }, 500);
        };

        const stopPlay = (timerID: number) => {
            clearTimeout(timerID);
            return;
        };
        playNextNotes(currentNoteIndex + 1);
    };
};

export const selectSongs = (state: RootState) => state;

export const {
    addLoadedSongsToStore,
    addNewSong,
    setPianoAccess,
    playNote,
    playNextNote,
    setPlayingSong,
    stopSong,
    pauseSong,
    startRecording,
    stopRecording,
    recordNote,
    cleanlRecordedSong,
} = songsSlice.actions;

export default songsSlice.reducer;
