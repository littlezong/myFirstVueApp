<template>
    <div class="blog" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div>
            <h2 class="post-title" v-text="title"></h2>
            <div>
                <time>
                    <i class="el-icon-date"></i>
                    {{formatTimeStr(date)}}
                </time>
                <span class="divide-line"></span>
                <span class="post-icon-cell">
                    <i class="el-icon-view"></i>
                    {{views}}
                </span>
            </div>
        </div>
        <div class="post-content-md" v-html="content" v-highlight></div>
        <div style="margin: 20px 0;text-align: left;">
            <el-tag type="info" v-for="(tag, i) in tags" :key="i" style="margin-right: 5px;">{{tag}}</el-tag>
        </div>
        <div class="post-like">
            <i class="fa fa-heart" @click="handleLike"></i> {{like}} people likes
        </div>
        <div style="margin-top: 20px;text-align: right;">
            <Btn size="small" @click="goBack">
              返回 <i class="el-icon-arrow-right"></i>
            </Btn>
        </div>

    </div>
</template>

<script>
    import LC from '@/utilities/LC';
    import marked from 'marked';
    import Formatter from '@/utilities/formatter';
    import Btn from '@/components/Btn';
    export default{
        name: 'Post',
        data() {
            return {
                id: null,

                title: '',
                content: '',
                date: '',
                views: '--',
                like: '--',
                tags: [],

                loading: true
            }
        },
        components: {
            Btn
        },
        mounted(){
            let params = this.$route.params;
            this.getMdFiles(params);
        },
        methods: {
            formatTimeStr: Formatter.formatTimeStr,
            goBack(){
                this.$router.go(-1);
            },
            getMdFiles(params){
                let url = 'static/posts/' + params.target + '.md';
                this.$axios.get(url).then(response => {
                    this.loading = false;
                    if(response.status === 200){
                        this.content = marked(response.data);
                        this.readCount(params.target);
                    }else{
                        this.content = '无数据';
                    }
                }).catch(error => {
                    this.loading = false;
                    this.content = error;
                    console.log(error);
                });
                this.title = params.title;
                this.date = params.date;
                this.tags = params.tags ? params.tags.split('|') : [];
            },
            readCount(target){
                let className = 'ReadCount';
                let queryItem = {key: 'target', value: target};
                LC.select.contains(className, queryItem, data => {
                    if(!data.ok){
                        LC.save(className, [queryItem, {
                            key: 'count',
                            value: 1
                        }, {
                            key: 'like',
                            value: 0
                        }], id => {
                            this.id = id;
                            this.views = 1;
                            this.like = 0;
                        });
                    }else{
                        let attributes = data.details;
                        this.id = attributes[0].id;
                        LC.count(className, attributes[0].id, {
                            key: 'count',
                            value: attributes[0].count
                        }, count => {
                            this.views = count;
                            this.like = attributes[0].like;
                        });
                    };
                });
            },
            handleLike(){
                let like = this.like;
                if(isNaN(+like)) return;
                let id = this.id;
                let className = 'ReadCount';
                LC.count(className, id, {
                    key: 'like',
                    value: like
                }, count => {
                    this.like = count;
                });
            }
        }
    }
</script>

<style>
  .blog{
      width: 72%;
      min-height: calc(100vh - 160px);
      margin: 0 auto;
  }
  .post-title{
      margin-bottom: 5px;
  }
</style>
