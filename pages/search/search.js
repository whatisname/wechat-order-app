// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_text: null,
    cafeteria_array: ['全部餐厅  ', '后稷一一楼', '后稷一二楼', '后稷二', '桃李餐厅', '昼夜餐厅', '后稷三'],
    index: 0,
    search_list: [0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      index:options.index
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //表单提交
  formSubmit: function (e) {
    console.log('所选餐厅为：' + this.data.index + '，搜索内容为：' + this.data.search_text)
    var that = this;
    wx.request({
      url: 'http://192.168.1.29:8080/os/search/all',
      data: {
        page: 0,
        size: 5,
        content: that.data.search_text,
        type: 'all'
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log('success')
        if (res.data != undefined && res.data.code == 1) {
          console.log(res.data)
          that.setData({
            search_list: res.data.data
          })
        } else {
          console.error('信息接收失败')
        }
      },
      fail: function () {
        console.error('信息接收失败')
      }
    });
  },
  //选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }, 
  //检查并更新搜索列表值search_text
  setSearchText: function (e) {
    console.log('输入搜索结果为：'+e.detail.value)
    // TODO:检查搜索内容
    this.setData({
      search_text: e.detail.value
    })
  }
})