// pages/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_detail: { "name": "黄焖鸡店铺", "status": true, "address": "后稷餐厅1号窗口"},
    id: 0,
    fid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined) {
      this.data.id = options.id
    } else if (options.fid != undefined) {
      this.data.fid = options.fid
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得cart组件
    this.cart = this.selectComponent("#cart");

    //发起请求
    var that = this;

    if (this.data.id != 0) {
      wx.request({
        url: 'http://192.168.1.29:8080/os/booth/detail',
        data: {
          id: this.data.id
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          if (res.data != undefined && res.data.code == 1) {
            var store_detail_ = that.cart.syncCartToStore_detail(res.data.data);
            that.setData({
              store_detail: store_detail_
            })
          } else {
            console.error('信息接收失败')
          }
        },
        fail: function () {
          console.error('信息接收失败')
        }
      });
    } else {
      //TODO：加入购物车
      //请求商店信息
      wx.request({
        url: 'http://192.168.1.29:8080/os/booth/detailByFid',
        data: {
          fid: this.data.fid
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          if (res.data != undefined && res.data.code == 1) {
            var store_detail_ = that.cart.syncCartToStore_detail(res.data.data)
            that.setData({
              store_detail: store_detail_
            })
          } else {
            console.error('信息接收失败')
          }
        },
        fail: function () {
          console.error('信息接收失败')
        }
      });
    }

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  addNumber: function (event) {
    var id = event.currentTarget.dataset.bindid;
    var store_detail_ = this.data.store_detail;
    store_detail_ = this.cart.addToCart(id, 1, store_detail_);
    this.setData({
      store_detail: store_detail_
    });
  },
  subNumber: function (event) {
    var id = event.currentTarget.dataset.bindid;
    var store_detail_ = this.data.store_detail;
    store_detail_ = this.cart.removeFromCart(id, 1, store_detail_);
    this.setData({
      store_detail: store_detail_
    });
  },
  //提交按钮
  onSubmitEventListener: function (e) {
    wx.navigateTo({
      //TODO add sid
      url: '/pages/address/listAddress/listAddress?sid=1',
    })
  }

})