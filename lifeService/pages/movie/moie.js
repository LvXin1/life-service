// pages/movie/moie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showingLists:[],
    willShowLists:[],
    topShowLists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: 'https://api-m.mtime.cn/Showtime/LocationMovies.api', //仅为示例，并非真实的接口地址
      data: {
        // apikey:"0b2bdeda43b5688921839c8ecb20399b",
        // city:"北京",
        // start:1,
        // count:3,
        locationId:290
      },
      success: function (res) {
        var arr1 = [];
        res.data.ms.forEach(row => {
          arr1.push({
            img:row.img,
            name:row.t,
            grade:row.r,
          })
        })
        _this.setData({
          showingLists:arr1
        })
        console.log(res.data)
      }
    })
    wx.request({
      url: 'https://api-m.mtime.cn/Movie/MovieComingNew.api', //仅为示例，并非真实的接口地址
      data: {
        // apikey:"0b2bdeda43b5688921839c8ecb20399b",
        // city:"北京",
        // start:1,
        // count:3,
        locationId: 290
      },
      success: function (res) {
        console.log(res.data)
        var arr2 = [] ,arr3 = [];
        res.data.moviecomings.forEach(row => {
          arr2.push({
            img: row.image,
            name: row.title,
            date: row.rYear + '/' + row.rMonth + '/' + row.rDay,
            type:row.type,
          })
          
        })
        res.data.attention.forEach(row => {
          arr3.push({
            img: row.image,
            name: row.title,
            date: row.rYear + '/' + row.rMonth + '/' + row.rDay,
            type: row.type,
          })

        })
        _this.setData({
          willShowLists: arr2
        })
        _this.setData({
          topShowLists: arr3
        })
        console.log(res.data)
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
  searchMovie(e){

  }
})