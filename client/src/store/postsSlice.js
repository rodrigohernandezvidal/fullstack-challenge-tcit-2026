import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts';

// Async Thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(API_URL, initialPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    // TCIT pide retornar el post eliminado. Extraemos el id para el reducer.
    return response.data.id || id;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        filterText: '', // Estado local para el filtro
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {
        setFilterText: (state, action) => {
            state.filterText = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Add Post
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            // Delete Post
            .addCase(deletePost.fulfilled, (state, action) => {
                state.items = state.items.filter(post => post.id !== action.payload);
            });
    }
});

// Selectors
export const selectAllPosts = (state) => state.posts.items;
export const selectFilterText = (state) => state.posts.filterText;
// Memoized-like selector logic (simple version)
export const selectFilteredPosts = (state) => {
    const allPosts = state.posts.items;
    const filter = state.posts.filterText.toLowerCase();

    if (!filter) return allPosts;

    return allPosts.filter(post =>
        post.name.toLowerCase().includes(filter)
    );
};

export const { setFilterText } = postsSlice.actions;

export default postsSlice.reducer;
