import React, { useState, FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewSong, selectSongs } from "../../store/songs/songs";
import { useSongsMutation } from "../../useRequest";
import { ADD_SONG } from "../../graphql";

type SaveSongModalProps = {
    show: boolean;
    closeModal: () => void;
};

export const SaveSongModal: FunctionComponent<SaveSongModalProps> = ({ show, closeModal }) => {
    const state = useAppSelector(selectSongs);
    const dispatch = useAppDispatch();
    const [songTitle, setSongTitle] = useState("");
    const [addSong] = useSongsMutation(ADD_SONG);

    const {
        songs: { recordableSong },
    } = state;

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
            closeModal();
        }
    };

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(e.currentTarget.value);
    };
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Saving a new song</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title of new song</Form.Label>
                        <Form.Control
                            onChange={changeTitle}
                            type="text"
                            placeholder="Enter song title"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={saveNewSong}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
