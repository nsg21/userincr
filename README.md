User-controlled incrementer
===========================

Description
-----------

```javascript
 $(".myspinbox").userincr();
```

Turns edit box into a spinbox with user-controllable step function.

Plugin wraps the box in a <span class="userincr-container"> (unless it is the only child of its parent) and generates a pair of buttons to increment and decrement the value in that box. The buttons classes are "userincr-btn-inc" and "userincr-btn-dec".

When user enters a string of a form `+x`, `*x`, `/x`, `+x%`, `-x%`, the
previous value of the box is increased or multiplied by this amount. This also
changes the increment step value so that future clicks on the buttons will
repeat same operation.

The string of form `-x` sets the value of a box to -x, unless the range of the
box does not allow negative numbers (see below) -- in this case, it acts as a
decrement operation.

Options
-------

```javascript
$(".myspinbox").userincr({buttonlabels:{inc:'>>',dec:'<<'}})
```
uses custom labels on the generated buttons


Other options need to be passed as data elements:

```javascript
$(".myspinbox").userincr().data({'min':0,'max':1000});
```

or

```html
<input type="text" data-min="-0.5" data-max="255.5" value="100" /><br/>
```

restricts the allowed values to a given range.


Other notes
-----------

Unless source text box already has a `title` attribute, the plugin generates a
title with a reminder on the format of step and mode control inputs.

The box generates custom `spin` event every time it is changed by clicking on
of the increment buttons.

The title of the increment buttons shows amount and type of
increment/decrement.





