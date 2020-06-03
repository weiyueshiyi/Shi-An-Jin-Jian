
let that;
const app=getApp();
Page({
  data: {
    data:[],
    show:false,
    content:false,
    img:false,
    del:0,
    color:"#00CF96",
    boxshadow: "",
    hint:"",
    msg:"暂无数据"
  },
  onClose(e) {
    const { position, instance } = e.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '提示',
          content: '确定要删除这个商户吗',
          confirmColor:"#00CF96",
          success(res) {
            if (res.confirm) {
              wx.request({
                url: app.BaseUrl.Url + "/remove-merchant",
                method: "DELETE",
                data: {
                  client_id: "5e894b22b8e68c3499194497",
                  uid: e.currentTarget.dataset.uid
                },
                success(res) {
                  that.getTitle() 
                }
              })
              instance.close();
            } else if (res.cancel) {
              instance.close();
            }
          }
        })
        break;
    }
  },
  SearchInput:function(e){
    that = this;
    e.detail && that.setData({
      value:e.detail.value
    })
    if(that.data.value==""){
      that.getTitle()
    }
  },
  clickSearch:function(){
    that = this;
    let val = that.data.value;
    wx.request({
      url: app.BaseUrl.Url+'/search-merchant',
      method:"POST",
      data:{
        marketId: that.options.marketid,
        // 'client_id': '5e894b22b8e68c3499194497',
        name:val
      },
      success:function(res){
        if (res.data.result.length < 1){
          that.setData({
            show: true,
            content: false,
            // img: true
          })
        }
        else{
        that.setData({
          data:res.data.result
        })
        } 
      }
    })
      },
  getTitle() {
    that = this;
    wx.setNavigationBarTitle({
      title: that.options.marketname,
    })
    wx.request({
      url: app.BaseUrl.Url + '/merchants',
      method: "POST",
      data: {
        marketId: that.options.marketid,
        // 'client_id': '5e894b22b8e68c3499194497'
      },
      success(res) {
        if (res.data.message == "暂无商户信息" || res.data.result.length==[]) {
          that.setData({
            show: false,
            content: false,
            img: true
          })
        } else if (res.data.result.length>=1) {
          that.setData({
            show: true,
            content: true,
            img: false,
            data: res.data.result
          })
        }
      }
    })
  },
  onShow: function () {
    this.getTitle();
  },
  // 点击查看商户
  clickLookMerch:function (e) { 
    wx.navigateTo({
      url: '../Merchdetails/Merchdetails?uid=' + e.currentTarget.dataset.uid + "&name=" + this.options.name + "&mobile=" + this.options.mobile + "&marketid=" + that.options.marketid
    })
   },
  clickBtn:function(){
    wx.navigateTo({
      url: '../addcommercial/addcommercial?marketid=' + this.options.marketid + "&name=" + this.options.name + "&mobile=" + this.options.mobile
    })
  },
  onPageScroll: function (res) {
    if (res.scrollTop>50) {
      this.setData({
        boxshadow: "5px 5px 5px rgba(187, 187, 187, 0.4)",
        top:"-2rpx",
        transition:"margin-top 0.2s linear"
      })
    } else {
      this.setData({
        boxshadow: "none",
        top:""
      })
    }
  }
})