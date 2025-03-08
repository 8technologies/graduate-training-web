"use client";

import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading persisted state...</div>} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
