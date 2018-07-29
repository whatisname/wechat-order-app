// component/confirm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    confirmText:{
      type: String,
      value: '确认'
    },
    cancelText:{
      type: String,
      value: '取消'
    },
    closeText:{
      type: String,
      value: '关闭'
    },
    
    //


  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowDialog: true, 
    title: '操作成功',
    content: '',
    // 按钮数量{1,2}
    buttonNumber: 1,
    //对话框的类型
    //info - confirm cancel
    //alert - confirm cancel
    //error - confirm cancel
    //success - confirm cancel
    dialogType: 'success',

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //关闭对话
    close: function(){
      this.setData({
        isShowDialog: false
      });
    },
    //打开对话框
    open: function () {
      this.setData({
        isShowDialog: true
      });
    },
    //设置内容
    setDialog: function (title, content, dialogType){
      this.setData({
        title: title,
        content: content,
        dialogType: dialogType
      });
    },
    //设置内容并打开
    open: function (title, content, dialogType) {
      //TODO 决定dialogType和buttonNumber
      this.setData({
        title: title,
        content: content,
        dialogType: dialogType,
        isShowDialog: true
      });
    },

    /**
     * 内部事件
     */
    //关闭事件
    _onClose: function () {
      console.log("关闭事件")
      // 关闭对话框
      this.close();
      // detail对象，提供给事件监听函数
      var eventDetail = {}
      // 触发事件的选项
      var eventOption = {
        bubbles: false,
        composed: false
      }
      this.triggerEvent('oncloseevent', eventDetail, eventOption)
    },
    //确认事件
    _onConfirm: function () {
      console.log("确认事件")
      // 关闭对话框
      this.close();
      // detail对象，提供给事件监听函数
      var eventDetail = {}
      // 触发事件的选项
      var eventOption = {
        bubbles: false,
        composed: false
      }
      this.triggerEvent('onconfirmevent', eventDetail, eventOption)
    },
    //取消事件
    _onCancel: function () {
      console.log("取消事件")
      // 关闭对话框
      this.close();
      // detail对象，提供给事件监听函数
      var eventDetail = {}
      // 触发事件的选项
      var eventOption = {
        bubbles: false,
        composed: false
      }
      this.triggerEvent('oncancelevent', eventDetail, eventOption)
    },
    doNothing: function(){},

  }
  
})
