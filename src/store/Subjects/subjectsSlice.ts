import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Subject, SubjectsResponse } from './Type/subjectsType'

interface SubjectsState {
    items: Subject[]
    loading: boolean
    error: string | null
    currentPage: number
    hasMore: boolean
}

const initialState: SubjectsState = {
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true
}

export const fetchSubjects = createAsyncThunk<SubjectsResponse, number>(
    'subjects/fetchSubjects',
    async (page: number, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://exam.elevateegy.com/api/v1/subjects', {
                headers: {
                    token: localStorage.getItem("token")?? ""
                },
            });

            const data = response.data

            if (!data.subjects || !Array.isArray(data.subjects)) {
                throw new Error('Invalid response format')
            }

            return data as SubjectsResponse
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data?.message || error.message)
            }
            return rejectWithValue('An unexpected error occurred')
        }
    }
)

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        resetSubjects: (state) => {
            state.items = []
            state.currentPage = 1
            state.hasMore = true
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                if (action.payload?.subjects) {
                    state.items = state.currentPage === 1
                        ? [...action.payload.subjects]
                        : [...state.items, ...action.payload.subjects]
                    state.currentPage = action.payload.metadata.currentPage
                    state.hasMore = state.currentPage < action.payload.metadata.numberOfPages
                }
                state.loading = false
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || 'Failed to fetch subjects'
            })
    }
})

export const { resetSubjects } = subjectsSlice.actions
export default subjectsSlice.reducer
