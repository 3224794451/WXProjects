Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioValues: [
      { 'value': '70以前', 'selected': false },
      { 'value': '70年代', 'selected': false }, 
      { 'value': '80年代', 'selected': false },
      { 'value': '90年代', 'selected': false },
      { 'value': '新世纪', 'selected': false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.clazzStatus();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  indexChanged: function (e) {
    var index = e.target.dataset.index;
    var radioValues = this.data.radioValues;
    for (var i = 0; i < radioValues.length; i++) {
      radioValues[i].selected = false;
    }
    radioValues[index].selected = true;
    this.setData({ radioValues: radioValues });
    this.clazzStatus();
  },

  clazzStatus: function () {
    var clazz = [];
    var radioValues = this.data.radioValues;
    for (var i = 0; i < radioValues.length; i++) {
      var cls = '';
      if (radioValues[i].selected) {
        cls += 'selected ';
      }
      if (i == radioValues.length - 1) {
        cls += 'last ';
      }
      cls = cls.replace(/(\s*$)/g, '');
      clazz[i] = cls;
    }
    this.setData({ clazz: clazz });
  },
  onTapJump: function(options){
    var index = options.target.dataset.index;
    switch(index){
      case 0:
        wx.switchTab({
          url: "../cartoon/cartoon-70/cartoon-70",
        });
        break;
      case 1:
        wx.switchTab({
          url: "../cartoon/cartoon-70-79/cartoon-70-79",
        });
        break;
      case 2:
        wx.switchTab({
          url: "../cartoon/cartoon-80-89/cartoon-80-89",
        });
        break;
      case 3:
        wx.switchTab({
          url: "../cartoon/cartoon-90-99/cartoon-90-99",
        });
        break;
      case 4:
        wx.switchTab({
          url: "../cartoon/cartoon-00/cartoon-00",
        });
    }
  }
})