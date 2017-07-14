
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topnews: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 
    
  },

  //跳转进所点击的页面
  click1:function(){

    wx.navigateTo({
      url: '../index/index?id=1',
    })
  },
  click2: function () {

    wx.navigateTo({
      url: '../index/index?id=2',
    })
  },
  click3: function () {

    wx.navigateTo({
      url: '../index/index?id=3',
    })
  },
  click4: function () {

    wx.navigateTo({
      url: '../index/index?id=4',
    })
  },
  click5: function () {

    wx.navigateTo({
      url: '../index/index?id=5',
    })
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
    
  }
})