define(["jquery","underscore","parse","../models/Approval"],function(e,r,t,n){var o=t.Collection.extend({model:n,comparator:function(e,t){var n,o;return n=t.createdAt,o=e.createdAt,r.gt(n,o)?-1:r.lt(n,o)?1:0}});return o});