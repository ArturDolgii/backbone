/* global Backbone */
var app = app || {};

(function () {
    'use strict';

    var NumberRouter = Backbone.Router.extend({
        
    });

    app.NumberRouter = new NumberRouter();
    Backbone.history.start();
})();