const posts = [
  {
    title: 'README',
    target: 'readme',
    date: '20171203',
    cover: '',
    tags: 'vue',
    description: '关于项目的说明'
  },
  // {
  //   title: '',
  //   target: '',
  //   ...
  // }
].sort((x, y) => {
  return x.date - y.date < 0; // 按日期排序，从大到小
});

export default posts;
