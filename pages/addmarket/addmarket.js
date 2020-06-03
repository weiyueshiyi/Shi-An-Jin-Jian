import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
let that;
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    options1: [],
    name: "",
    charge:"",
    admintell:"",
    booths:"",
    path: '',
    optVal: '',
    btn: false,
    searchData: false
  },

  // 上传文件
  afterRead(event) {
    that = this;
    const { file } = event.detail;
    let fileList = that.data.fileList || [];
    fileList.push(file);
    that.setData({ fileList });
    that.setData({
      path: file.path
    })
    wx.uploadFile({
      url: 'http://192.168.0.214:90/common-services/oss/',
      method: "POST",
      filePath: file.path,
      name: 'file',
      success(res) {
      }, fail(res) {
      }
    });
  },
  // 删除
  clickDelete: function (e) {
    var fileList = this.data.fileList;
    var index = e.currentTarget.dataset.index;
    fileList.splice(index, 1);
    this.setData({ fileList: fileList });
  },

  clickOption: function (e) {
    that = this
    that.setData({
      name: e.currentTarget.dataset.name,
      charge: e.currentTarget.dataset.charge,
      admintell: e.currentTarget.dataset.tel,
      optVal: e.currentTarget.dataset.id,
      searchData: false
    })
  },
  inputMarket: function (e) {
    that = this;
    that.setData({
      name: e.detail.value
    })
    if (e.detail.value !== "") {
      that.setData({
        btn: true,
        searchData: true
      })
    } else {
      that.setData({
        btn: false,
        searchData: false
      })
    }
    wx.request({
      url: app.BaseUrl.Url+'/market',
      data: {
        name: that.data.name
      },
      method: "POST",
      success: function (res) {
        if(res.data.message=="失败"){
          that.setData({
            searchData: false
          })
        }else{
        that.setData({
          options1: res.data.result
        })
        }
       
      }
    })
  },
  inputBooths:function(e){
    this.setData({
      booths:e.detail.value
    })
  },
  inputAdmin:function(e){
    this.setData({
      charge: e.detail.value
    })
  },
  inputAdminTell:function(e){
    this.setData({
      admintell: e.detail.value
    })
  },
  //  提交保存到后台
  clickBtn: function (e) {
    that = this;
    wx.request({
      url:app.BaseUrl.Url+'/add-market',
      method: "POST",
      data: {
        username: that.options.name,
        mobile: that.options.mobile,
        id: that.data.optVal,
        charge:that.data.charge,
        tel:that.data.admintell,
        custom_account: that.data.booths,
        img_url: that.data.fileList
      },
      success: function (res) {
        console.log(res)
        if (res.data.message == "该市场已绑定其他用户") {
          that.toast("该市场已绑定其他用户")
        }
       else if (res.data.message == "已过添加过该市场") {
          that.toast("已过添加该市场")
        } else if(res.data.message == "参数不全"){
          Notify({ type: 'danger', message: '请检查信息是否完整' });
        }
       else if (res.data.message == "成功") {
          that.toast("添加成功")
          setTimeout(() => {
            wx.navigateTo({
              url: "../mymarket/mymarket?name=" + that.options.name + "&mobile=" + that.options.mobile
            })
          }, 100)
        }
      }
    })
  },
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  }
})