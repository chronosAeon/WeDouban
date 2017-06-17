//这个地方只能用相对路径，应该是个bug
var postsData = require('../../data/posts_data.js');

Page({
  data:{
  },
  onLoad:function(options){
    this.setData({
      contentkey:postsData.postList
      });
      
  },
  onPostTap:function(event)
  {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../post-detail/post-detail?id='+postId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  swiperTap:function(event)
  {
    var postId = event.target.dataset.postid;
    // 这里之所以用target而不是currentTarget是因为在wxml里面是运用了事件冒泡机制，currentTarget就表示swiper组件，而自定义的属性是在swiper-item里面，所以这里用target
    wx.navigateTo({
      url: '../post-detail/post-detail?id='+postId,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})