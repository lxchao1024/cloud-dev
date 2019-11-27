// miniprogram/pages/base/base.js
Page({

  data: {
    checked: true
  },

  onChange: function(e) {
    console.log(e.detail)
    this.setData({
      checked: e.detail
    })
  },

  onGotUserInfo: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },
})