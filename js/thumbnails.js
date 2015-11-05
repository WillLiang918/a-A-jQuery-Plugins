"use strict";

$.Thumbnails = function (el) {
  this.$el = $(el);
  this.bindHandlers();
  this.gutterIdx = 0;
  this.numItems = this.$el.find(".gutter-images ul").children().length;
  debugger

  this.$images = this.$el.find(".gutter-images img");
  this.fillGutterImages();

  this.activeImg = $(this.$images[this.gutterIdx]);
  this.activate(this.activeImg);
};

$.Thumbnails.prototype.fillGutterImages = function() {
  var gutterList = this.$el.find(".gutter-images ul").empty();
  this.$images.slice(this.gutterIdx, this.gutterIdx + 4).each(function(){
    gutterList.append($(this));
  });
};

$.Thumbnails.prototype.bindHandlers = function() {
  this.$el.on("click", "img", this.handleClick.bind(this));
  this.$el.on("mouseenter", "img", this.mouseEnter.bind(this));
  this.$el.on("mouseleave", "img", this.mouseLeave.bind(this));
  this.$el.find(".left-button").on("click", this.shiftLeft.bind(this))
  this.$el.find(".right-button").on("click", this.shiftRight.bind(this))
}
$.Thumbnails.prototype.mouseEnter = function(event){
  this.activate($(event.target));
};

$.Thumbnails.prototype.mouseLeave = function(event){
  this.activate(this.activeImg);
};

$.Thumbnails.prototype.handleClick = function(event) {
  var target = $(event.target);
  this.activeImg = target;
  this.activate(target);
};

$.Thumbnails.prototype.shiftLeft = function(event) {
  this.gutterIdx -= 1;
  if (this.gutterIdx < 0) {
    this.gutterIdx = 0;
  }
  this.fillGutterImages();
}

$.Thumbnails.prototype.shiftRight = function(event) {
  this.gutterIdx = (this.gutterIdx + 1);
  if (this.gutterIdx > this.numItems - 4) {
    this.gutterIdx -= 1;
  }
  this.fillGutterImages();
}

$.Thumbnails.prototype.activate = function($img){
  this.$el.find(".active").empty();
  this.$el.find(".active").append($img.clone());
};


$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
