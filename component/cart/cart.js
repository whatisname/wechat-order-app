// pages/component/cart/cart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
    /**
     * 样式设置
     */
    //主题颜色
    orange: {
      type: String,
      value: '#ffb901'
    },
    green: {
      type: String,
      value: '#3CB963'
    }, 
    green1: {
      type: String,
      value: '#69C730'
    }, 
    green2: {
      type: String,
      value: '#3CB963'
    },
    green3: {
      type: String,
      value: '#119B55'
    },
    green4: {
      type: String,
      value: '#0E7B45'
    },
    blue: {
      type: String,
      value: '#28558A'
    },
    red: {
      type: String,
      value: '#FF2A27'
    },
    white: {
      type: String,
      value: '#FFFFFF'
    },
    /**
     * 文本设置
     */
    //提交按钮
    submitText: {
      type: String,
      value: '下订单'
    },
    //删除按钮
    deleteText: {
      type: String,
      value: '删除'
    },
    //快递费文本
    deliverFeeText: {
      type: String,
      value: '快递费'
    },
    //总价文本
    totalPriceText: {
      type: String,
      value: '总价'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    //显示控制
    isShowIcon: true,
    isShowDetail: false,
    isShowFood: true,
    isShowAddress: false,
    isShowPayment: false,
    // 数据设置
    cartMap: new Map(),
    // 总价
    totalPrice: 0,
    // 总份数
    totalNumber: 0,
    // 购物车内容list
    cartList: new Array(),
    // 快递费
    deliverFee: 0,
    submitUrl: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // ==============外部方法=============================== 
    //初始化所有数据
    init(){
      // this.data.
    },
    //显示购物车图标
    showIcon() {
      this.setData({
        isShowIcon: true
      })
    },
    //隐藏购物车图标
    hideIcon() {
      this.setData({
        isShowIcon: false
      })
    },
    //切换购物车图标显示状态
    toggleIcon() {
      this.setData({
        isShowIcon: !this.data.isShowIcon
      })
    },
    //展开购物车
    expandDetail() {
      this.setData({
        isShowIcon: false, 
        isShowDetail: true
      });
    },
    //收起购物车
    hideDetail() {
      this.setData({
        isShowIcon: true, 
        isShowDetail: false
      });
      //TODO: 同步外部数据

    },
    //收起购物车
    toggleDetail() {
      // toggleIcon();
      //TODO
    },
    //加入购物车
    addToCart(id, number, store_detail) {
      console.log("加入购物车: " + id + " " + number)
      //判断是否存在
      if (id in this.data.cartMap) {
        this.data.cartMap[id]++;
      } else {
        this.data.cartMap[id] = 1;
      }
      return this.syncCartToStore_detail(store_detail);
    },
    //从购物车减去
    removeFromCart(id, number, store_detail) {
      console.log("除去购物车: " + id + " " + number)
      //判断是否存在
      if (id in this.data.cartMap) {
        if (this.data.cartMap[id] > 1) {
          this.data.cartMap[id]--;
        } else if (this.data.cartMap[id] = 1){
          this.data.cartMap[id] = 0;
        } else {
          this.data.cartMap[id] = 0;
        }
      } else {}
      return this.syncCartToStore_detail(store_detail);
    },
    //同步购物车内容cartList
    syncCartToStore_detail(store_detail) {
      //重置cartList,totalNumber和totalPrice
      this.data.cartList = [];
      this.data.totalPrice = 0;
      this.data.totalNumber = 0;
      var that = this.data;
      store_detail.foods.forEach(function (item, index) {
        //如果id存在购物车内（carMap）
        // catMap->store_detail->cartList
        if (item.id in that.cartMap) {
          item.number = that.cartMap[item.id]
          that.totalPrice += item.price * item.number;
          that.totalNumber += item.number;
          // that.cartList.add(item);
          if (that.cartMap[item.id] != 0) {
            that.cartList.push(item);
          }
          // console.log(that.cartList)
          // console.log(that.cartMap)
          // console.log(that.totalPrice)
          // console.log(that.totalNumber)
          // console.log(Number(5.1*3)); //结果异常
        }
      });
      this.data.deliverFee = this._getDeliverFee(this.data.totalNumber);
      //更新视图数据
      this.setData({
        totalPrice: this.data.totalPrice,
        totalNumber: this.data.totalNumber,
        cartList: this.data.cartList,
        deliverFee: this.data.deliverFee,
      });

      return store_detail;
    },
    //同步购物车内容foodList
    syncCartToFoodList(foodList) {
      //重置totalNumber和totalPrice
      this.data.totalPrice = 0;
      this.data.totalNumber = 0;
      var that = this.data;
      foodList.forEach(function (item, index) {
        //数量为0，删除项目
        if (that.cartMap[item.id] == 0) {
          that.cartList.splice(index, 1);
        }
        item.number = that.cartMap[item.id];
        that.totalPrice += item.price * item.number;
        that.totalNumber += item.number;
      });
      this.data.deliverFee = this._getDeliverFee(this.data.totalNumber);
      //更新视图数据
      this.setData({
        totalPrice: this.data.totalPrice,
        totalNumber: this.data.totalNumber,
        cartList: this.data.cartList,
        deliverFee: this.data.deliverFee,
      });
      return foodList;
    },
    doNothing(){},

    
    /** ==============内部方法===============================
      * 内部私有方法建议以下划线开头
      * triggerEvent 用于触发事件
      */
    _onSubmit: function () {
      if (this.data.totalNumber == 0) {
        console.info("购物车内容为空")
      } else {
        console.info("选择地址")
        // detail对象，提供给事件监听函数
        var onSubmitEventDetail = {
          cartMap: this.data.cartMap
        }
        // 触发事件的选项
        var onSubmitEventOption = {
          bubbles: false,
          composed: false
        } 
        this.triggerEvent('onsubmitevent', onSubmitEventDetail, onSubmitEventOption)
      }
    },
    _add(event) {
      var id = event.currentTarget.dataset.bindid;
      console.log("加入购物车: " + id + " ")
      this.data.cartMap[id]++;
      this.syncCartToFoodList(this.data.cartList);
    },
    _sub(event){
      var id = event.currentTarget.dataset.bindid;
      console.log("除去购物车: " + id + " ")
        if (this.data.cartMap[id] > 1) {
          this.data.cartMap[id]--;
        } else if (this.data.cartMap[id] = 1) {
          this.data.cartMap[id] = 0;
        } else {
          this.data.cartMap[id] = 0;
        }
      this.syncCartToFoodList(this.data.cartList);
    },
    // 拖动方法
    _drag(){},
    
    // =============滚动视图监听============================
    upper: function (e) {
      console.log(e)
    },
    lower: function (e) {
      console.log(e)
    },
    scroll: function (e) {
      console.log(e)
    },

    // =============计算方法============================
    //乘法
    _multiply(num1, num2){
    },
    //计算快递费
    _getDeliverFee(num) {
      return num - ((num - (num % 3)) / 3);
    },

  },
  //组件添加时
  attached: function () {
  },
  //组件移除时
  detached: function () { },
})
