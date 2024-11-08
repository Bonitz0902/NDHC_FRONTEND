import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "../components/sampleSlice";


export const store = configureStore({
    reducer: {
        "sampleSlice": sampleSlice,
    }
});

