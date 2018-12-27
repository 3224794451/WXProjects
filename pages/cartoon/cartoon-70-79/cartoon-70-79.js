import { DBCartoon } from '../../../db/DBCartoon.js';

Page({
  data: {
  },
  onLoad: function () {
    var dbCartoon = new DBCartoon(79);
    this.setData({
      cartoon79: dbCartoon.getAllCartoonData()
    });
  },

  onTapToDetail(event) {
    var decade = event.currentTarget.dataset.decade;
    var cartoonId = event.currentTarget.dataset.cartoonId;
    wx.navigateTo({
      url: '../cartoon-detail/cartoon-detail?decade='+decade+'&id='+cartoonId
    });
  }
})