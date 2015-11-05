"use strict";

$.Tabs = function (el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.data().contentTabs["Location"]);
  this.activeTab = this.$el.find(".active");

  this.$el.on("click", this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function(event) {
  var target = $(event.target);
  //find active article
  var activeSection = this.$contentTabs.find(this.activeTab.attr("href"));

  //remove active class from previously active tab
  this.activeTab.removeClass("active");
  target.addClass("active");
  this.activeTab = target;
  activeSection.removeClass("active");
  activeSection.addClass("transitioning");

    // debugger
  activeSection.one("transitionend", function(){
    activeSection.removeClass("transitioning");


    //find new active article and add active class
    activeSection = this.$contentTabs.find(this.activeTab.attr("href"));
    activeSection.addClass("transitioning active");
    setTimeout( function() {
      activeSection.removeClass("transitioning");
    },0);

  }.bind(this));
}


$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
