//index.js
const app = getApp()
let that;
Page({
  data: {
    name:"",
    mobile:"",
    nowTime:Date.now(),
    deadTime: 1000 * 60 * 24* 3
  },
  
  onLogin: function () {
    that=this;
    if (!wx.getStorageSync('name') && !wx.getStorageSync('mobile') || (wx.getStorageSync('nowTime') + that.data.deadTime) <= that.data.nowTime) {
      that.toast("请前往注册")
        wx.navigateTo({
          url: "../phonecode/phonecode"
        })
    } else{
      that.toast("登录成功")
      wx.navigateTo({
        url: "../mymarket/mymarket?name=" + wx.getStorageSync('name') + "&mobile=" + wx.getStorageSync("mobile")
      })
    
    }
  },
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
  //事件处理函数
  onLoad: function () {
  },
  onShow: function () { 
  },
})