export default {
    /**
     * 格式时间字符串
     * eg.20170520131400,YYYY-MM-DD hh:mm:ss => 2017-05-20 13:14:00
     *    201705201314 => 2017年05月20日 13:14
     * @param time
     * @param format
     */
    formatTimeStr: (time, format) => {
      
        if (time === '') return '--';
        
        time = time.toString();
        let idx = 0;
        let rgx = /[Y,M,D,h,m,s]+/;
        let formatTime = '';
        if (format) {
            let formatArr = format.split('');
            for (let i = 0; i < formatArr.length; i++) {
                if (rgx.test(formatArr[i])) {
                    formatTime += time[idx];
                    idx++;
                } else {
                    formatTime += formatArr[i];
                };
            };
        } else {
            let year = time.substr(0, 4),
                month = time.substr(4, 2),
                day = time.substr(6, 2),
                hour = time.substr(8, 2) || '',
                min = time.substr(10, 2) || '',
                second = time.substr(12, 2) || '';
            
            formatTime = year + '年' + month + '月' + day + '日';
            
            if (hour !== '') {
                formatTime += ' ' + hour;
            };
            if (min !== '') {
                formatTime += ':' + min;
            };
            if (second !== '') {
                formatTime += ':' + second;
            };
        }
        
        return formatTime;
    }
}
