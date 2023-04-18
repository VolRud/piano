import React from "react";
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers, NoteFunction } from "react-piano";
import "react-piano/dist/styles.css";
import { useDispatch } from "react-redux";
import { recordNote, selectSongs } from "../../store/songs/songs";
import { useAppSelector } from "../../store/hooks";

const noteRange = {
    first: MidiNumbers.fromNote("c3"),
    last: MidiNumbers.fromNote("f4"),
};

const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

function Piano({ onPlayNote, onStopNote }: { onPlayNote: NoteFunction; onStopNote: NoteFunction }) {
    const dispatch = useDispatch();
    const state = useAppSelector(selectSongs);
    const {
        songs: { currentNote, mode, isPianoVisible },
    } = state;

    const onKeyStroke = (midiNumber: number) => {
        onPlayNote(midiNumber);
    };

    const onKeyOut = (midiNumber: number) => {
        onStopNote(midiNumber);
        if (mode === "RECORD") {
            dispatch(recordNote(midiNumber));
        }
    };

    return isPianoVisible ? (
        <div>
            <ReactPiano
                activeNotes={[currentNote]}
                noteRange={noteRange}
                playNote={onKeyStroke}
                stopNote={onKeyOut}
                width={1000}
                keyboardShortcuts={keyboardShortcuts}
            />
        </div>
    ) : null;
}

export default Piano;
