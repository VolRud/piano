import React, { FunctionComponent, useEffect } from "react";
import { GET_SONGS } from "../../graphql";
import { useSongQuery } from "../../useRequest";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SongItem } from "./SongItem";
import { addLoadedSongsToStore, selectSongs } from "../../store/songs/songs";

export const SongList: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(selectSongs);
    const {
        songs: { songs },
    } = state;
    const { loading, error, data } = useSongQuery(GET_SONGS);
    useEffect(() => {
        if (!error && !loading && data?.songs) {
            dispatch(addLoadedSongsToStore(data.songs));
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
        </div>
    );
};
