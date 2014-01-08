/* global Backbone */
var app = app || {};

(function () {
    'use strict';

    var Numbers = Backbone.Collection.extend({
        model: app.Number
    });

    app.numbers = new Numbers();
})();