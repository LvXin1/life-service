// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsNameLists:[
      {name:"国际","type":"guoji"},
      {name:"军事",type:"junshi"},
      {name:"财经",type:"caijing"},
      {name:"娱乐",type:"yule"},
      {name:"体育",type:"tiyu"},
      { name: "科技", type: "keji" },
      { name: "游戏", type: "youxi" },
      { name: "汽车", type: "qiche" },
      // { name: "互联网", type: "hulianwang" },
      // { name: "女人", type: "nvren" },
    ],
    activeIndex:0,
    newsLists:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData();
  },
  fetchData(){
    var that = this
    // 访问聚合数据的网络接口-头条新闻
    wx.request({
      url: "https://v.juhe.cn/toutiao/index",
      data: {
        type: that.data.newsNameLists[that.data.activeIndex].type,
        key: "a9f703a0200d68926f707f3f13629078"
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code == 0) {
          that.setData({
            newsLists: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindTap(e){
      this.setData({
        activeIndex: e.currentTarget.dataset.index
      })
    this.fetchData();
  }
})