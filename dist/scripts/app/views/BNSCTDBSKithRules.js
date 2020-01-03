define(["underscore","jquery","backbone","parse","text!../templates/character-summarize-list-item.html","marionette","backform","text!../templates/character-summarize-list-item-csv.html","text!../templates/character-summarize-list-item-csv-header-grouped.html","../helpers/PromiseFailReport","papaparse"],function(e,t,n,o,a,r,i,s,l,c,u){var d=i.Form.extend({fields:[{control:"button",label:"Update Changes to Server"},{name:"descriptiondata",label:"Descriptions",control:"textarea"}],events:{submit:function(t){var n=this;t.preventDefault();var a=u.parse(n.model.get("descriptiondata"),{header:!0});if(console.log(a),0!=a.errors.length)return void console.log(JSON.stringify(a.errors));var r=e.map(a.data,function(t,n){var a,r=new o.Query("bnsctdbs_KithRule").equalTo("category",t.category).equalTo("name",t.name);return r.first().then(function(n){n?console.log("Found existing object for "+t.category+" "+t.name):(n=new o.Object("bnsctdbs_KithRule",{name:t.name,category:t.category}),console.log("Didn't find existing object for "+t.category+" "+t.name));var r=new o.ACL;r.setPublicReadAccess(!0),r.setPublicWriteAccess(!1),r.setRoleReadAccess("Administrator",!0),r.setRoleWriteAccess("Administrator",!0),n.setACL(r);var i=e.omit(t,function(t){return!!e.includes(["name","category"],t)||""==t});return e.each(i,function(t,o){"order"==o?n.set(o,e.parseInt(t)):n.set(o,t)}),console.log(n.attributes),a=" "+n.id+" "+n.attributes.name,n.save()}).fail(function(e){console.log(e),console.log("Error on saving disguy?"+a)})});o.Promise.when(r).then(function(){console.log(JSON.stringify(arguments)),console.log("Saved all of that")}).then(function(){console.log("Saved all of that")}).fail(c)}}}),m=i.Form.extend({fields:[{name:"category",label:"Category",control:"select",options:[{label:"None",value:"None"}]}]}),h=r.LayoutView.extend({el:"#administration-descriptions > div[data-role='main']",regions:{sections:"#descriptions-sections",list:"#administration-descriptions-list"},childEvents:{filterwith:"filterwith",submit:"submit"},filterwith:function(t){var n,a=this;n="All"==t.get("category")?new o.Query("bnsctdbs_KithRule"):new o.Query("bnsctdbs_KithRule").equalTo("category",t.get("category"));var r=[];return n.each(function(t){r.push(e.omit(t.attributes,"ACL"))}).then(function(){r=e(r).sortByAll(["category","order","name"]).value();var t=e(r).map(function(t){return e.keys(t)}).tap(function(e){console.log(e)}).flatten().uniq().value();a.data.set("descriptiondata",u.unparse({fields:t,data:r}))}).fail(c)},getColumnNames:function(t){var n=this;return e(n.collection.models).map("attributes."+t).flatten().map("attributes.name").without(void 0).sortBy().uniq(!0).value()},setup:function(){var e=this,t=e.options||{};return e.filterOptions=new n.Model({playable:!0,category:"attributes",antecedence:"PC",resulttype:"onlycat",format:"pretty"}),e.data=new n.Model({descriptiondata:"Nothing here yet"}),e.listenTo(e.filterOptions,"change",e.filterwith),e.showChildView("sections",new m({model:e.filterOptions}),t),e.showChildView("list",new d({model:e.data}),t),this.$el.enhanceWithin(),e},update_categories:function(){var t=this,n=new o.Query("bnsctdbs_KithRule");n.select("category");var a={};return n.each(function(e){a[e.get("category")]=1}).then(function(){console.log(a);var n=t.sections.currentView,r=n.fields.models[0],i=e.map(a,function(e,t){return{label:t,value:t}});return i=e.sortBy(i,"label"),i.push({label:"All",value:"All"}),r.set("options",i),o.Promise.as(n.render())})}});return h});