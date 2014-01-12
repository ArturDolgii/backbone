(function() {
	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	};
})();

App.Models.Number = Backbone.Model.extend({
	defaults: {
		title: "",
		status: 1
	}
});

App.Views.Number = Backbone.View.extend({
	className: "number",

	initialize: function() {
		this.render();
	},

	template: _.template( $("#item-template").html() ),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );

		$("#table").append( this.$el );

		return this;
	}
});

App.Collections.Numbers = Backbone.Collection.extend({
	model: App.Models.Number,
	url: "data/numbers.json",
    initialize: function() {
        this.fetch();
    }
});

App.Views.Numbers = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		this.collection.each(function(model) {
			var NumberView = new App.Views.Number({ model: model });
		}, this);
	}
});



var NumbersCollection = new App.Collections.Numbers();

var NumbersView = new App.Views.Numbers({ collection: NumbersCollection });
