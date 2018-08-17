//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navLists:['首页','周边','电影','新闻','更多'],
    navActiveLists: [true, false, false, false, false],
    isActiveIndex:0,
    canIUse:'',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showModal({
      title: '授权',
      content: '是否允许获取您的用户信息',
      success:  (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          if (app.globalData.userInfo) {
            this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                  userInfo: res.userInfo,
                  hasUserInfo: true
                })
              }
            })
          }
          wx.switchTab({
            url: '../weather/weather'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          wx.switchTab({
            url: '../weather/weather'
          })
        }
      }
    })
    
  },
  onShow: function () {
    // setTimeout(() => {
    //   wx.switchTab({
    //     url: '../weather/weather'
    //   })
    // }, 2000)
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tapNav(e){

  }
})
