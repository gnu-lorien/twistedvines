define(["jquery","backbone","marionette","../views/PatronageListView"],function(i,e,n,t){var o=n.CollectionView.extend({childView:t,initialize:function(i){this.options=i},childViewOptions:function(){var i=this;return{back_url_base:i.options.back_url_base}}});return o});