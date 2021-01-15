// pages/goods_list/goods_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    GoodsListData: [], // 商品列表数据
    goodsData: [], //商品列表分页数据
    queryParams: {
      query: "", //
      cid: "", // 商品ID
      pagenum: 1, // 页码
      pagesize: 20, // 页面数量
      total: 0, // 总数量
      totalPages: 0, // 总页数
    },
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true,
      },
      {
        id: 1,
        value: "销量",
        isActive: false,
      },
      {
        id: 2,
        value: "价格",
        isActive: false,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "queryParams.cid": options.cid,
    });
    this.handleGoodsListGet();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.queryParams.pagenum >= this.data.queryParams.totalPages) {
      console.log("没有下一页了");
    } else {
      this.data.queryParams.pagenum++;
      this.handleGoodsListGet();
    }
  },
  // 下拉刷新事件
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 1 重置数组
    this.setData({
      GoodsListData: [],
    });
    // 2 重置页码
    this.data.queryParams.pagenum = 1;
    // 3 发送请求
    this.handleGoodsListGet();
  },

  // 获取商品数据
  handleGoodsListGet() {
    var _this = this;
    wx.request({
      url: "https://www.uinav.com/api/public/v1/goods/search",
      data: {
        query: _this.data.queryParams.query,
        cid: _this.data.queryParams.cid,
        pagenum: _this.data.queryParams.pagenum,
        pagesize: _this.data.queryParams.pagesize,
      },
      method: "get",
      success: function (res) {
        if (
          _this.data.queryParams.pagenum > 1 &&
          _this.data.goodsData.length < _this.data.queryParams.total
        ) {
          _this.data.goodsData.push(..._this.data.GoodsListData);
        }
        _this.setData({
          GoodsListData: [..._this.data.goodsData, ...res.data.message.goods],
          "queryParams.total": res.data.message.total,
        });
        _this.data.queryParams.totalPages = Math.ceil(
          _this.data.queryParams.total / _this.data.queryParams.pagesize
        );
      },
    });
  },
  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // 1 获取被点击的标题索引
    const { index } = e.detail;
    // 2 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    // 3 赋值到data中
    this.setData({
      tabs,
    });
  },
});
