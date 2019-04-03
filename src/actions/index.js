import uuid from 'uuid/v4';

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const UPDATE_POST = "update_post";
export const DELETE_POST = "delete_post";

    const URL = 'posts';

export function fetchPosts() {
    let request = localStorage.getItem(URL) ? JSON.parse(localStorage.getItem(URL)) : [];

    return {
        type: FETCH_POSTS,
        payload: {data: request},
    };
}

export function fetchPost(id) {
    const request = localStorage.getItem(URL) ? JSON.parse(localStorage.getItem(URL)) : [];
    const post = request.filter(post => post.id === id);

    return {
        type: FETCH_POST,
        payload: {data: post[0]},
    };
}

export function updatePost(post) {
    const request = localStorage.getItem(URL) ? JSON.parse(localStorage.getItem(URL)) : [];
    const list = request.filter(data => post.id !== data.id);
    list.push(post);
    localStorage.setItem(URL, JSON.stringify(list));

    return {
        type: UPDATE_POST,
        payload: {data: post},
    };
}

export function createPost(post) {
    post.id = uuid();
    const posts = localStorage.getItem(URL) ? JSON.parse(localStorage.getItem(URL)) : [];
    posts.push(post);
    try {
        localStorage.setItem(URL, JSON.stringify(posts));
    } catch (error) {
        // the storage has a limit of 5mb
        console.log('your storage exceeded the limit')
        return {
            type: CREATE_POST,
            payload: post,
            error: 'your storage exceeded the limit'
        }
    }

    return {
        type: CREATE_POST,
        payload: post
    };
}

export function deletePost(id) {
    const posts = localStorage.getItem(URL) ? JSON.parse(localStorage.getItem(URL)) : [];
    const newList = posts.filter(post => post.id !== id);
    localStorage.setItem(URL, JSON.stringify(newList));

    return {
        type: DELETE_POST,
        payload: id,
    };
}
