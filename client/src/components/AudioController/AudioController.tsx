import React, { FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    selectSongs,
    setPianoAccess,
    startRecording,
    stopRecording,
} from "../../store/songs/songs";
import { SaveSongModal } from "./SaveSongModal";

export const AudioController: FunctionComponent = () => {
    const [isModalShown, setModalShown] = useState(false);

    const dispatch = useAppDispatch();
    const state = useAppSelector(selectSongs);
    const {
        songs: { mode, recordableSong },
    } = state;

    const onRecord = () => {
        if (mode === "PLAYING") {
            return;
        }
        dispatch(startRecording());
    };

    const onRecordStop = () => {
        if (recordableSong.length === 0) {
            return alert("Song is empty");
        }
        dispatch(stopRecording());
        dispatch(setPianoAccess(false));
        setModalShown(true);
    };
    const hamdleCloseModal = () => {
        setModalShown(false);
        dispatch(setPianoAccess(true));
    };
    return (
        <div className="audio-controller">
            <SaveSongModal show={isModalShown} closeModal={hamdleCloseModal} />
            {mode === "RECORD" ? (
                <>
                    <div className="audio-control-btn record-btn" onClick={onRecordStop}>
                        <i className="bi bi-stop-circle"></i>
                    </div>
                    <div>Stop and save</div>
                </>
            ) : (
                <>
                    <div className="audio-control-btn" onClick={onRecord}>
                        <i className="bi bi-record-circle"></i>
                    </div>
                    <div>Record</div>
                </>
            )}
        </div>
    );
};
