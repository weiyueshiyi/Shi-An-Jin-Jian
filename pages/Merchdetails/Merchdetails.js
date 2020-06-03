// pages/addcommercial/addcommercial.js
let that;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // columns: ['蔬菜', '猪肉', '水产', '牛羊肉', '贝类', "冰鲜", '家禽', '禽蛋', '粮油', '面食', '机面', '酒水', '卤味', '熟食', '日杂', '便利', '食品', '豆腐',],
    // pickers: false,
    // title: "",
    // name: "",
    // num: "",
    // banknum: '',
    // duedate: '',
    // booth: '',
    // legal: '',
    // tell: '',
    // optVal: "",
    data:[],
    msg: "暂无数据"
  },
  onLoad(options){
  },
  onSuccess(e) {
    that = this;
    that.setData({
      name: e.detail.name.text,
      num: e.detail.id.text
    })
  },
  bankSuccess(e) {
    that = this;
    that.setData({
      banknum: e.detail.number.text
    })
  },
  clickPicker() {
    that = this;
    that.setData({
      pickers: true
    })
  },
  onConfirm(event) {
    that = this;
    const { picker, value, index } = event.detail;
    this.setData({
      optVal: `${value}`,
      pickers: false
    })
  },
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.request({
      url:app.BaseUrl.Url+ "/merchant",
      data:{
        uid:that.options.uid,
        'client_id': '5e894b22b8e68c3499194497'
      },
      method:"post",
      success(res){
      console.log(res)
        that.setData({
          data:res.data.result
        })
      }
    })
  },
  clickBtn(){
    wx.navigateBack({
      delta: 1
    })
  }
})