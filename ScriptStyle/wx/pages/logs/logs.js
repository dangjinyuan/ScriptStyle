//logs.js
//测试页面
var util = require('../../utils/util.js')
Page({
    data: {
      poster: '../../image/zero.jpg',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/1512837.m4a?fromtag=46',
    },
  onLoad: function () {
    this.audioCtx.play();
  },
  onReady:function(e){
    this.audioCtx = wx.createAudioContext('myAudio');
  },
  onunload:function(){
    

  },

  onShow:function(){
    
  },
  begin:function(){
    this.audioCtx.play();
  },
  end:function(){
    this.audioCtx.pause();
  }
})
