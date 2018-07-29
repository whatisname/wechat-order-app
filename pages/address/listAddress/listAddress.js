// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sid: 0,
    addressList: [],
    selectAId: '0',
    bindMethod: "edit",
    showEditTool: false,
    //触发删除时当前选择的id
    deleteAId: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.sid = options.sid;
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.dialog.setDialog('确认删除？', '', "alert");
    // this.dialog.open();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //发起请求
    var that = this;

    wx.request({
      url: 'http://192.168.1.29:8080/os/address/list',
      data: {
        sid: this.data.sid
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        if (res.data != undefined && res.data.code == 1) {
          res.data.data.forEach(function(item, index) {
            if (item.isSelected == true) {
              that.data.selectAId = item.id;
            }
          });
          that.setData({
            addressList: res.data.data
          })
        } else {
          console.error('信息接收失败')
        }
      },
      fail: function() {
        console.error('信息接收失败')
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  submitAddress: function(e) {
    console.log("选择地址")
    wx.navigateTo({
      //TODO add sid
      url: '/pages/payment/payment?sid=1',
    })
  },
  selectAddress: function(e) {
    var id = e.currentTarget.dataset.bindid;
    console.log("选择地址" + id)
    var that = this;
    this.data.addressList.forEach(function(item, index) {
      if (item.isSelected == true) {
        item.isSelected = false;
      }
      if (item.id == id) {
        that.data.selectAId = id;
        item.isSelected = true;
      }
    });
    this.setData({
      addressList: this.data.addressList
    });
  },
  //==================删除或编辑地址==========================
  onTapEdit: function(e) {
    var opt_id = e.currentTarget.dataset.bindid;
    var method = e.currentTarget.dataset.bindmethod;
    //================编辑地址
    if (method == "edit") {
      console.log("修改" + opt_id)
      //TODO 发送请求
      wx.navigateTo({
        url: '/pages/address/addAddress/addAddress?op=edit&aid=' + opt_id,
      })
      //================删除地址
    } else if (method == "delete") {
      //设置当前选择要删除的delete aid
      this.data.deleteAId = opt_id;
      // console.log("删除 aid " + opt_id)
      //打开确认框
      this.dialog.openWithParam('确认删除？', '', "alert");
    }
  },
  doNothing: function(e) {},
  toggleEditIcon: function(e) {
    if (this.data.showEditTool == false) {
      this.data.showEditTool = true;
      this.data.bindMethod = "edit";
    } else {
      if (this.data.bindMethod == 'edit') {
        this.data.showEditTool = false;
      } else if (this.data.bindMethod == 'delete') {
        this.data.bindMethod = "edit";
      }
    }
    this.setData({
      showEditTool: this.data.showEditTool,
      bindMethod: this.data.bindMethod
    });
  },
  toggleDleteIcon: function(e) {
    if (this.data.showEditTool == false) {
      this.data.showEditTool = true;
      this.data.bindMethod = "delete";
    } else {
      if (this.data.bindMethod == 'delete') {
        this.data.showEditTool = false;
      } else if (this.data.bindMethod == 'edit') {
        this.data.bindMethod = "delete";
      }
    }
    this.setData({
      showEditTool: this.data.showEditTool,
      bindMethod: this.data.bindMethod
    });
  },
  addAddress: function(e) {
    var sid = e.currentTarget.dataset.sid;
    console.info("增加地址")
    //转到addAddress页面
    wx.navigateTo({
      //TODO add sid
      url: '/pages/address/addAddress/addAddress?sid=1&op=add',
    })
  },
  //监听事件
  onConfirmListener: function(e) {
    console.log("删除id" + this.data.deleteAId)
    //发送请求
    var that = this;
    wx.request({
      url: 'http://192.168.1.29:8080/os/address/delete',
      data: {
        sid: '1',
        aid: this.data.deleteAId
      },
      header: {
        "Content-Type": "application/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        //成功信息
        if (res.data != undefined) {
          //res.data.code == 1 -> 成功
          //res.data.code == 0 -> 失败
          if (res.data.code == 1) { //成功
            // 显示成功
            // that.dialog.openWithParam('删除成功', '', "success");
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1500
            })
            //TODO
            // 重新获取list
            // 刷新页面
            that.data.addressList.forEach(function(item, index) {
              if (item.id == that.data.deleteAId) { //删除地址
                that.data.addressList.splice(index, 1);
              }
            });
            that.setData({
              addressList: that.data.addressList
            });
          } else { //失败
            //TODO 提示失败信息
            console.error(res.data.message)
            wx.showToast({
              title: res.data.message,
              image: '../../../image/error_w.png',
              duration: 1500
            })
          }
        } else {
          //请求失败
        }
      },
      fail: function(res) {
        //'信息接受失败或无法与服务器建立连接！' + res.message
      },
      complete: function(res) {
        //失败处理
      },
    });

  },
  onCancelListener: function(e) {
    // do nothing
    console.log("onCancelListener")
  },
  onCloseListener: function(e) {
    // do nothing
    console.log("onCloseListener")
  },

})