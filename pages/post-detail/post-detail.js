var postsData = require("../../data/posts_data.js");
var g_data = getApp();
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    // this.setData({currentpostId:postId});
    var postData = postsData.postList[postId];
    this.setData(postData);
    //这段代码的数据结构是是
    // {
    // 1:…………
    // 2:…………
    // }
    var isPlayingMusic = false;
    this.setData({ isPlayingMusic: isPlayingMusic });
    this.collection_init(postId)
    this.music_oper(postId, isPlayingMusic);//调用函数记得加this
  },
  collection_init(postId) {
    var collectionStates = wx.getStorageSync('collectionStates');
    if (!collectionStates) {
      wx.setStorageSync('collectionStates', {});
      collectionStates = wx.getStorageSync('collectionStates');
      var currentId = postId;
      var collectionBool = collectionStates[currentId];
      this.setData({ collectIcon: collectionBool });
    }
    else {
      collectionStates = wx.getStorageSync('collectionStates');
      var currentId = postId;
      var collectionBool = collectionStates[currentId];
      this.setData({ collectIcon: collectionBool });
    }
  },
  music_oper: function (postId, isPlayingMusic) {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      var isPlayingMusic = true;
      that.setData({ isPlayingMusic: isPlayingMusic });
      g_data.global_data.g_isPlayingMusic = true;
      g_data.global_data.currentMusicId = postId;
    })
    wx.onBackgroundAudioPause(function () {
      var isPlayingMusic = false;
      that.setData({ isPlayingMusic: isPlayingMusic });
      g_data.global_data.g_isPlayingMusic = false;
      g_data.global_data.currentMusicId = null;
    })
    wx.onBackgroundAudioStop(function() {
      var isPlayingMusic = false;
      that.setData({ isPlayingMusic: isPlayingMusic });
      g_data.global_data.g_isPlayingMusic = false;
      g_data.global_data.currentMusicId = null;
    })
    this.music_exit(postId, isPlayingMusic);
  },
  music_exit: function (postId, isPlayingMusic, ) {
    var g_isPlayingMusic = g_data.global_data.g_isPlayingMusic;
    if (g_isPlayingMusic && g_data.global_data.currentMusicId == postId) {
      isPlayingMusic = g_isPlayingMusic;
      this.setData({ isPlayingMusic: isPlayingMusic });
    }
  },
  collectionTap: function () {
    var collectionStates = wx.getStorageSync('collectionStates');
    var currentId = this.data.postId;
    var collectionBool = !(collectionStates[currentId]);
    collectionStates[currentId] = collectionBool;
    wx.setStorageSync('collectionStates', collectionStates);
    this.setData({ collectIcon: collectionBool });
    wx.showToast({
      icon: "success",
      duration: 1500,
      title: collectionBool ? "收藏成功" : "取消成功"
    })
  },
  shareTap: function () {
    var item_list = [
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: item_list,
      itemColor: "#405f80",
      success: function (res) {
        var that = this;
        //res.cancel用户点击了取消
        //res.tapIndex用户点击的数组元素序号，从零开始
        if (res.tapIndex >= 0) {
          wx.showModal(
            {
              title: "用户" + item_list[res.tapIndex],
              content: "同步功能暂时无法使用"
            }
          )
        }
        else {
          wx.showModal(
            {
              title: "用户",
              content: "同步功能暂时无法使用"
            }
          )
        }
      }
    })
  },
  musicTap: function () {
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      isPlayingMusic = !isPlayingMusic;
      this.setData({ isPlayingMusic: isPlayingMusic });
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: this.data.music.url,
        title: this.data.music.title,
        coverImgUrl: this.data.music.coverImg
      })
      isPlayingMusic = !isPlayingMusic;
      this.setData({ isPlayingMusic: isPlayingMusic });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
    // var collectionStates = wx.getStorageSync('collectionStates');
    // var collectionBool = false;
    // if (!collectionStates) {
    //   collectionState = {
    //     collectionState:collectionBool
    //   }
    //   wx.setStorageSync('collectionStates', new Array());
    //   var collectionStates = wx.getStorageSync('collectionStates');
    //   collectionBool = collectionStates[postId].collectionState;
    //   if(!collectionBool)
    //   {
    //     collectionBool=false;
    //   }
    //   this.setData({collectiondata:collectionStates});
    // }
    // else {
    //   collectionBool=collectionStates[postId].collectionState;
    //   collectionStates[postId].collectionState=collectionBool;
    //   this.setData({collectiondata:collectionStates});
    // }这是一段对于数据结构设计过于复杂的解决方案，语法过于复杂，数据应该优先，数据的结构决定代码的写法。
    // 这段代码的数据模型{{state：}，{state：}，…………}}
    // showmodle:function (collectionBool,collectionStates)
    // {   
    //   var that = this;
    // wx.showModal({
    //   title:"收藏",
    //   content:collectionBool?"收藏该文章":"取消收藏该文章",
    //   showCancel:"true",
    //   cancelText:"取消",
    //   cancleColor:"#333",
    //   confirmText:"确认",
    //   confirmColor:"#405f80",
    //   success:function(res)
    //   {
    //     if(res.confirm)
    //     {
    //       wx.setStorageSync('collectionStates', collectionStates);
    //       that.data({
    //          collectIcon: collectionBool
    //       })
    //     }
    //   }
    // })


    // }