/* by D & mr.h
   copyright
*/

//index文件夹下，非同名的文件都是用来处理字符串的，目的是将txt文本转化为wxml文件，方便处理
//index.js
//获取应用实例
//引用文件暴露的接口
var Parser = require("dom-parser.js")
var txtdata = require("txtdata.js")

var app = getApp();
//获取文件中的数据
var xml = txtdata.getData();
//实例化字符串处理对象
var XMLParser = new Parser.DOMParser();
var doc;
//对话计数器
var num = 0;
//头像计数器
var touxiangIndex="";
var restTouxiangIndex=0;
//临时变量
var tempName;
//音乐播放开关
var label=0;


Page({
  data: {
    //获取用户信息
    userInfo:null,
    //对话列表
    mesArray:[],
    //动态获取屏幕高度
    scrollTop: 0,
    //音乐播放api
    src:null,
    src1: 'http://ws.stream.qqmusic.qq.com/1512837.m4a?fromtag=46',
    src2: 'http://ws.stream.qqmusic.qq.com/1512837.m4a?fromtag=46',
    src3: 'http://ws.stream.qqmusic.qq.com/1492809.m4a?fromtag=46',
    src4: 'http://ws.stream.qqmusic.qq.com/2378289.m4a?fromtag=46',
    src5: 'http://ws.stream.qqmusic.qq.com/105159993.m4a?fromtag=46',
  },
  
  onLoad: function (event) {
    //每次加载页面，从剧本的第一句开始计数
    num=0;
    //每次开始默认音乐关闭
    label=0;
    //临时变量，用来显示headline
    var headLine;
    //获取对应的剧本内容
    doc = XMLParser.parseFromString(xml[event.id-1]);
    if(event.id==1){
      headLine="哈姆雷特",
      //不同的剧本播放不同的音乐
      this.setData({src:this.data.src3})
    }
    if (event.id == 2){
      headLine = "爱情公寓第六集（上）",
      this.setData({src:this.data.src1})
    }
    if (event.id == 3){
      headLine = "爱情公寓第六集（下）",
        this.setData({src:this.data.src2})
    }
    if (event.id == 4){
      headLine = "第十二夜剧本",
      this.setData({src:this.data.src4})
    }
    if (event.id == 5){
      headLine = "人质",
        this.setData({ src: this.data.src5})
    }
    wx.setNavigationBarTitle({
      title: headLine
    })
    var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
        //更新数据
        that.setData({
          userInfo:userInfo
        })
      })
  },
  onShow:function(){
   
   
  },

  onReady:function(){
    //绑定变量和控件，开发过android或其他应用的同学应该懂
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  // 点击事件
  sendMes:function(){
    if(label==0){
      //打开播放器
      this.audioCtx.play();
      label=1;
    }
    //字符串处理
    var strArray =[];
    //获取所有标签为text的内容
    var userIdElement = doc.getElementsByTagName('text');
    //若未到达文末，且当前读到的内容为空，则读下一条
    while ((num < userIdElement.length)&&(!userIdElement[num].firstChild)){
      num++;
    }
    //如果已到文末，则回到主界面
    if (num == userIdElement.length){
      wx.navigateTo({
        url: '../main/main',
      })
      //关闭音乐
      this.audioCtx.pause();
    }
    //对读到的有效字符串进行处理分类，并返回一个数组，里面存储有处理结果
    strArray=processString(userIdElement[num].firstChild.nodeValue);
    var oriMesArr=this.data.mesArray;
    var newMes;
    var Type;
    var nickname="";
    var avatarurl;
    //读到的字符串属于第一类，为标题泪
    if (strArray[0]==1){
      //设置类型
      Type = "biaoti"  //是标题
      //设置内容
      newMes = strArray[1]
      //设置头像路径
      avatarurl=""
    }
    else{
      //读到的字符串属于第二类，为对话主体内容
      if (strArray[0]==2){
        Type = "youItem"  //是对话
        //设置人物名称
        tempName=nickname;
        nickname = strArray[1]
        //设置内容
        newMes = strArray[2]
        //设置头像路径
          touxiangIndex=touxiangDeal(nickname);
          if (touxiangIndex==""){
            restTouxiangIndex = (restTouxiangIndex)%7
            touxiangIndex=restTouxiangDeal(restTouxiangIndex);
            if (tempName!=nickname)
               restTouxiangIndex++;

          }
        avatarurl = "../../image/" + touxiangIndex+".jpg"
      }
      else{
        //读到的字符串属于第三类，属于标题类
        Type = "pangbai"  //是旁白
        newMes = strArray[1]
        avatarurl=""
      }
    }
    //设置人物信息
    var peopleInfo={
      nickName:nickname, avatarUrl:avatarurl
    }
    //创建一个列表元素
        var youNewMes={
        mesType:Type,
                      mesitem:{
                        userInfo: peopleInfo,//头像,还要加上name并        用不同颜色表示
                        mes:newMes,                //新消息
                        
                      },
                    };
      //将创建元素加入列表
      oriMesArr.push(youNewMes);
      this.setData({mesArray:oriMesArr});
      //计数器加一
      num++;
      //每次屏幕下移1000rpx
      this.setData({
        scrollTop: this.data.scrollTop + 1000    //为了移到最下方，所以加一个比较大的值
      });
      
    
  }

},

)
function processString(str) {
  var strClass = []
  //判断为标题类
  if (str.indexOf("【") != -1) {
    var arrayLimited = str.split("【", 2)
    arrayLimited = arrayLimited[1].split("】")
    strClass[0] = 1; //字符串类别1：场景
    strClass[1] = arrayLimited;//场景内容
  }
  //判断为对话内容弄个
  else if (str.indexOf("：") != -1) {

    var arrayLimited = str.split("：", 2)
    strClass[0] = 2;     //字符串类别2：对话
    strClass[1] = arrayLimited[0];//对话人
    strClass[2] = arrayLimited[1];//对话内容

  }
  //判断为中间旁白
  else {
    strClass[0] = 3; //字符串类别3：画外音
    strClass[1] = str;
  }
  //返回处理结果
  return strClass
}
//根据名称分配头像
function touxiangDeal(str){
  if (str=="吕子乔")
  return "one";
  if (str == "张伟")
    return "two";
  if (str == "曾小贤")
    return "three";
  if (str == "关谷")
    return "four";
  if (str == "秦羽墨")
    return "zero";
  if (str == "胡一菲")
    return "five";
  if (str == "Joy")
    return "six";
  return "";
}
//根据名称分配头像2
function restTouxiangDeal(num){
  if(num==0)
    return "zero";
  if (num == 1)
    return "one";
  if (num == 2)
    return "two";
  if (num == 3)
    return "three";
  if (num == 4)
    return "four";
  if (num == 5)
    return "five";
  if (num == 6)
    return "six";

}
