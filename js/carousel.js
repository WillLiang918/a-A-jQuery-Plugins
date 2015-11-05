"use strict";

$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.numItems = this.$el.find(".items").children().length;
  this.setAttrs();
  this.transitioning = false;

  this.bindEvents();
};

$.Carousel.prototype.setAttrs = function () {
  this.activeEl().addClass("active");
  this.leftEl().addClass("active left");
  this.rightEl().addClass("active right");
};

$.Carousel.prototype.clearAttrs = function () {
  this.$el.find(".active").removeClass("active left right");
};

$.Carousel.prototype.bindEvents = function () {
  this.$el.find(".slide-left").on("click", this.handleClick.bind(this,"left"));
  this.$el.find(".slide-right").on("click", this.handleClick.bind(this,"right"));
};

$.Carousel.prototype.handleClick = function(dir, event){
  if (!this.transitioning) {
    this.clearAttrs();
    dir === "left" ? this.handleClickLeft(event) : this.handleClickRight(event);
    this.setAttrs();
    this.transitioning = true;
    this.$el.find(".items").on("transitionend", function() {
      this.transitioning = false;
    }.bind(this));
  }
};

$.Carousel.prototype.handleClickLeft = function(event){
  if (this.activeIdx === 0) {
      this.activeIdx = this.numItems - 1;
  } else {
    this.activeIdx -= 1;
  }
};

$.Carousel.prototype.handleClickRight = function(event){
  if (this.activeIdx === this.numItems - 1) {
      this.activeIdx = 0;
  } else {
    this.activeIdx += 1;
  }
};

$.Carousel.prototype.activeEl = function(){
  return this.$el.find(".items").find("li").eq(this.activeIdx);
};

$.Carousel.prototype.leftEl = function(){
  return this.$el.find(".items").find("li").eq(this.activeIdx - 1);
};

$.Carousel.prototype.rightEl = function(){
  var idx = (this.activeIdx + 1) % this.numItems;
  return this.$el.find(".items").find("li").eq(idx);
};


$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
