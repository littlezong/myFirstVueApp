const CONFIG = {
    name: 'Gnoz',
    nickName: '子非咸鱼',
    description: '子非咸鱼，安知鱼之咸',
    // avatar: '', 默认avatar.jpg 更改头像只需命名avatar.jpg替换图片即可
    copyRight: 'Gnoz',
    communities: [{
        name: 'github',
        icon: 'github',
        url: 'https://github.com/littlezong',
        show: true,
    }, {
        name: '微博',
        icon: 'weibo',
        url: 'https://weibo.com/u/5661525075/home?wvr=5',
        show: true
    }, {
        name: 'QQ',
        icon: 'qq',
        QR: 'qrcode_qq_group.jpg',
        show: true
    }, {
        name: '微信',
        icon: 'weixin',
        QR: 'mmqrcode_weixin.png',
        show: true
    }],
    leanCloud: {
        // https://leancloud.cn/dashboard/applist.html#/apps
        // 配置appId和appKey后才可统计文章阅读次数和点赞数
        appId: '',
        appKey: ''
    }
};

export default CONFIG;
