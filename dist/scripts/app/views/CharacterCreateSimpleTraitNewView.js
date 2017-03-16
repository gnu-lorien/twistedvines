define(["jquery","backbone","parse","../models/SimpleTrait","../collections/DescriptionCollection","../models/Description","../collections/BNSMETV1_ClanRules"],function(e,t,i,c,n,a,r){var l=t.View.extend({initialize:function(){_.bindAll(this,"register","update_collection_query_and_fetch")},switch_character_category_listening:function(){var e=this;e.character&&(e.stopListening(e.character),e.listenTo(e.character,"change:"+e.category,e.render))},register:function(e,t,i,c,a,r){var l=this,o=!1,c=c||"#simpletrait/<%= self.category %>/<%= self.character.id %>/<%= b.linkId() %>",r=r||"#simpletrait/specialize/<%= self.category %>/<%= self.character.id %>/<%= b.linkId() %>";return c!=_&&c!=l.redirect&&(l.redirect=_.template(c),o=!0),r!=_&&r!=l.specializationRedirect&&(l.specializationRedirect=_.template(r)),l.filterRule!==a&&(_.isString(a)?l.filterRule=[a]:l.filterRule=a,change=!0),i!==l.free_value&&i!=_&&(l.free_value=i,o=!0),e!==l.character&&(l.character&&l.stopListening(l.character),l.character=e,l.listenTo(l.character,"change:"+t,l.render),o=!0),t!=l.category&&(l.category=t,l.switch_character_category_listening(),l.collection&&l.stopListening(l.collection),l.collection=new n,l.listenTo(l.collection,"add",l.render),l.listenTo(l.collection,"reset",l.render),l.update_collection_query_and_fetch(),o=!0),o?l.render():l},update_collection_query_and_fetch:function(){var e=this,t=new i.Query(a);t.equalTo("category",e.category).addAscending(["order","name"]).limit(1e3),e.collection.query=t,e.collection.fetch({reset:!0})},render:function(){var t,i=this;i.requireSpecializations=_.chain(i.collection.models).select(function(e){return"requires_specialization"==e.get("requirement")}).pluck("attributes").pluck("name").value();var c=_(i.character.get(i.category)).pluck("attributes").pluck("name").without(i.requireSpecializations).value();if(_.contains(i.filterRule,"in clan disciplines")){var n=_.without(i.character.get_in_clan_disciplines(),void 0);t=_.chain(i.collection.models),0!=n.length&&(t=t.select(function(e){return!_.contains(c,e.get("name"))&&!!_.contains(n,e.get("name"))})),t=t.value()}else if(_.contains(i.filterRule,"affinity")){var n=_.without(i.character.get_affinities(),void 0);t=_.chain(i.collection.models),0!=n.length&&(t=t.select(function(e){return!_.contains(c,e.get("name"))&&_.some(_.map(_.range(1,4),function(t){return!!_.contains(n,e.get("affinity_"+t))}))})),t=t.value()}else t=_.chain(i.collection.models).select(function(e){return!_.contains(c,e.get("name"))}).value();return _.contains(i.filterRule,"show_only_value_1")&&(t=_.select(t,function(e){return 1==e.get("value")})),this.template=_.template(e("script#simpletraitcategoryDescriptionItems").html())({collection:t,character:this.character,category:this.category,free_value:this.free_value}),this.$el.find("div[role='main']").html(this.template),this.$el.enhanceWithin(),this},events:{"click .simpletrait":"clicked"},clicked:function(t){var i=this;e.mobile.loading("show");var c=e(t.target).attr("backendId"),n=i.collection.get(c),a=_.parseInt(n.get("value")),r=i.free_value;return a&&(r=a),i.character.update_trait(e(t.target).attr("name"),r,i.category,i.free_value).done(function(e){_.contains(i.requireSpecializations,e.get("name"))?window.location.hash=i.specializationRedirect({self:i,b:e}):window.location.hash=i.redirect({self:i,b:e})}).fail(function(e){console.log(e.message)}),!1}});return l});