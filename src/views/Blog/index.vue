<template>
    <el-container>
        <el-header>
            <span class="animated slideInRight">{{name}}</span>
            <ul style="display: inline-block;float: right;">
                <li v-for="nav in navList" :key="nav.icon">
                    <router-link :to="nav.path">
                        <i :class="`fa fa-${nav.icon}`"></i>
                        {{nav.name}}
                    </router-link>
                </li>
            </ul>
        </el-header>
        <el-container>
            <el-aside width="320px">
                <div style="padding: 10px">
                    <el-card class="box-card">
                        <img class="avatar" :src="require('@/assets/avatar.jpg')" alt="avatar" />
                        <div class="sidebar-card-details">
                            <span>
                                <i class="fa fa-id-card-o" style="color: #666"></i>
                                {{nickName}}
                            </span>
                            <p class="ellipsis-2">{{description}}</p>
                            <ul style="margin-top: 5px;">
                                <li v-for="community in communities" v-if="community.show" :key="community.name">
                                    <a v-if="community.url" :href="community.url" target="_blank" :class="`c-icon-${community.icon}`">
                                        <i :class="`fa fa-${community.icon}`"></i>
                                    </a>
                                    <el-popover
                                      v-else
                                      placement="right"
                                      trigger="click">
                                        <img :src="require('@/assets/' + community.QR)" alt="" style="width: 180px;" />
                                        <a href="javascript:void(0)" slot="reference" style="font-size: 12px;" :class="`c-icon-${community.icon}`">
                                            <i :class="`fa fa-${community.icon}`"></i>
                                        </a>
                                    </el-popover>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </div>
                <ul class="sidebar-menu-list">
                    <li v-for="(menu, i) in menuList" :key="i">
                        <router-link :to="menu.path">
                            <i :class="`fa fa-${menu.icon}`"></i>
                            {{menu.name}}
                            <i class="fa fa-hand-o-left active-label"></i>
                        </router-link>
                    </li>
                </ul>
            </el-aside>
            <el-container>
                <transition name="el-zoom-in-center">
                    <el-main>
                        <router-view></router-view>
                        <el-footer>
                            {{copyRight}}
                        </el-footer>
                    </el-main>
                </transition>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import CONFIG from '@/config';
    export default {
        data(){
            return {
                name: CONFIG.name,
                nickName: CONFIG.nickName,
                description: CONFIG.description,
                copyRight: '© 2017 ' + CONFIG.copyRight,
                communities: CONFIG.communities,

                navList: [
                    {
                        name: 'Markdown在线编辑器',
                        icon: 'pencil-square-o',
                        path: '/markdown'
                    }
                ],
                menuList: CONFIG.menuList
            }
        }
    }
</script>

<style>

</style>
