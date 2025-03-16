import { createSlice, createAsyncThunk, createSelector,createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import axios from "axios";
const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})


const initialState = postsAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count : 0
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POST_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPosts', async (initialPost) => {
    const response = await axios.post(POST_URL, initialPost);
    return response.data;
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    const response = await axios.put(`${POST_URL}/${id}`, initialPost);
    return response.data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    try {
        const { id } = initialPost;
        const response = await axios.delete(`${POST_URL}/${id}`, initialPost);
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
        return error.message;
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.entities[postId]
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
        increaseCount(state) {
            state.count += 1;
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = 'loading'
        }).addCase(fetchPosts.fulfilled, (state, actions) => {
            state.status = 'succeeded';

            //Adding post
            let min = 1;
            const landedPosts = actions.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString(),
                    post.reactions = {
                        thumbsUp: 0,
                        coffee: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0
                    }
                return post;
            },


            )
            postsAdapter.upsertMany(state,landedPosts);
        }
        ).addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }).addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId),
                action.payload.date = new Date().toISOString(),
                action.payload.reactions = {
                    thumbsUp: 0,
                    coffee: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0
                },
                postsAdapter.addOne(state,action.payload)
        }).addCase(updatePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log("Failed to update the post");
                return;
            }
            action.payload.date = new Date().toISOString();

            postsAdapter.upsertOne(state,action.payload)

        }).addCase(deletePost.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log("Failed to delete the post");
                return;
            }

            const { id } = action.payload;
            postsAdapter.removeOne(state,id)
        })
    },

});
 
//get Selector creates these selector and we rename them with aliases using destructuring

export const {
    selectAll : selectAllPosts,
    selectById : selectPostById,
    selectIds : selectPostIds
    //Pass in the selector that returns the post of the slice
} = postsAdapter.getSelectors(state => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

const selectUserId = (_, userId) => userId;

export const selectPostsForUser = createSelector(
    [selectAllPosts, selectUserId],
    (allPosts, userId) => allPosts.filter((post) => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;