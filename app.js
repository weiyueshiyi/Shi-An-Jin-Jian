//app.js
let that;
App({
  BaseUrl:{
    // Url:"http://192.168.0.169:5001",
    Url:"https://api.smartracing.cn/v1/incoming",
    urlIndex:"https://api.smartracing.cn/v1"
  },
  data:{
    name:"",
    mobile:"",
    nowTime:Date.now()
  },
  onLaunch: function () {
   
     that=this;
    if (!wx.getStorageSync('name') && !wx.getStorageSync('mobile')) {
      // that.toast("请前往注册")
        // wx.navigateTo({
        //   url: "/pages/phonecode/phonecode"
        // })
    } else{
      // that.toast("登录成功")
      wx.reLaunch({
        url: "/pages/mymarket/mymarket?name=" + wx.getStorageSync('name') + "&mobile=" + wx.getStorageSync("mobile")
      }) 
    
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  onShow:function(){
  },
  onLoad:function(){
     
  },
})