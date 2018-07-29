//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    adv_name: [],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {    
  },
  onReady: function () {
    //获得cart组件
    this.cart = this.selectComponent("#cart");
    var that = this;
    wx.request({
      url: 'http://192.168.1.29:8080/os/info/recommend',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // console.log('success')
        if (res.data != undefined && res.data.code == 1) {
          // console.log(res.data)
          that.setData({
            stores: res.data.data
          })
        } else {
          console.error('信息接收失败')
        }
      },
      fail: function () {
        console.error('信息接收失败')
      }
    });

    wx.request({
      url: 'http://192.168.1.29:8080/os/info/adv',
      data: {},
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        // console.log('success')
        if (res.data != undefined && res.data.code == 1) {
          // console.log(res.data)
          that.setData({
            adv_name: res.data.data
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
  toggleIcon() {
    this.cart.toggleIcon();
  },
  // //取消事件
  // _cancelEvent() {
  //   console.log('你点击了取消');
  //   // this.dialog.hideDialog();
  // },
  // //确认事件
  // _confirmEvent() {
  //   console.log('你点击了确定');
  //   // this.dialog.hideDialog();
  // },






  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // 请求餐厅list
    this.setData({
      index: e.detail.value
    })
  },
  // 扫描二维码
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        that.setData({
          result: res.result
        })
      },
      fail: function (res) {
        that.setData({
          result: "fail"
        })
      }
    })
  },
  // //slider-function
  // upper: function (e) {
  //   console.log(e)
  // },
  // lower: function (e) {
  //   console.log(e)
  // },
  // scroll: function (e) {
  //   console.log(e)
  // },
  // scrollToTop: function (e) {
  //   this.setAction({
  //     scrollTop: 0
  //   })
  // },
  // tap: function (e) {
  //   for (var i = 0; i < order.length; ++i) {
  //     if (order[i] === this.data.toView) {
  //       this.setData({
  //         toView: order[i + 1],
  //         scrollTop: (i + 1) * 200
  //       })
  //       break
  //     }
  //   }
  // },
  // tapMove: function (e) {
  //   this.setData({
  //     scrollTop: this.data.scrollTop + 10
  //   })
  // }
})
