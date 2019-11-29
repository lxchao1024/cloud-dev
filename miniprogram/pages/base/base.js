// miniprogram/pages/base/base.js

var remainTime = 120000;
Page({

  data: {
    checked: true,
    anim:{}
  },

  onLoad: function(options) {
    this.countDownTimer()
  },

  countDownTimer: function(timestamp) {
    let time = 500;
    let { listData } = this.data;
    if (remainTime <= 0) return
    let formatTime = this.getFormat(remainTime);
    remainTime -= time;
    console.log(formatTime)
    this.setData({
      hhh: formatTime.hh,
      mmm: formatTime.mm,
      sss: formatTime.ss
    });
    setTimeout(this.countDownTimer, time);
  },

  /**
     * 格式化时间
     */
  getFormat: function (msec) {
    let ss = parseInt(msec / 1000);
    let ms = parseInt(msec % 1000);
    let mm = 0;
    let hh = 0;
    if (ss > 60) {
      mm = parseInt(ss / 60);
      ss = parseInt(ss % 60);
      if (mm > 60) {
        hh = parseInt(mm / 60);
        mm = parseInt(mm % 60);
      }
    }
    ss = ss > 9 ? ss : `0${ss}`;
    mm = mm > 9 ? mm : `0${mm}`;
    hh = hh > 9 ? hh : `0${hh}`;
    return { ms, ss, mm, hh };
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

  onClick: function() { 
    var that = this

    var runNum = 8;//旋转8周
    var duration = 2000;//时长

    var d = Math.ceil(Math.random() * 360)
    var resetDe = d + 360 * runNum

    console.log('reset degree = ' + resetDe)

    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
    })

    animation.rotate(resetDe).step()
    this.setData({
      anim: animation.export()
    })
    setTimeout(() => {
      animation.opacity(1).step()
      that.setData({
        sendMsg: '',
        anim: animation.export()
      })
    }, 1700)
  },

  reset: function() {
    var that = this
    var animation = wx.createAnimation({
      duration: 10,
      timingFunction: 'linear',
    })

    animation.rotate(0).step()
    this.setData({
      anim: animation.export()
    })
  },

  
})