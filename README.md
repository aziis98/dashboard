
# Dashboard

Use it at [aziis98.github.io/dashboard]()

> Dashboard webapp project

## Dashboard | Introduction

This is a dashboard for keeping notes, timers and more things like those.
Here you can see two notes and a clock. Widgets can be added from the menu above. You can move widgets by dragging them around. Try to move some widgets. As you see there is a very fine grid to keep things a bit tidier.
When a note becomes long (about over 10 lines) the first line will be used as a title like this one.
Notes can be very long so at a certain point they stop growing vertically and instead a scrollbar appears.
Oh, and by the way, everything is saved to localStorage so if you change something it will remain even if you reload the page.
You can also pan around indefinitely.

## Dashboard | Javascript Dynamic

A Dynamic Widget can be created from the 'New Widget' menu on the toolbar.
You can edit the script of a Dynamic by double-clicking it, it will show a menu with some options. All widget when double-clicked show a trash that deletes the widget and a question mark for more info on the widget.
Inside a Dynamic there are two inputs, the first is for setting how often it will update in seconds (if you set it to 0 it won't update at all!) while the second is for the script itself. Also hover on the question mark for a quick reference of the aviable commands.
If you set the script to be an arrow function instead of evaluating immediately, you will get a list of parameters as inputs (see on the top-right the sum and the factorial examples) that will be passed as inputs to the arrow function when they change.
For simplifying things if a valid number is passed to the arrow function it is automatically converted to a Number to avoid conversion within the function itself.

# TODO

* [ ] Copiable text in dynamics
* [ ] Add Buttons to dynamics