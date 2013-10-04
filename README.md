jquery.inject
=============

Little jquery plugin for injecting data into html.

# another one?

Why would I want to write another one when there is mustache, handlebars, dust.js, etc etc etc? Because none of them did what I wanted
and are too big for my liking. They aim to be general all-purpose templating languages and thats more than I need. I just want to
inject a javascript object into some HTML and (importantly!) format the data on the way in.

# How to use

jquery.inject is very simple but (I think quite powerful). It supports deep object paths and formatting. Lets start with a simple example.

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

