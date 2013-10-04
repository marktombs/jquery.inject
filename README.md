jquery.inject
=============

Little jquery plugin for injecting data into html.

# another one?

Why would I want to write another one when there is mustache, handlebars, dust.js, etc etc etc? Because none of them did what I wanted
and are too big for my liking. They aim to be general all-purpose templating languages and thats more than I need. I just want to
inject a javascript object into some HTML and (importantly!) format the data on the way in.

# How to use

jquery.inject is very simple but I think quite powerful. It supports deep object paths and formatting. Lets start with a simple example.

## Simple example

Here's your HTML template:

    <div id="template">
        <ul>
            <li data-bind="name"></li>
            <li data-bind="age"></li>
        </ul>
    </div>

You also need a javascript object:

    var badger = {"name":"Brian", "age" : 42}

Then you simply inject:

    $('#template').inject(badger)

The results:

     <div id="template">
         <ul>
             <li data-bind="name">Brian</li>
             <li data-bind="age">42</li>
         </ul>
     </div>

Simple.

## Formatting

Lets say we want to display the date of birth of our badger. Our data now looks like this:

      var badger = {"name":"Brian", "age" : 42, "dob" : "2004-06-03T19:10:59"}

And a updated template:

     <div id="template">
         <ul>
             <li data-bind="name"></li>
             <li data-bind="age"></li>
             <li date-bind="dob"></li>
         </ul>
     </div>

What will happen? The 'dob' field will be injected as is. Not pretty. We need to format that mother.
Check out this template instead:

          <div id="template">
              <ul>
                  <li data-bind="name"></li>
                  <li data-bind="age"></li>
                  <li date-bind="dob" data-bind-formatter="dateformatter"></li>
              </ul>
          </div>

Note the new element 'data-bind-formatter'. That's the name of a javascript function that the inject plugin will send the data
through before injecting it into the template. For example:

    function dateformatter(input) {
            var newdate = new Date(string);
            return newdate.getFullYear()
                + '-' + (newdate.getMonth() + 1)
                + '-' + newdate.getDate()
    }

Our finished HTML will look like:


     <div id="template">
         <ul>
             <li data-bind="name">Brian</li>
             <li data-bind="age">42</li>
             <li data-bind="dob">2004-06-03</li>
         </ul>
     </div>