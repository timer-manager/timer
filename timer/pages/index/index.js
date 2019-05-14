//index.js
Page({
  data: {
    list: [{
      name: 'X-Traning',
      uid: 'xTraning'
    }]
  },
  onLoad: function () {
  },
  /**
   * 进入详情页
   */
  goToDetail (e) {
    wx.navigateTo({url: '/pages/detail/detail?type=' + e.currentTarget.dataset.type})
  }
});
