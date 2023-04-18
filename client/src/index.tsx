import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

import "./index.css";
import App from "./App";
import Instrument from "./instrument";

import { store } from "./store/store";
import { Provider } from "react-redux";

const piano = new Instrument();

const apolloClient = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root")!);

root.render(
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <App instrument={piano} />
        </Provider>
    </ApolloProvider>
);
