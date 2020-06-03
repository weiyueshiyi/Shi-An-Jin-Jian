import Notify from "../../miniprogram_npm/@vant/weapp/notify/notify";
let that;
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['粮油', '贝类', '冰禽', '家禽', '牛羊肉', '水果', "豆腐", '猪肉', '食品', '禽蛋', '酱菜', '水产', '日杂', '酒水', '蔬菜', '干货', '汤料', '腌腊'],
    currentDates:"",
    currentDate: new Date().getTime(),
    maxDate: new Date(2050,12,30).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
    pickers:true,
    show: false,
    shows: false,
    time:false,
    rescan:"扫描识别",
    scan:"扫描快速识别",
    inputOneTime:true,
    inputTwoTime:false,
    title:"",
    name:"",
    num:"",
    banknum:'',
    duedate:'',
    booth:'',
    owner:"",
    legal:'',
    tell:'',
    optVal:""
  },
  onInput(event) {
    var newDate = new Date();
    newDate.setTime(event.detail);
    this.setData({
      currentDates: newDate.toLocaleDateString()
    });
  },
clickExpireTime:function(e){
  this.setData({
    time:false,
    duedate:this.data.currentDates,
    shows: false
  })
},
  clickCancelTime:function(){
    this.setData({
      shows:false,
      inputOneTime:false,
      inputTwoTime:true
    })
  },
clickCardDueTime:function(e){
  this.setData({
    shows:true
  })
},
  // 遮罩
  onClickShow() {
    this.setData({ show: true});
  }, 
  // 证件识别
  success(e) {
    that=this;
    that.setData({
      name:e.detail.name.text,
      num:e.detail.id.text
    })
  },
  successSer:function(e){
    that = this;
    that.setData({
      duedate:e.detail.valid_date.text.substr(9,8)
    })
  },
  // 参数取值
  bankSuccess(e){
    that=this;
    that.setData({
      banknum:e.detail.number.text
    })
  },
  onConfirm(event) {
    that=this;
    const { picker, value, index } = event.detail;
    this.setData({
      optVal: `${value}`,
      show: false
    })
  },
  onCancel(){
    this.setData({
      show:false,
      shows:false
    })
  },
  onChangeName:function(e){
    that=this;
    that.setData({
      name:e.detail.value
    })
  },
  onChangeIdCard:function(e){
    that=this;
    that.setData({
      num:e.detail.value
    })
  },
  onChangeIdCardExpire:function(e){
    that=this;
    that.setData({
      duedate:e.detail.value
    })
  },
  onChangeBlankNum:function(e){
    that=this;
    that.setData({
      banknum:e.detail.value
    })
  },
  onChangeBooth:function(e){
    that=this;
    that.setData({
      booth:e.detail.value
    })
  },
  onChangeOwner:function(e){
    that = this;
    that.setData({
      owner: e.detail.value
    })
  },
  onChangeLegal:function(e){
    that=this;
    that.setData({
      legal:e.detail.value
    })
  },
  onChangeTell:function(e){
    that=this;
    that.setData({
      tell:e.detail.value
    })
  },
  clickBtn:function(){
    that=this;
    if (that.data.name == ""){
      Notify({ type: 'danger', message: '请输入您的姓名' });
    } else if (that.data.num == ""){
      Notify({ type: 'danger', message: '请输入您的身份证号' });
    } else if (that.data.duedate == ""){
      Notify({ type: 'danger', message: '请输入您的身份证有效期' });
    } else if (that.data.banknum == "") {
      Notify({ type: 'danger', message: '请输入您的银行卡号' });
    } else if (that.data.booth == "") {
      Notify({ type: 'danger', message: '请输入您的摊位号' });
    } else if (that.data.tell == "") {
      Notify({ type: 'danger', message: '请输入您的联系电话' });
    } 
          else{
            wx.request({
      url:app.BaseUrl.Url+'/add-merchant',
      method:"POST",
      data:{
        market_name: that.options.name,
        client_id:"5e894b22b8e68c3499194497",
        marketId:that.options.marketid,
        name:that.data.name,
        id_card_no:that.data.num,
        expiry_time:that.data.duedate,
        bank_account:that.data.banknum,
        customCode:that.data.booth,
        owner: that.data.name,
        legal_person: that.data.name,
        mobile:that.data.tell,
        type_name:that.data.optVal
      },
      success:function(res){
        if (res.data.message =="该商户已进件"){
          that.toast("该商户已进件")
        } else if (res.data.message == "请输入正确的身份证号"){
          Notify({ type: 'danger', message: '请输入正确的身份证号' });
        } else if (res.data.message == "请输入正确的手机号") {
          Notify({ type: 'danger', message: '请输入正确的手机号' });
        } else if (res.data.message == "请输入正确的手机号") {
          Notify({ type: 'danger', message: '请输入正确的银行卡号' });
        }
        else if(res.data.message=="成功"){
          that.toast("添加成功")
          wx.navigateBack({
            delta: 1
          })
        }
      }
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
  // onLoad: function (options) {
  //   that=this;
  //   that.setData({
  //     title:options.name
  //   })
  // }
})