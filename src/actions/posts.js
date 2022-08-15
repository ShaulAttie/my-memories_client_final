import { START_LOADING, END_LOADING, COMMENT, FETCH_POST, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_ALL, UPDATE, CREATE, DELETE, LIKE } from "../constanst/constantsType"
import * as api from "../API"

// Action Creators --> functions that return action

export const getPost = (id) => async (dispatch) => {
    // because of the async we use redux-thunk as "async(dispatch) =>"
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id)
        //NAO MEXE AQUI
        dispatch({ type: FETCH_POST, payload: { post: data } })

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPosts = (params) => async (dispatch) => {
    // because of the async we use redux-thunk as "async(dispatch) =>"
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPosts(params)
        // NAO MEXE AQUI
        dispatch({ type: FETCH_ALL, payload: { data } })

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsByCreator(name);

        dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    // console.log(searchQuery);
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
        // console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } })

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post)
        // NAO MEXE AQUI
        dispatch({ type: CREATE, payload: data })

        navigate(`/posts/${data._id}`)

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)

        dispatch({ type: UPDATE, payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    // console.log(id);
    try {
        const { data } = await api.likePost(id, user?.token)

        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)

        dispatch({ type: DELETE, payload: id })


    } catch (error) {
        console.log(error)
    }
}