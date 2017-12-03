import Vue from 'vue';
import Router from 'vue-router';

import Blog from '@/views/Blog';
import PostList from '@/views/Blog/PostList';
import Post from '@/views/Blog/Post';
import About from '@/views/About';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Blog',
            component: Blog,
            children: [{
                path: '',
                name: 'PostList',
                component: PostList
            },{
                path: 'post/:target',
                name: 'Post',
                component: Post
            },{
                path: '/about',
                name: 'About',
                component: About
            }]
        }
    ]
})
