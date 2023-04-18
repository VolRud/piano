import React, { FunctionComponent, useEffect } from "react";
import { GET_SONGS } from "../../graphql";
import { useSongQuery } from "../../useRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SongItem } from "./SongItem";
import { onGettingSongs, selectSongs } from "../../store/songs/songs";

type SongListProps = {
    children?: JSX.Element;
};

export const SongList: FunctionComponent<SongListProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(selectSongs);
    const {
        songs: { songs },
    } = state;
    const { loading, error, data } = useSongQuery(GET_SONGS);
    useEffect(() => {
        if (!error && !loading && data?.songs) {
            dispatch(onGettingSongs(data.songs));
        }
    }, [data]);
    return (
        <div>
            {error && <div>Something went wrong ...</div>}
            {loading && <div>Loading ...</div>}
            {!loading &&
                songs.map((song) => {
                    return <SongItem song={song} key={song._id} />;
                })}
            {children}
        </div>
    );
};
