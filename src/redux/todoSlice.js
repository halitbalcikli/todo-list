import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [],
}

export const todosSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodoList: (state, action) => {
            return
        }

    },
})

export default todosSlice.reducer