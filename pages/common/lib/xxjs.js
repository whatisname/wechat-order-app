/*!
 * xxjs.wxss v1.1.0 (https://github.com/)
 * Copyright 2016, xxy
 * 7/27/2018 12:10 AM
 */
module.exports = {
  getReq: getReq,
  postReq: postReq,
}
//get 请求
function getReq(url, dataset) {
  var message = '';
  var result = null;
  var that = this;
  wx.request({
    url: 'http://192.168.1.29:8080/os' + url,
    data: dataset,
    header: {
      "Content-Type": "application/json"
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      that.message = 'success'
      //成功信息
      if (res.data != undefined) {
         //res.data.code == 1 -> 成功
         //res.data.code == 0 -> 失败
        that.result = res.data;
      } else { //错误信息
        that.result =  {
          code: 0,
          message: '信息接受失败或无法与服务器建立连接！'
        }
      }
    },
    fail: function (res) {
      that.message = 'fail'
      that.result = {
        code: 0,
        message: '信息接受失败或无法与服务器建立连接！'+res.message
      }
    },
    complete: function (res) {
      console.log(that.result)
      return that.result;
    },
  });
}

//post 请求
function postReq(url, dataset) {
  wx.request({
    url: 'http://192.168.1.29:8080/os' + url,
    data: dataset,
    header: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      //成功信息
      if (res.data != undefined) {
        //res.data.code == 1 -> 成功
        //res.data.code == 0 -> 失败
        return res.data;
      } else { //错误信息
        return {
          code: 0,
          message: '信息接受失败或无法与服务器建立连接！'
        }
      }
    },
    fail: function (res) {
      return {
        code: 0,
        message: '信息接受失败或无法与服务器建立连接！' + res.message
      }
    },
    complete: function (res) { },
  });
}

//

var that = this;
wx.request({
  url: 'http://192.168.1.29:8080/os/',
  data: {},
  header: {
    "Content-Type": "application/json"
  },
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  success: function (res) {
    //成功信息
    if (res.data != undefined) {
      //res.data.code == 1 -> 成功
      //res.data.code == 0 -> 失败
      if(res.data.code == 1){ //成功
        //TODO 成功处理
      }else{ //失败
        //TODO 提示失败信息
        //res.data.message
      }
    } else { 
      //请求失败
    }
  },
  fail: function (res) {
    //'信息接受失败或无法与服务器建立连接！' + res.message
  },
  complete: function (res) {
    //失败处理
  },
});