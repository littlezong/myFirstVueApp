import Vue from 'vue';
import Router from 'vue-router';
// import DeskTop from '@/views/DeskTop';
// import Music from '@/views/Music';
import Blog from '@/views/Blog';
import PostList from '@/views/Blog/PostList';
import Post from '@/views/Blog/Post';
import MarkdownEditor from '@/views/MarkdownEditor';
import About from '@/views/About';
import Share from '@/views/Share';

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
                path: 'post/:title/:target/:date/:tags',
                name: 'Post',
                component: Post
            },{
                path: '/share',
                name: 'Share',
                component: Share
            },{
                path: '/about',
                name: 'About',
                component: About
            }]
        },
        {
            path: '/markdown-editor',
            name: 'MarkdownEditor',
            component: MarkdownEditor
        }
        // {
        //     path: '/',
        //     name: 'DeskTop',
        //     component: DeskTop
        // },{
        //     path: '/music',
        //     name: 'Music',
        //     component: Music
        // }, {
        //     path: '/blog',
        //     name: 'Blog',
        //     component: Blog,
        //     children: [{
        //         path: '',
        //         name: 'PostList',
        //         component: PostList
        //     },{
        //         path: 'post/:target',
        //         name: 'Post',
        //         component: Post
        //     }]
        // }
    ]
})
