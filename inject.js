/**
 * teeny weeny plugin that injects data into an element.
 *
 * The element should have object keys annotated with an !, for instance the data.name attribute will
 * replace !name in the HTML.
 *
 * Or if any child elements have a data-bind attribute that matches.
 *
 * Example
 *
 * given a js Object like this : var badger = {name:'johnny', colour:'black', age:20}
 * we can annotate the html like this:
 * <p>Badger !name has colour !colour and is !age years old</p>
 * and / or
 * <p>Badger <span data-bind="name" /> has colour <span data-bind="colour" /> etc </p>
 *
 * And inject the data using
 *
 * $("p").inject(badger)
 *
 * Note that this is probably really really slow so you are advised to only use it
 * on small sections of the html, not on <body> for instance.
 *
 * @author mark.tombs@leanon.se
 * @date 2013-03-20
 * @version 1.1.0
 *
 */

(function ($) {

    $.fn.inject = function (object, options) {

        // defaults
        var settings = $.extend({}, $.fn.inject.defaults, options);

        var foundReplace = false;
        var html;

        // ----------------------------------------
        // Inject an object into the elements.

        function injectObject(_object, element) {

            if (settings.databind) injectObjectByDataBind(_object, element);
            if (settings.stringreplace) injectObjectWithStringReplace(_object, element);

        }

        // --------------------------------------------
        // Inject property into elements marked up with data-bind

        function injectObjectByDataBind(_object, element, path ) {
            var key;

            for (key in _object) {
                if (_object.hasOwnProperty(key)) {

                    // If the property is also an object, recurse.
                    var propertyValue = _object[key];

                    if (typeof propertyValue === 'object') {
                        injectObjectByDataBind(propertyValue, element, key);
                    }

                    if (path) key = path + "." + key;
                    console.log("Looking for " + key);

                    // Look for a data-bind element and replace its contents
                    // with the value from the object
                    $(element).find('*[data-bind="' + key + '"]').each(function (i, e) {
                        console.log("Found element, injecting");
                        var formatter = $(e).data('bind-formatter');
                        if (formatter) {
                            // FIXME I know, eval is evil.
                            var formatterFunction = eval(formatter);
                            propertyValue = formatterFunction(propertyValue)
                        }
                        $(e).html(propertyValue);
                    });

                }
            }

        }

        // ------------------------------------------------
        // do fairly crude string replacement

        function injectObjectWithStringReplace(_object, element) {

            var foundReplace = false;

            html = $(element).html();
            for (key in _object) {
                if (_object.hasOwnProperty(key)) {
                    if (~html.indexOf(settings.identifier + key)) {
                        foundReplace = true;
                        html = html.split(settings.identifier + key).join(_object[key]);
                    }
                }
            }

            // only do this if we actually replaced anything
            if (foundReplace) {
                $(element).html(html);
            }
        }

        return this.each(function (index, element) {
           injectObject(object, element);
        });
    };


    $.fn.inject.defaults = {
        "identifier": "!",
        "databind":true,
        "stringreplace":false
    };


}(jQuery));