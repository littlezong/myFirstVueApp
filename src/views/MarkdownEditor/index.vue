<template>
    <div class="markdown-editor">
        <el-alert
            title="该功能还在努力完善中，当然也有可能已经凉了，因为懒"
            type="info"
            center
            show-icon>
        </el-alert>

        <el-row>
            <el-col :span="12">
                <div class="markdown-editor-tools">
                    <span style="float: left;display: inline-block;width: 40px;height: 60px;margin-left: -20px;text-align: center;" @click="goBack">
                        <i class="fa fa-chevron-left"></i>
                    </span>
                    <span v-for="tool in editTools" :key="tool.name" :title="tool.title" @click="tool.action">
                        <i :class="`fa fa-${tool.icon}`"></i>
                    </span>
                </div>
                <div style="box-shadow: 2px 0 5px #ccc;">
                    <textarea v-model="mdContent">
                    </textarea>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="markdown-editor-tools">
                    <span v-for="tool in viewTools" :key="tool.name" :title="tool.title" @click="tool.action">
                        <i :class="`fa fa-${tool.icon}`"></i>
                    </span>
                </div>
                <div style="height: calc(100vh - 60px);padding: 0 15px 10px 15px;overflow-y: scroll;">
                    <div v-html="resolveMdContent" v-highlight></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import marked from 'marked';
    export default {
        data(){
            return {
                mdContent:
`### markdown语法(该md样式不适于其他markdown解析器，不同解析器会有不同的样式表现)

  # h1

  ##### h5

  > 列表

  **粗体**

  *斜体*

  ...其他的语法自己[百度](http://www.baidu.com)
`,
                editTools: [{
                    title: '清空',
                    icon: 'trash-o',
                    action: this.saveAs
                },{
                    title: '复制',
                    icon: 'copy',
                    action: this.saveAs
                },{
                    title: '保存',
                    icon: 'save',
                    action: this.saveAs
                }],
                viewTools: [{
                    title: '复制',
                    icon: 'copy',
                    action: this.saveAs
                },{
                    title: '导出md文件',
                    icon: 'clipboard',
                    action: this.saveAs
                }]
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },
            saveAs(){

            }
        },
        computed: {
            resolveMdContent(){
                return marked(this.mdContent);
            }
        }
    }
</script>

<style>

</style>
