import React, { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addNewSong,
    selectSongs,
    setPianoVisibility,
    startRecording,
    stopRecording,
} from "../../store/songs/songs";
import { useSongsMutation } from "../../useRequest";
import { ADD_SONG } from "../../graphql";

export const AudioController: FunctionComponent = () => {
    const [inputVisibility, setInputVisibility] = useState(false);
    const [songTitle, setSongTitle] = useState("");
    const [addSong] = useSongsMutation(ADD_SONG);

    const dispatch = useAppDispatch();
    const state = useAppSelector(selectSongs);
    const {
        songs: { mode, recordableSong },
    } = state;

    const onRecord = () => {
        dispatch(startRecording());
    };

    const onRecordStop = () => {
        dispatch(stopRecording());
        setInputVisibility(true);
        dispatch(setPianoVisibility(false));
    };
    const saveNewSong = () => {
        if (recordableSong.length === 0) {
            alert("This song is empty");
        } else {
            addSong({
                variables: {
                    title: songTitle,
                    keyStrokes: recordableSong,
                },
            }).then(({ data }) => {
                const newSong = data?.addSong;
                if (newSong) {
                    const fakeId = Date();
                    // Server returns new song objects without ID.
                    // Fix the server
                    dispatch(addNewSong({ ...newSong, _id: fakeId }));
                }
            });
        }
        setInputVisibility(false);
        dispatch(setPianoVisibility(true));
    };
    const changeSongTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setSongTitle(e.currentTarget.value);
    };
    return (
        <div className="audio-controller">
            {mode === "RECORD" && !inputVisibility && (
                <div className="audio-control-btn record-btn" onClick={onRecordStop}>
                    <i className="bi bi-stop-circle"></i>
                </div>
            )}
            {!inputVisibility && mode === "IDLE" && (
                <div className="audio-control-btn" onClick={onRecord}>
                    <i className="bi bi-record-circle"></i>
                </div>
            )}
            {inputVisibility && (
                <div>
                    <input type="text" onChange={changeSongTitle} />
                    {songTitle.length !== 0 && <button onClick={saveNewSong}>SAVE SONG</button>}
                </div>
            )}
        </div>
    );
};
