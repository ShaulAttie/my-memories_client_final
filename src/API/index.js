import axios from "axios"

// const API = axios.create({ baseURL: `http://localhost:5000` })
const API = axios.create({ baseURL: `https://curious-torrone-5206bd.netlify.app/` })
// https://mymemoriesclientfinal.herokuapp.com/
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile"))
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`

    return req
})

const url = `/api/posts`

export const fetchPost = (id) => API.get(`${url}/${id}`)
export const fetchPosts = (params) => API.get(`${url}`,{params})
export const fetchPostsByCreator = (name) => API.get(`/posts/creator?name=${name}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post(url, newPost)
export const likePost = (id) => API.patch(`${url}/${id}/likePost`)
export const comment = (value, id) => API.post(`${url}/${id}/commentPost`, {value})
export const updatePost = (id, updatedPost) => API.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`${url}/${id}`)

export const signIn = (formData) => API.post('/api/users/signin', formData)
export const signUp = (formData) => API.post('/api/users/signup', formData)