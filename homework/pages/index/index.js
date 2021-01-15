// index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 800, //滑动动画时长
    circular: true, //是否采用无限轮播
    imgUrls: [], //轮播图图片路径
    catedata: [], // 分类数据
    floordata: [], // 获取首页楼层数据
  },

  // 获取轮播图图片
  swiperData() {
    var _this = this;
    wx.request({
      url: "https://www.uinav.com/api/public/v1/home/swiperdata",
      method: "get",
      success: function (res) {
        // console.log(res),
        _this.setData({
          imgUrls: res.data.message,
        });
      },
    });
  },

  // 获取分类数据
  cateData() {
    var _this = this;
    wx.request({
      url: "https://www.uinav.com/api/public/v1/home/catitems",
      method: "get",
      success: function (res) {
        _this.setData({
          catedata: res.data.message,
        });
      },
    });
  },
  
  // 获取首页楼层数据
  floordata() {
    var _this = this;

    wx.request({
      url: "https://www.uinav.com/api/public/v1/home/floordata",
      method: "get",
      success: function (res) {
        _this.setData({
          floordata: res.data.message,
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.swiperData();
    this.cateData();
    this.floordata();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
