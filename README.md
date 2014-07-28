Time picker
===========

I have been annoyed by clicking three dozen times with my mouse to select a time on a web page.
I do not want to switch from my mouse to the keyboard and back again.

That's why I tried to create an easy-to-use input element for time.
You can select the time by dragging the clock hand around with your mouse.


You can get an impression of my intention on http://htmlpreview.github.io/?https://github.com/joerg-pfruender/js-clock/blob/master/src/test/timepickertestharness.html

Next TODOs:
-----------

* respond to change made to the input element by keyboard
* auto-hide popup and remove the close button
* test with several inputs
* test on internet explorer
* test on mobile devices
* make it work with other html input types: date-time, local-date-time, untyped

What won't be done
------------------

There won't be support for setting the time more accurate than quarter hours, since this is usually no scenario in day to day use.

Only public transportation needs more accuracy than quarter hours.