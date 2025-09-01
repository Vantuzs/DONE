import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as API from '../../API'

const SLICE_NAME = 'taskSlice';

const getTaskSlice = createAsyncThunk(
    `${SLICE_NAME}/getTasks`,
    async (param,thunkAPI) =>{
        try {
            const {data: taskSlice} = await API.getTasks();

            return taskSlice
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

const deleteTaskById = createAsyncThunk(
    `${SLICE_NAME}/deleteTaskById`,
    async(taskId,thunkAPI) =>{
        try {
            await API.deleteTaskById(taskId)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

const createTask = createAsyncThunk(
    `${SLICE_NAME}/createTask`,
    async(taskBody,thunkAPI) =>{
        try {
            await API.createTask(taskBody)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const setTaskIdDone = createAsyncThunk(
    `${SLICE_NAME}/createTaskIdDone`,
    async({taskId,taskBody},thunkAPI) =>{
        try {
            await API.setIsDoneTask(taskId,taskBody)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    tasks: [],
    isLoading: false,
    error: null,
};

const taskSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getTaskSlice.pending, (state,action)=> {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(getTaskSlice.fulfilled, (state,action)=>{
            state.tasks =  action.payload;
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(getTaskSlice.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(deleteTaskById.pending, (state,action)=> {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(deleteTaskById.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(deleteTaskById.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        builder.addCase(createTask.pending, (state,action)=> {
            state.isLoading = true;
            state.error = null;
        })

        builder.addCase(createTask.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(createTask.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

         builder.addCase(setTaskIdDone.pending, (state,action)=> {
            // state.isLoading = true;
            state.error = null;
        })

        builder.addCase(setTaskIdDone.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.error = null;
        })

        builder.addCase(setTaskIdDone.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })
    }
});

const {reducer} = taskSlice;

export {getTaskSlice,deleteTaskById,createTask,setTaskIdDone}

export default reducer;