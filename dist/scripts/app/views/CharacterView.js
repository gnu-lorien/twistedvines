define(["jquery","backbone","../views/CharacterListItem"],function(e,t,i){var n=t.View.extend({initialize:function(){_.bindAll(this,"scroll_back_after_page_change")},scroll_back_after_page_change:function(){var t=this;e(document).one("pagechange",function(){var i=_.parseInt(t.backToTop);e.mobile.silentScroll(i),t.backToTop=0})},render:function(){return this.template=_.template(e("script#characterView").html())({character:this.model}),this.$el.find("div[role='main']").html(this.template),this.subview=this.subview||new i(this.model),this.subview.character=this.model,this.$el.find("div#insertheader").append(this.subview.render().el),this.$el.enhanceWithin(),this}});return n});