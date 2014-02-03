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

App.Models.Stat = Backbone.Model.extend({
	defaults: {
		correct: 0,
		incorrect: 0,
		selfCorrected: 0
	}
});

App.Views.Number = Backbone.View.extend({
	className: "number",

	initialize: function() {
		this.model.on("change:status", this.render, this);
        this.$el.on("click", ".answer > img", $.proxy(this.changeStatus, this));
	},

	template: _.template( $("#item-template").html() ),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );

		return this;
	},

	changeStatus: function(e) {
		this.model.set("status", $(e.target).data("id"));
	}
});

App.Collections.Numbers = Backbone.Collection.extend({
	model: App.Models.Number
});

App.Views.Numbers = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		this.collection.each(this.addElement, this);
	},

	addElement: function(model) {
		var NumberView = new App.Views.Number({ model: model });

		$(".table").append( NumberView.render().el );
	}
});

App.Views.Stat = Backbone.View.extend({
	initialize: function() {
		this.render();
		this.collection.on("change:status", this.render, this);
	},

	template: _.template( $("#stat-template").html() ),

	render: function() {
		this.recountCollection();

		$(".stat").html( this.template( this.model.toJSON() ) );

		return this;
	},

	recountCollection: function() {
		var countCorrect = this.collection.toJSON().filter(function(item) {
			return item.status === 1;
		}).length;
		var countIncorrect = this.collection.toJSON().filter(function(item) {
			return item.status === 2;
		}).length;
		var countSeflCorrected = this.collection.toJSON().filter(function(item) {
			return item.status === 3;
		}).length;

		this.model.set("correct", countCorrect);
		this.model.set("incorrect", countIncorrect);
		this.model.set("selfCorrected", countSeflCorrected);
	}
});



var NumbersCollection = new App.Collections.Numbers([
	{"title": "one"},
	{"title": "two"},
	{"title": "three"},
	{"title": "four"},
	{"title": "five"},
	{"title": "six"},
	{"title": "seven"},
	{"title": "eight"},
	{"title": "nine"},
	{"title": "ten"},
	{"title": "eleven"},
	{"title": "twelve"},
	{"title": "thirteen"},
	{"title": "fourteen"},
	{"title": "fifteen"},
	{"title": "sixteen"},
	{"title": "seventeen"},
	{"title": "eighteen"},
	{"title": "nineteen"},
	{"title": "twenty"},
	{"title": "twenty-one"},
	{"title": "twenty-two"},
	{"title": "twenty-three"},
	{"title": "twenty-four"},
	{"title": "twenty-five"},
	{"title": "twenty-six"},
	{"title": "twenty-seven"},
	{"title": "twenty-eight"},
	{"title": "twenty-nine"},
	{"title": "thirty"},
	{"title": "thirty-one"},
	{"title": "thirty-two"},
	{"title": "thirty-three"},
	{"title": "thirty-four"},
	{"title": "thirty-five"},
	{"title": "thirty-six"},
	{"title": "thirty-seven"},
	{"title": "thirty-eight"},
	{"title": "thirty-nine"},
	{"title": "forty"},
	{"title": "forty-one"},
	{"title": "forty-two"},
	{"title": "forty-three"},
	{"title": "forty-four"},
	{"title": "forty-five"},
	{"title": "forty-six"},
	{"title": "forty-seven"},
	{"title": "forty-eight"},
	{"title": "forty-nine"},
	{"title": "fifty"},
	{"title": "fifty-one"},
	{"title": "fifty-two"},
	{"title": "fifty-three"},
	{"title": "fifty-four"},
	{"title": "fifty-five"},
	{"title": "fifty-six"},
	{"title": "fifty-seven"},
	{"title": "fifty-eight"},
	{"title": "fifty-nine"},
	{"title": "sixty"},
	{"title": "sixty-one"},
	{"title": "sixty-two"},
	{"title": "sixty-three"},
	{"title": "sixty-four"},
	{"title": "sixty-five"},
	{"title": "sixty-six"},
	{"title": "sixty-seven"},
	{"title": "sixty-eight"},
	{"title": "sixty-nine"},
	{"title": "seventy"},
	{"title": "seventy-one"},
	{"title": "seventy-two"},
	{"title": "seventy-three"},
	{"title": "seventy-four"},
	{"title": "seventy-five"},
	{"title": "seventy-six"},
	{"title": "seventy-seven"},
	{"title": "seventy-eight"},
	{"title": "seventy-nine"},
	{"title": "eighty"},
	{"title": "eighty-one"},
	{"title": "eighty-two"},
	{"title": "eighty-three"},
	{"title": "eighty-four"},
	{"title": "eighty-five"},
	{"title": "eighty-six"},
	{"title": "eighty-seven"},
	{"title": "eighty-eight"},
	{"title": "eighty-nine"},
	{"title": "ninety"},
	{"title": "ninety-one"},
	{"title": "ninety-two"},
	{"title": "ninety-three"},
	{"title": "ninety-four"},
	{"title": "ninety-five"},
	{"title": "ninety-six"},
	{"title": "ninety-seven"},
	{"title": "ninety-eight"},
	{"title": "ninety-nine"},
	{"title": "one hundred"}
]);

var NumbersView = new App.Views.Numbers({ collection: NumbersCollection });

var StatModel = new App.Models.Stat();
var StatView = new App.Views.Stat({ model: StatModel, collection: NumbersCollection });
