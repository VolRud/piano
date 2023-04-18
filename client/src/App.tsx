import React from "react";
import "./App.css";
import Instrument from "./instrument";
import Piano from "./components/Piano/Piano";

import { SongList } from "./components/SongList/SongList";
import { AudioController } from "./components/AudioController/AudioController";

function App({ instrument }: { instrument: Instrument }) {
    return (
        <div className="App">
            <Piano onPlayNote={instrument.playNote} onStopNote={instrument.stopNote} />
            <AudioController />
            <SongList />
        </div>
    );
}

export default App;
