
let that;
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    img:false,
    content:true,
    page:1,
    loading:true,
    nulls:false,
    boxshadow: "",
    top:""
  },
  clickMarketDetail:function(e){
    // 跳转到市场详情
   wx.navigateTo({
     url: "../marketdetail/marketdetail?marketname=" + e.currentTarget.dataset.myname + "&marketid=" + e.currentTarget.dataset.myid + "&name=" + that.options.name + "&mobile=" + that.options.mobile
   })
  },

  //获取搜索框内容
  searchInput:function(e){
    that = this;
    e.detail && that.setData({
      value:e.detail.value
    })
  },
  clickSearch:function(e){
    that = this;
    let val = that.data.value
    wx.request({
      url: app.BaseUrl.Url+'/search-market',
      method:"POST",
      data:{
        name:val,
        username:that.options.name,
        mobile:that.options.mobile
      },
      success:function(res){
        wx.navigateTo({
          url: "../returnmarket/returnmarket?value=" + val + "&name=" + that.options.name + "&mobile=" + that.options.mobile
        })
      }
    })
  
      },
      // 获取市场
      getMarkets:function(page=1){
        that=this;
        wx.request({
          url:app.BaseUrl.Url+"/markets",
          data:{
           name:that.options.name,
           mobile:that.options.mobile,
          page_num:page
          },
          method:"POST",
          success:(res)=>{
           
          if(res.statusCode===200){
              let data=that.data.data;
              data=[...data,...res.data.result]
              if(res.data.result.length<10){
                that.setData({
                  a:true,
                  loading:false
                })
              } 
                 that.setData({
                data:data,
                 page:++page,
                 value:''
              })   
          }
          if(res.data.message=="暂无添加市场"){
            that.setData({
              loading:false,
              img: true
            })
          } 
          },
          fail(res){
            console.log(res)
          }
        })
      },
  // 上拉加载
  onReachBottom: function () {
    that=this;
    if(that.data.a){
      return null
    }else{
       setTimeout(()=>{
    that.getMarkets(that.data.page)
    },1000)
    }
  },
  onShow: function () {
    that=this;
    setTimeout(()=>{
     that.setData({
      data:[]
    })
     that.getMarkets(1);
      },1000)
  },
  addMarket:function(){
    that=this;
    wx.navigateTo({
      url: "../addmarket/addmarket?name="+that.options.name+"&mobile="+that.options.mobile,
    })
  },
  //跳转退出登录页面
  onLogout:function(e){
    wx.navigateTo({
      url:"../logout/logout"
    })
  },
  // 滑动一定距离输入框有阴影
  onPageScroll: function (res) {
    if (res.scrollTop>20){
      this.setData({
        boxshadow: "5px 5px 5px rgba(187, 187, 187, 0.4)",
        top: "-2rpx",
        transition: "margin-top 0.2s linear"
      })
    }else{
      this.setData({
        boxshadow: "none",
        top:''
      })
    }
  }
})