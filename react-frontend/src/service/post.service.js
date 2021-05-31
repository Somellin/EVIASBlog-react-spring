import axios from "axios";

const BASE_URL = "http://localhost:8080/api/test/post";

class PostService {

    getPosts() {
        return axios.get(BASE_URL + '/all_posts')
    }

    getPostsByCurrentUser(id) {
        return axios.get(BASE_URL + '/all_posts/' + id)
    }

    createPost(id, post) {
        return axios.post(BASE_URL + '/all_posts/' + id, post)
    }

    deletePost(postId) {
        return axios.delete(BASE_URL + '/post/' + postId)
    }

    getPostById(postId) {
        return axios.get(BASE_URL + '/post/' + postId)
    }

    updatePost(postId, uPost) {
        return axios.put(BASE_URL + '/post/' + postId, uPost)
    }

    //comments-----------------------------------------

    createComment(uid,pid,comment){
        return axios.post(BASE_URL + "/comment/" + uid + "/" + pid, comment)
    }

    getCommentsByPost(id){
        return axios.get(BASE_URL + "/comments/" + id)
    }
}

export default new PostService()