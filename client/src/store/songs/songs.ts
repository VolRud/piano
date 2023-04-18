import { RootState, AppThunk } from "../store";
import { ISong } from "../../types/Song";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISongsState {
    songs: ISong[];
    songsIsLoaded: boolean;

    mode: "RECORD" | "PAUSE" | "PLAYING" | "IDLE";
    titleOfrecordableSong: string;
    recordableSong: number[] | [];
    currentSong: number[];
    currentSongId: string;

    currentNote: number;
    currentNoteIndex: number;

    isPianoVisible: boolean;
}

const initialState: ISongsState = {
    songs: [],
    songsIsLoaded: false,

    mode: "IDLE",
    titleOfrecordableSong: "",
    recordableSong: [],

    currentSong: [],
    currentSongId: "",

    currentNote: 0,
    currentNoteIndex: 0,

    isPianoVisible: true,
};

export const songsSlice = createSlice({
    name: "songs",
    initialState,
    reducers: {
        onGettingSongs: (state: ISongsState, action: PayloadAction<ISong[]>) => {
            state.songs = [...action.payload];
        },
        addNewSong: (state: ISongsState, action: PayloadAction<ISong>) => {
            state.songs = [...state.songs, action.payload];
        },
        setPlayingSong: (state: ISongsState, action: PayloadAction<ISong>) => {
            state.mode = "PLAYING";
            state.currentSong = action.payload.keyStrokes;
            state.currentSongId = action.payload._id;
        },
        stopSong: (state: ISongsState) => {
            state.currentSong = [];
            state.currentSongId = "";
            state.currentNote = 0;
            state.currentNoteIndex = 0;
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
        playNote: (state: ISongsState, action: PayloadAction<number>) => {
            if (state.mode === "RECORD" || state.mode === "PLAYING") {
                state.currentNoteIndex = action.payload;
                state.currentNote = state.currentSong[action.payload];
            }
            if (state.mode === "RECORD") {
                state.recordableSong = [...state.recordableSong, action.payload];
            }
        },
        playNextNote: (state: ISongsState) => {
            state.currentNoteIndex = state.currentNoteIndex + 1;
            state.currentNote = state.currentSong[state.currentNoteIndex + 1];
        },
        setPianoVisibility: (state: ISongsState, action: PayloadAction<boolean>) => {
            state.isPianoVisible = action.payload;
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
                    if (isLastNoteofSong) {
                        dispatch(stopSong());
                    }
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
    onGettingSongs,
    addNewSong,
    setPianoVisibility,
    setPlayingSong,
    stopSong,
    pauseSong,
    startRecording,
    stopRecording,
    playNote,
    playNextNote,
    recordNote,
} = songsSlice.actions;

export default songsSlice.reducer;
