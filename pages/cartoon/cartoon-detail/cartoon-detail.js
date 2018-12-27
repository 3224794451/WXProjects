import { DBCartoon } from '../../../db/DBCartoon.js';
var app = getApp();

Page({
  data: {
  },
  onLoad: function (options) {
    var decade = options.decade;
    var cartoonId = options.id;
    this.dbCartoon = new DBCartoon(decade,cartoonId);
    this.cartoonData = this.dbCartoon.getCartoonItemById().data;
    this.setData({
      cartoon: this.cartoonData
    })
    this.addReadingTimes();
    this.setAniation();
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.cartoonData.title
    })
  },

  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },

  onCollectionTap: function (event) {
    var newData = this.dbCartoon.collect();
    this.setData({
      'cartoon.collectionStatus': newData.collectionStatus,
      'cartoon.collectionNum': newData.collectionNum
    })

    // 交互反馈
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  onUpTap: function (event) {
    var newData = this.dbCartoon.up();
    this.setData({
      'cartoon.upStatus': newData.upStatus,
      'cartoon.upNum': newData.upNum
    }),

      this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
  },

  onCommentTap: function (event) {
    var decade = event.currentTarget.dataset.decade;
    var id = event.currentTarget.dataset.cartoonId;
    wx.navigateTo({
      url: '../cartoon-comment/cartoon-comment?decade=' + decade + '&id=' + id
    })
  },

  //阅读量+1
  addReadingTimes: function () {
    this.dbCartoon.addReadingTimes();
  },

  onShareAppMessage: function () {
    return {
      title: this.cartoonData.title,
      desc: this.cartoonData.content,
      path: "/pages/cartoon/cartoon-detail/cartoon-detail"
    }
  }
})