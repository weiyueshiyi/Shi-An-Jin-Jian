// pages/returnmarket//returnmarket.js
let that;
const app = getApp()
Page({
  data: {
    data: "",
    img: false,
    content: true,
    nulls: false,
    value: ""
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.request({
      url: app.BaseUrl.Url + '/search-market',
      method: "POST",
      data: {
        name: that.options.value,
        username: that.options.name,
        mobile: that.options.mobile
      },
      success(res) {
        if (res.data.message == "未绑定该市场") {
          that.setData({
            img: true,
            content: false
          })
        } else {
          that.setData({
            value: that.options.value,
            data: res.data.result,

          })
        }

      }
    })
  },
  clickMarketDetail: function (e) {
    // 跳转到详情传、参数
    wx.navigateTo({
      url: "../marketdetail/marketdetail?marketname=" + e.currentTarget.dataset.myname + "&marketid=" + e.currentTarget.dataset.myid
    })
  },
  //返回我的市场
  returnMarket: function () {
    setTimeout(() => {
      wx.navigateTo({
        url: "../mymarket/mymarket?name=" + that.options.name + "&mobile=" + that.options.mobile
      })
    }, 100)
  },

})