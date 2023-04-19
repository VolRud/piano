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
        songs: { mode },
    } = state;

    const onRecord = () => {
        dispatch(startRecording());
    };

    const onRecordStop = () => {
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
            {mode === "RECORD" && (
                <>
                    <div className="audio-control-btn record-btn" onClick={onRecordStop}>
                        <i className="bi bi-stop-circle"></i>
                    </div>
                    <div>Stop and save</div>
                </>
            )}
            {mode === "IDLE" && (
                <>
                    <div className="audio-control-btn" onClick={onRecord}>
                        <i className="bi bi-record-circle"></i>
                    </div>
                    <span>Record</span>
                </>
            )}
        </div>
    );
};
