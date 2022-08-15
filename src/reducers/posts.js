import { START_LOADING, END_LOADING, COMMENT, FETCH_POST, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_ALL, UPDATE, CREATE, DELETE, LIKE } from "../constanst/constantsType"
// import Posts from "../components/Posts/Posts";

const reducer = (state = { posts: [] }, action) => { // usually is just state but is just a variable
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return { ...state, posts: action.payload.data };

        case FETCH_POST:
            return { ...state, post: action.payload.post }

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
            
        case FETCH_BY_CREATOR:
            return { ...state, posts: action.payload.data };

        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };

        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === +action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        default:
            return state;
    };;
}

export default reducer