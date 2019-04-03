import uuid from 'uuid/v4';

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const UPDATE_POST = "update_post";
export const DELETE_POST = "delete_post";

// cons "httpsherokuapp.com/api";
// const= "?key=tiagodws";

export function fetchPosts() {
    const url = `posts`;
    let request = localStorage.getItem(url) ? JSON.parse(localStorage.getItem(url)) : [];

    return {
        type: FETCH_POSTS,
        payload: {data: request},
    };
}

export function fetchPost(id) {
    const url = `posts`;
    const request = localStorage.getItem(url) ? JSON.parse(localStorage.getItem(url)) : [];
    const post = request.filter(post => post.id === id);

    return {
        type: FETCH_POST,
        payload: {data: post[0]},
    };
}

export function updatePost(post) {
    const url = `posts`;
    const request = localStorage.getItem(url) ? JSON.parse(localStorage.getItem(url)) : [];
    const list = request.filter(data => post.id !== data.id);
    list.push(post);
    localStorage.setItem(url, JSON.stringify(list));

    return {
        type: UPDATE_POST,
        payload: {data: post},
    };
}

export function createPost(post) {
    post.id = uuid();
    const url = `posts`;
    const posts = localStorage.getItem(url) ? JSON.parse(localStorage.getItem(url)) : [];
    posts.push(post);
    localStorage.setItem(url, JSON.stringify(posts));

    return {
        type: CREATE_POST,
        payload: post
    };
}

export function deletePost(id) {
    const url = `posts`;
    const posts = localStorage.getItem(url) ? JSON.parse(localStorage.getItem(url)) : [];
    const newList = posts.filter(post => post.id !== id);
    localStorage.setItem(url, JSON.stringify(newList));

    return {
        type: DELETE_POST,
        payload: id,
    };
}
