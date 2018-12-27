import { DBCartoon } from '../../../db/DBCartoon.js';

Page({
  data: {
  },
  onLoad: function (options) {
    var dbCartoon = new DBCartoon(89);
    this.setData({
      cartoon89: dbCartoon.getAllCartoonData()
    });
  },

  onTapToDetail(event) {
    var decade = event.currentTarget.dataset.decade;
    var cartoonId = event.currentTarget.dataset.cartoonId;
    wx.navigateTo({
      url: '../cartoon-detail/cartoon-detail?decade=' + decade + '&id=' + cartoonId
    });
  }
})