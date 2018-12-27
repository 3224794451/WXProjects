import { DBCartoon } from '../../../db/DBCartoon.js';

Page({
  data: {
  },
  onLoad: function (options) {
    var dbCartoon = new DBCartoon(0);
    this.setData({
      cartoon0: dbCartoon.getAllCartoonData()
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