import axios from "axios";

export default {

    login: function(userData){
        return axios.post("/login", userData);
    },

    register: function(userData){
        return axios.post("/api/users", userData);
    },

    createPage: function(pageData) {
        return axios.post("/api/pages", pageData);
    },
    
    getPages: function() {
        return axios.get("/api/pages");
    },

    getPage: function(id) {
        return axios.get("/api/pages/"+id);
    },

    getPageByUser: function(id) {
        return axios.get("/api/pages/u/"+id);
    },

    createComment: function(commentData){
        return axios.post("/api/comments/", commentData);
    },

    getCommentByPage: function(id) {
        return axios.get("/api/comments/" + id);
    },

    deleteComment: function(id) {
        return axios.delete("/api/comments/" + id);
    },

    getCommentByUser: function(id) {
        return axios.get("/api/comments/u/" + id);
    }
};