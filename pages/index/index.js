
const app=getApp();
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:"",  //接口返回的手机号
    name:"",    //接口返回的用户名
    tel: "",    //用户输入的手机号
    code: "",   //用户输入的验证码
    sendTime: '获取验证码',
    sendColor: '#A29CB1',
    snsMsgWait: 60,
    smsFlag:false,
    isShow_index: false, //输入框的边框变色
    height:'1rpx',
    opacity:'0.1',
    opacity1:'0.1',
    cancel:false,
    isShow_index1:false,
    backgroundColor:"#fff", 
    selectedColor: "#1BD49D",
    nowTime: Date.now(),
    deadTime: 1000 * 60 * 24 * 3
  },
  //输入框的边框变色
  handleTap:function(){
    this.setData({
      isShow_index: true,
      isShow_index1: false,
      transition:"background-color 1s ease-out",
      opacity:'0.5'
    })
  },
  handleTap1:function(){
    this.setData({
      isShow_index: false,
      isShow_index1: true,
      transition:"background-color 2s ease-out",
      opacity1:'0.5'
     
    })
  },

  // 点击重输手机号
  clickCancel:function(event){
    var that=this;
    that.setData({
      tel:this.tel=""
    })
  },
  
  inputTel: function(e) {
    this.setData({
      tel: e.detail.value
    })
    if(e.detail.value !==""){
      this.setData({
        cancel:true
      })
    } else{
      this.setData({
        cancel:false
      })
      }
  },
  inputCode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 获取验证码
  sendCode: function() {
    that = this;
    if (this.data.tel == "") {
      this.toast('请输入手机号');
      return;
    }
    if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(that.data.tel))) {
      this.toast('手机号输入错误');
      return;
    }
    // 60秒后重新获取验证码
    var inter = setInterval(function() {
      this.setData({
        smsFlag: true,
        sendColor: '#1BD49D',
        sendTime: this.data.snsMsgWait + 's后重发',
        snsMsgWait: this.data.snsMsgWait - 1
      });
      if (this.data.snsMsgWait < 0) {
        clearInterval(inter)
        this.setData({
          sendColor: '#1BD49D',
          sendTime: '重新发送',
          snsMsgWait: 60,
          smsFlag: false
        });
      }
    }.bind(this), 1000);
    wx.request({
      url: "https://api.smartracing.cn/v1/users1/auth/verify",
      method:"POST",
      data:{
        'client_id':'5e894b22b8e68c3499194497',
        'mobile':that.data.tel
      },
      success: function (res) {
        if (res.data.success) {
            that.toast('短信验证码发送成功，请注意查收');
         }
      },
      fail:function(res){
      }
    })
  },
  // 事件处理函数
  onLogin: function() {
    that = this;
      wx.request({
        url: 'https://api.smartracing.cn/v1/users1/auth/register',
        data: {
          'client_id':'5e894b22b8e68c3499194497',
          'mobile':that.data.tel,
          "verify_code":that.data.code
        },
        method: "POST",
        success: function (res) {
          if (that.data.tel == "" || that.data.code == "" ) {
            that.toast('输入框内容不能为空');
            return
          } else if (!res.data.success) {
            that.toast("验证码错误或过期");
            return;
          } else{
            setTimeout(() => {
              wx.request({
                url: 'https://api.smartracing.cn/v1/users1/profiles/me',
                method: "GET",
                data: {},
                header: {
                  "Authorization": res.data.result.token_type + " " + res.data.result.access_token
                },
                success: function (res) {
                  if (res.statusCode === 200) {
                    // 缓存
                    let nowTime = Date.now()
                    wx.setStorageSync("nowTime", nowTime)
                    wx.setStorageSync("name", res.data.result.name)
                    wx.setStorageSync("mobile", res.data.result.mobile)
                  }
                  that.toast("登录成功")
                  setTimeout(() => {
                    wx.redirectTo({
                      url: "../mymarket/mymarket?name=" + res.data.result.name + "&mobile=" + res.data.result.mobile
                    })
                  }, 100)
                }
              })
            }, 100)
          }
        }
      })
  
  },
  clickProtocol:function(){
    wx.navigateTo({
      url: '../treaty/treaty',
    })
  },

  // toast方法抽取
  toast: function(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1000,
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow:function(){
    setTimeout(()=>{
      wx.clearStorageSync("name")
      wx.clearStorageSync("mobile")
    },this.data.deadTime)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})