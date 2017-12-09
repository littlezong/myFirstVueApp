export default{
  /**
   * 下载
   * @param content 内容
   * @param filename 文件名
   */
    download(content, filename, type){
        let mapType = {
            'md': 'text/markdown; charset=UTF-8',
            'html': 'text/html; charset=UTF-8'
        };
        let options = type ? {type: mapType[type]} : null;
        let blob = new Blob([content], options);
        let downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.style.display = 'none';
        downloadLink.href = URL.createObjectURL(blob);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    },
    // download(content, filename, callback){
    //     var reader = new FileReader();
    //     var blob = new Blob([this.mdContent], {type: 'text/markdown; charset=UTF-8'});
    //     reader.addEventListener('loadend', () => {
    //         console.log(1, reader.result);
    //         callback && callback(reader.result);
    //     });
    //     reader.readAsDataURL(blob);
    // }
}
