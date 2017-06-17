var app = getApp();
var utils = require("../../utils/utils.js");
Page({
  data: {
    onShow: {},
    comingShow: {},
    topShow: {},
    focus:false,
    searchResult:{}
    //这个地方searchResult必须加，否则会报错，但是不影响运行效果，原因是searchResult这个不加的话，在第一次触发input的焦点的时候拿不到数据，就会报错。
    // "searchPageShow": false,
    // "currentPageShow": true
    // 这个地方必须赋予onshow这些属性加初始值，虽然不写，后面会自动加上上，但是不写页面初始化拿不到这几个属性，原因在于后面的方法是异步的，很大可能在页面拿绑定的数据之前根本没有异步加载好
  },
  onLoad: function (options) {
    var onShow = app.global_data.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingShow = app.global_data.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var topShow = app.global_data.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMovieListData(onShow, "onShow", "正在热映");
    this.getMovieListData(comingShow, "comingShow", "即将上映");
    this.getMovieListData(topShow, "topShow", "豆瓣top250");
  },
  moreTap: function (event) {
    wx.navigateTo({
      url: '/pages/movies/more-movies/more-movies?category=' + event.currentTarget.dataset.category
    })
  },
  getMovieListData: function (url, dic, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET', 
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processData(res.data, dic, categoryTitle);
      },
      fail: function () {
      },
      complete: function () {

      }
    })
  },
  processData: function (data, dic, categoryTitle) {
    var movies = [];
    var subjects = data.subjects;
    for (var index in subjects) {
      var movieId = subjects[index].id;
      var movieImg = subjects[index].images.large;
      var movieAverage = subjects[index].rating.average;
      var movieTitle = subjects[index].title;
      var stars = utils.starsOperation(subjects[index].rating.stars);
      if (movieTitle.length > 6) {
        movieTitle = movieTitle.substring(0, 6) + "...";
      }
      var temp = {
        movieId: movieId,
        movieImg: movieImg,
        movieAverage: movieAverage,
        stars: stars,
        movieTitle: movieTitle
      }
      movies.push(temp);
    }
    var moviesList = {};
    moviesList[dic] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(moviesList);
  },
  onFocus: function (event) {
    this.setData({
      focus:true
      //"searchPageShow": true,
      // "currentPageShow": false
    })
  },
  blurFocus: function (event) {
    var inputContent = event.detail.value;
    var url = app.global_data.doubanBase + "/v2/movie/search?q=" + inputContent;
    this.getMovieListData(url, "searchResult", "searchResult");
  },
  cancelTap: function (event) {
    this.setData({
      focus:false
      //"searchPageShow": false,
      // "currentPageShow": true
    })
  },
  movieTap:function(event){
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id='+event.currentTarget.dataset.id
    })
  }
})