import AV from 'leancloud-storage';

const LC = {
  /**
   * 构建保存对象
   * @param className
   * @param settings
   * @param callback
   */
    save: function(className, settings, callback){
        // 声明类型
        const Temp = AV.Object.extend(className);
        // 新建对象
        const temp = new Temp();
        // 设置
        if(settings){
            settings.map(setting => {
                temp.set(setting.key, setting.value);
            });
        };
        temp.save().then(response => {
            console.log(response);
            callback && callback(response.id);
        }, error => {
            console.log(error);
        });
    },
  
  /**
   * 查询
   * @param className
   * @param id
   * @param callback
   */
    select: {
        contains: function(className, queryItem, callback){
            this.core(className, queryItem, callback, 'contains');
        },
        greaterThanOrEqualTo: function(className, queryItem, callback){
            this.core(className, queryItem, callback, 'greaterThanOrEqualTo');
        },
        core: function(className, queryItem, callback, type){
            const query = new AV.Query(className);
            query[type](queryItem.key, queryItem.value);
            query.limit(100);
            query.find().then( response => {
                let data = {};
                if(response.length > 0){
                    data = {
                        ok: true,
                        details: response.map(item => {
                            return {
                                id: item.id,
                                ...item.attributes
                            }
                        })
                    };
                }else{
                    data = {
                        ok: false
                    }
                };
                callback && callback(data);
            }, error => {
                console.log(error);
                callback && callback({
                    ok: false,
                    error
                });
            });
        }
    },
  
  /**
   * 更新
   * @param className
   * @param id
   * @param settings
   */
    update: function(className, id, settings){
        const target = AV.Object.createWithoutData(className, id);
        settings.map(setting => {
            target.set(setting.key, setting.value);
        });
        target.save();
    },
  
  /**
   * 计数
   * @param className
   * @param id
   */
  count: function(className, id, setting, callback){
        var count = AV.Object.createWithoutData(className, id);
        count.set(setting.key, setting.value);
        count.save().then( c => {
            c.increment(setting.key, 1);
            c.fetchWhenSave(true);
            return c.save();
        }).then( latestData => {
            // 使用了 fetchWhenSave 选项，save 成功之后即可得到最新的值
            callback && callback(latestData.attributes[setting.key]);
        }, error => {
            console.log(error);
        });
  }
};

export default LC;
