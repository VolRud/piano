import React, { FunctionComponent } from "react";
import { ISong } from "../../types/Song";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { pauseSong, playSongThunk, selectSongs, stopSong } from "../../store/songs/songs";

type SongItemProps = {
    song: ISong;
};

export const SongItem: FunctionComponent<SongItemProps> = ({ song }) => {
    const state = useAppSelector(selectSongs);
    const {
        songs: { mode, currentSongId },
    } = state;
    const dispatch = useAppDispatch();
    const { _id, title } = song;
    const onPlaySong = () => {
        if (currentSongId !== song._id) {
            dispatch(stopSong());
        }
        dispatch(playSongThunk(song));
    };
    const onPauseSong = () => {
        dispatch(pauseSong());
    };

    return (
        <div className="song-item">
            {mode === "PLAYING" && _id === currentSongId ? (
                <div className="audio-control-btn" onClick={onPauseSong}>
                    <i className="bi bi-pause-circle"></i>
                </div>
            ) : (
                <div onClick={onPlaySong} className="audio-control-btn">
                    <i className="bi bi-play-circle"></i>
                </div>
            )}
            <span className="song-title">{title}</span>
        </div>
    );
};
