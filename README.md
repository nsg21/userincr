User-controlled incrementer
===========================

Description
-----------

```javascript
 $(".myspinbox").userincr();
```

Turns an edit box into a spinbox with user-controllable increment function.

Plugin wraps a text box in a `<span class="userincr-container">` (unless it is
the only child of its parent) and generates a pair of buttons to increment and
decrement a value in that box.

When user enters a string of a form `+x`, `*x`, `/x`, `+x%`, `-x%`, the
previous value of the box is increased or multiplied by this amount. This also
changes the increment step value, so that future clicks on the buttons will
repeat same operation.

The string of a form `-x` sets the value of the box to -x, unless the range of
the box does not allow negative numbers (see below) -- in this case, it acts as
a decrement operation.

Constructor Options
-------------------
### Custom button labels
```javascript
$(".myspinbox").userincr({buttons:{inc:'>>',dec:'<<'}})
```
uses custom labels on the generated buttons

### Enable keyboard increments
```javascript
$(".myspinbox").userincr({kbd:true})
```
Allow up and down arrows to trigger increment and decrement.

### Enable mouse wheel increments
```javascript
$(".myspinbox").userincr({wheel:true})
```
Mouse wheel (with cursor over edit box) triggers increments and decrements.
### Named values
```javascript
$(".myspinbox").userincr({constants:{earth:6378137,moon:1738000}})
```
Named values. symbolic constants listed in `constants` option are translated into numbers as entered. The name will only be converted to a number if entered exactly, not as part of increment operation.

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
restricts allowed values to a given range.

### Initial increment
```javascript
$(".myspinbox").data({'step':Math.sqrt(2),'op':'mul'}).userincr();
```
Selects initial value and mode of increment. Allowed values for `op` is `add` (default) and `mul`.

Data has to be set before the constructor call in order for the generated
buttons to get their proper titles, but the action will work either way.


Other notes
-----------
Unless the source text box already has a `title` attribute, the plugin
generates a title with a reminder on the format of step and mode control
inputs.

The box generates custom `step` event every time it is changed by clicking on
of the increment buttons.

The title of the increment buttons shows amount and type of
increment/decrement.

The css classes for generated buttons are "userincr-btn-inc" and
"userincr-btn-dec".

The css class for the generated wrapper is "userincr-container".




