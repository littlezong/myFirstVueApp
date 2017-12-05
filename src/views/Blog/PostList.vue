<template>
    <div class="post-list">
        <transition-group
          tag="ul"
          enter-active-class="animated fadeIn">
            <li v-for="(post, index) in postsList" :key="index" v-on:click="clickToRead(post)">
                <h3>{{post.title}}</h3>
                <p>
                    <time>
                        <i class="el-icon-date"></i>
                        {{formatTimeStr(post.date)}}
                    </time>
                    <span class="divide-line"></span>
                    <span class="post-icon-cell">
                        <i class="el-icon-view"></i>
                        {{post.count}}
                    </span>
                </p>
                <div class="post-content-desc">
                    <img class="post-img-desc" v-if="post.cover" :src="require('@/assets/' + post.cover)" />
                    <p class="post-text-desc">
                        {{post.description}}
                    </p>
                </div>
            </li>
        </transition-group>
    </div>
</template>

<script>
    import LC from '@/utilities/LC';
    import posts from './posts';
    import Formatter from '../../utilities/formatter';
    export default {
        name: 'PostList',
        created(){
            this.initViews();
        },
        data(){
            return {
                postsList: null
            }
        },
        methods: {
            formatTimeStr: Formatter.formatTimeStr,
            initViews: function(){
                let className = 'ReadCount';
                let queryItem = {key: 'count', value: 1};
                LC.select.greaterThanOrEqualTo(className, queryItem, data => {
                    let postsList = posts.concat();
                    if(data.ok){
                        for(let post of postsList){
                            for(let detail of data.details){
                                if(post.target === detail.target){
                                    post.count = detail.count;
                                    break;
                                }
                            }
                            if(!post.count){
                                post.count = 0;
                            }
                        }
                    }else{
                        for(let post of postsList){
                            post.count = '--';
                        }
                    };
                    this.postsList = postsList;
                });
            },
            clickToRead: function(post){
                this.$router.push({
                    path: 'post',
                    name: 'Post',
                    params: {...post}
//                    query: {
//                        title: post.title,
//                        target: post.target,
//                        date: post.date,
//                        tags: post.tags
//                    }
                });
            }
        }
    }
</script>
