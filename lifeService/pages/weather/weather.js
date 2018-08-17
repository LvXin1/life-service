// pages/weather/weather.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl:[
      "../../images/banner1.jpg",
      "../../images/banner2.jpg",
      "../../images/banner3.jpg",
    ],
    cityName:"北京",
    location:'北京',
    dateLists:[],
    nowDate: new Date().getFullYear() + '年' + Number(new Date().getMonth() + 1) + '月' + new Date().getDate() + '日  ' + new Date().getHours() + ':' + new Date().getMinutes() ,
    weatherData:[],
    dress:'',
    tag:Object(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    this.setData({
      dateLists: [this.GetDateStr(1), this.GetDateStr(2), this.GetDateStr(3), this.GetDateStr(4), this.GetDateStr(5)]
    })
    var _this = this;
    wx.request({
      url: 'https://weatherapi.market.xiaomi.com/wtr-v3/weather/all', //仅为示例，并非真实的接口地址
      data: {
        latitude:0,
        longitude:0,
        locationKey:'',
        sign:"zUFJoAR2ZVrDy1vF3D07",
        isGlobal:false,
        locale:"zh_cn",
        days:5,
        appKey:"weather20151024",
      },
      success: function (res) {
        var arr1 = [];
        console.log(res.data)
        // res.data.ms.forEach(row => {
        //   arr1.push({
        //     img: row.img,
        //     name: row.t,
        //     grade: row.r,
        //   })
        // })
        // _this.setData({
        //   showingLists: arr1
        // })
       
      }
    })
  },
  getWeather(){
    var length = this.data.city.length;
    var city = this.data.city.slice(0, length - 1); //分割字符串
    console.log(city);
    var that = this;
    var param = {
      key: app.globalData.heWeatherKey,
      location: city
    };
    //发出请求
    wx.request({
      url: app.globalData.heWeatherBase + "/s6/weather",
      data: param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        app.globalData.weatherData = res.data.HeWeather6[0].status == "unknown city" ? "" : res.data.HeWeather6[0];
        var weatherData = app.globalData.weatherData ? app.globalData.weatherData.now : "暂无该城市天气信息";
        var dress = app.globalData.weatherData ? res.data.HeWeather6[0].lifestyle[1] : { txt: "暂无该城市天气信息" };
        that.setData({
          weatherData: weatherData, //今天天气情况数组 
          dress: dress, //生活指数
          dateLists:res.data.HeWeather6[0].daily_forecast,
          tag: res.data.HeWeather6[0].now,
        });
      }
    })
  },
  //定位当前城市
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        //当前的经度和纬度
        //console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${app.globalData.tencentMapKey}`,
          success: res => {
            console.log(res)
            app.globalData.defaultCity = app.globalData.defaultCity ? app.globalData.defaultCity : res.data.result.ad_info.city;
            app.globalData.defaultCounty = app.globalData.defaultCounty ? app.globalData.defaultCounty : res.data.result.ad_info.district;
            that.setData({
              location: app.globalData.defaultCity + app.globalData.defaultCounty,
            });
            that.setData({
              city: app.globalData.defaultCity,
            });
            that.getWeather();
            //that.getAir();
          }
        })
      }
    })
  },
  //切换当前城市
  switchCity(){
    console.log(1111)
    wx.reLaunch({ //此处不能用navigateTo，否则返回来时页面信息不会重新渲染
      url: '../switchCity/switchCity'
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
  GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    var h = dd.getHours();
    var mi = dd.getMinutes();

    return y + "/" + m + "/" + d ;
  }
})