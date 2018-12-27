var util = require('../util/util.js')
class DBCartoon {
  constructor(decade,cartoonId) {
    this.storageKeyName = 'cartoon'+decade;
    this.decade = decade;
    this.cartoonId = cartoonId;
  }

  getAllCartoonData() {
    var res = wx.getStorageSync(this.storageKeyName);
    var decade = this.decade;
    if (!res) {
      switch(decade){
        case 70:
          res = require('../data70/data70.js').cartoon70;
          break;
        case 79:
          res = require('../data79/data79.js').cartoon79;
          break;
        case 89:
          res = require('../data89/data89.js').cartoon89;
          break;
        case 99:
          res = require('../data99/data99.js').cartoon99;
          break;
        case 0:
          res = require('../data00/data00.js').cartoon0;
      }
      this.execSetStorageSync(res);
    }
    return res;
  }

  //本地缓存，保存/更新
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  // 获取指定id号的文章数据
  getCartoonItemById() {
    var cartoonsData = this.getAllCartoonData();
    var len = cartoonsData.length;
    for (var i = 0; i < len; i++) {
      if (cartoonsData[i].cartoonId == this.cartoonId) {
        return {
          index: i,
          data: cartoonsData[i]
        }
      }
    }
  }
  //更新本地的点赞、评论信息、收藏、阅读量
  updateCartoonData(category,newComment) {
    var that = this;
    var itemData = that.getCartoonItemById(),
      cartoonData = itemData.data,
      allCartoonData = that.getAllCartoonData();
    switch (category) {
      case 'collect':
        //处理收藏
        if (!cartoonData.collectionStatus) {
          //如果当前状态是未收藏
          cartoonData.collectionNum++;
          cartoonData.collectionStatus = true;
        } else {
          cartoonData.collectionNum--;
          cartoonData.collectionStatus = false;
        }
        break;
      case 'up':
        //文章点赞功能
        if (!cartoonData.upStatus) {
          //如果当前状态是未收藏
          cartoonData.upNum++;
          cartoonData.upStatus = true;
        } else {
          cartoonData.upNum--;
          cartoonData.upStatus = false;
        }
        break;
      case 'comment':
        cartoonData.comments.push(newComment);
        cartoonData.commentNum++;
        break;
      case 'reading':
        cartoonData.readingNum++;
        break;
      default:
        break;
    }
    //更新缓存数据库
    allCartoonData[itemData.index] = cartoonData;
    that.execSetStorageSync(allCartoonData);
    return cartoonData;
  }

  //收藏文章
  collect() {
    return this.updateCartoonData('collect');
  }

  //点赞或取消点赞
  up() {
    var data = this.updateCartoonData('up');
    return data;
  }
  newComment(newComment) {
    this.updateCartoonData('comment', newComment);
  }

  //阅读数+1
  addReadingTimes() {
    this.updateCartoonData('reading');
  }
  //获取文章的评论数据
  getCommentData() {
    var itemData = this.getCartoonItemById().data;
    itemData.comments.sort(this.compareWithTime); //按时间降序
    var len = itemData.comments.length,comment;
    for (var i = 0; i < len; i++) {
      // 将comment中的时间戳转换成可阅读格式
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }
  compareWithTime(value1, value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if (flag < 0) {
      return 1;
    } else if (flag > 0) {
      return -1
    } else {
      return 0;
    }
  }
};

export { DBCartoon }