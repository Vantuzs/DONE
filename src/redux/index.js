import {configureStore} from "@reduxjs/toolkit"
import taskSliceReducer from "./slices/taskSlice"

const store = configureStore({
    reducer: {
        taskSlice: taskSliceReducer
    }
})

export default store;