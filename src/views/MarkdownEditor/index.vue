<template>
    <div class="markdown-editor">
        <el-alert
            title="某些功能还在努力完善中，当然也有可能已经凉了，因为懒"
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
                    <span v-for="tool in editTools" @click="tool.action" :title="tool.title" :key="tool.name">
                        <i :class="`fa fa-${tool.icon}`"></i>
                    </span>
                </div>
                <div style="box-shadow: 2px 0 5px #ccc;">
                    <textarea v-model="mdContent" id="mdContent">
                    </textarea>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="markdown-editor-tools">
                    <span v-for="(tool, idx) in viewTools" @click="tool.action" :title="tool.title" :key="tool.name" :class="{'pull-left': idx <= 2}">
                        <i :class="`fa fa-${tool.icon}`"></i>
                    </span>
                </div>
                <div style="height: calc(100vh - 60px);padding: 0 15px 40px;overflow-y: scroll;">
                    <div v-html="resolveMdContent" v-highlight></div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import helper from '@/utilities/helper';
    import marked from 'marked';
    import { Message, MessageBox } from 'element-ui'; // 唉，居然不能全局注册组件...
    const storage = localStorage;
    export default {
        data(){
            return {
                mdContent:
`### 支持markdown语法，也支持html

  > hello world

  * 列表
   * li

  ~~删除~~

  **粗体**

  *斜体*

  ![图片](http://wx3.sinaimg.cn/small/006b9bizly1fm2xsaev9cj30hs0hswfx.jpg)

  ...其他的语法自己[百度](http://www.baidu.com)`,
                editTools: [{
                    title: '斜体',
                    icon: 'italic',
                    action: this.setItalic
                },{
                    title: '下划线',
                    icon: 'underline',
                    action: this.setUnderline
                },{
                    title: '粗体',
                    icon: 'bold',
                    action: this.setBold
                },{
                    title: '列表',
                    icon: 'list-ul',
                    action: this.setList
                },{
                    title: '图片',
                    icon: 'image',
                    action: this.setImage
                },{
                    title: '链接',
                    icon: 'link',
                    action: this.setLink
                }],

                viewTools: [{
                  title: '清空',
                  icon: 'trash-o',
                  action: this.clearAll
                },{
                  title: '复制',
                  icon: 'copy',
                  action: this.copyToClip
                },{
                  title: '保存',
                  icon: 'save',
                  action: this.saveAs
                },{
                    title: '导入',
                    icon: 'upload',
                    action: this.upLoadFile
                },{
                    title: '导出.md文件',
                    icon: 'file-text-o',
                    action: this.exportMarkDown
                },{
                  title: '导出.html文件',
                  icon: 'file-code-o',
                  action: this.exportHtml
                }]
            }
        },
        mounted(){
            let mdContent = storage.getItem('mdContent');
            if(mdContent){
                this.mdContent = mdContent;
            };
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            },

            setItalic(){  // 斜体
                this.mdContent = `${this.mdContent}\n\n*斜体*`;
            },
            setUnderline(){
                this.mdContent = `${this.mdContent}\n\n<u>下划线</u>`;
            },
            setBold(){
                this.mdContent = `${this.mdContent}\n\n**粗体**`;
            },
            setList(){
                this.mdContent = `${this.mdContent}\n\n* ul
 * li`;
            },
            setImage(){
                this.mdContent = `${this.mdContent}\n\n![图片说明](图片地址)`;
            },
            setLink(){
                this.mdContent = `${this.mdContent}\n\n[链接](链接地址)`;
            },

            clearAll(){ // 清空
                MessageBox.confirm('将清空编辑器中所有内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.mdContent = '';
                    storage.removeItem('mdContent');
                }).catch(() => {
                    // nothing happened
                });
            },
            copyToClip(){ // 复制
                let content = document.getElementById("mdContent");
                content.select();
                document.execCommand("copy");
                Message.success({
                    message: '已复制',
                    duration: 1000
                });
            },
            saveAs(){ // 缓存
                storage.setItem('mdContent', this.mdContent);
                Message.success({
                    message: '已保存！',
                    duration: 1000
                });
            },
            upLoadFile(){
                Message.info({
                    message: '该功能尚未开发！',
                    duration: 1000
                });
            },
            exportMarkDown(){ // 导出md文件
                MessageBox.prompt('保存为.md文件，命名为', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    helper.download(this.mdContent, value + '.md', 'md');
                }).catch(() => {
                    Message.info({
                        message: '已取消导出Markdown文件！'
                    });
                });
            },
            exportHtml(){ // 导出html文件
                MessageBox.prompt('保存为.html文件，命名为', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    helper.download(marked(this.mdContent), value + '.html', 'html');
                }).catch(() => {
                    Message.info({
                      message: '已取消导出html文件！'
                    });
                });
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
