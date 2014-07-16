User-controlled incrementer
===========================

Description
-----------

```javascript
 $(".myspinbox").userincr();
```

Turns edit box into a spinbox with user-controllable step function.

Plugin wraps the box in a `<span class="userincr-container">` (unless it is the only child of its parent) and generates a pair of buttons to increment and decrement the value in that box.

When user enters a string of a form `+x`, `*x`, `/x`, `+x%`, `-x%`, the
previous value of the box is increased or multiplied by this amount. This also
changes the increment step value, so that future clicks on the buttons will
repeat same operation.

The string of a form `-x` sets the value of the box to -x, unless the range of
the box does not allow negative numbers (see below) -- in this case, it acts as
a decrement operation.

Constructor Options
-------------------

```javascript
$(".myspinbox").userincr({buttonlabels:{inc:'>>',dec:'<<'}})
```
uses custom labels on the generated buttons


`DATA` options
--------------

### Range

```javascript
$(".myspinbox").userincr().data({'min':0,'max':1000});
```

or

```html
<input type="text" data-min="-0.5" data-max="255.5" value="100" /><br/>
```

restricts the allowed values to a given range.

### Initial increment

```javascript
$(".myspinbox").data({'step':Math.sqrt(2),'op':'mul'}).userincr();
```
Selects initial value and mode of increment. Allowed values for `op` is `add` (default) and `mul`.

Data has to be set before the constructor in order for the generated buttons to
get their proper titles, but the action will work either way.


Other notes
-----------

Unless source text box already has a `title` attribute, the plugin generates a
title with a reminder on the format of step and mode control inputs.

The box generates custom `spin` event every time it is changed by clicking on
of the increment buttons.

The title of the increment buttons shows amount and type of
increment/decrement.

The css classes for generated buttons are "userincr-btn-inc" and
"userincr-btn-dec".

The css class for the generated wrapper is "userincr-container".




