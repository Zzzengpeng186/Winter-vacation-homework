// pages/cate/cate.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 分类列表数据
    catedata: [],
    // 分类商品数据
    catelist: [],
    // 被点击左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条
    scrollTop: 0,
  },
  // 获取分类数据
  handleCatedataGet(index) {
    var _this = this;
    wx.request({
      url: "https://www.uinav.com/api/public/v1/categories",
      method: "get",
      success: function (res) {
        // console.log(res.data.message);
        let cateindex = res.data.message[index].children;
        _this.setData({
          catedata: res.data.message,
          catelist: cateindex,
        });
      },
    });
  },
  // 左侧菜单点击
  handelCateClick(e) {
    /**
     * 1. 获取被点击的标题的索引
     * 2. 给data中的currentIndex赋值
     */
    var index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
      scrollTop: 0,
    });
    this.handleCatedataGet(index);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.handleCatedataGet(0);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
});
