var addTimePicker = {

  defaultConfig: {
    clockRadius: 80,
    popupPadding: "5px",
    popupBorder: "1px solid black",
    popupBackground: "white"
  },

  /**
   * entry function
   * @param timeInput html-input element with time format HH:MM where the hours are in 24-hour style
   * @param configOptional optiona: if not given the default config will be used
   */
  to: function (timeInput, configOptional) {

    var self = this;

    if (!this.isCanvasSupported) {
      return;
    }

    timeInput.onclick = function (event) {
      self.createTimePicker(timeInput, configOptional);
      event.preventDefault();
    }

  },

  numberOfCreatedTimePickers: 0,

  createTimePicker: function (timeInput, configOptional) {
    var self = this;
    var currentConfig;
    if (configOptional) {
      currentConfig = configOptional;
      if (!currentConfig.clockRadius) {
        currentConfig.clockRadius = self.defaultConfig.clockRadius;
      }
      if (!currentConfig.popupPadding) {
        currentConfig.popupPadding = self.defaultConfig.popupPadding;
      }
      if (!currentConfig.popupBorder) {
        currentConfig.popupBorder = self.defaultConfig.popupBorder;
      }
      if (!currentConfig.popupBackground) {
        currentConfig.popupBackground = self.defaultConfig.popupBackground;
      }
    }
    else {
      currentConfig = self.defaultConfig;
    }

    self.numberOfCreatedTimePickers = self.numberOfCreatedTimePickers + 1;

    var currentTimePickerId = self.numberOfCreatedTimePickers;
    var currentClockRadius = currentConfig.clockRadius;


    var timeInputRect = timeInput.getBoundingClientRect();

    var createPopup = function (popUpHtmlCodeSnippet) {
      var div = document.createElement('div');
      div.innerHTML = popUpHtmlCodeSnippet;
      document.body.appendChild(div.firstChild);
      return div;
    };


    var createTimePickerPopup = function (popupTop, popupLeft) {

      var widthAndHeight = currentClockRadius * 2;
      var popupHtmlSnippet = '<div id="joergPfruenderTimepPickerPopUp" style=" position: absolute; z-index:1002 ; padding : ' + currentConfig.popupPadding + '; border: ' + currentConfig.popupBorder + '; background : ' + currentConfig.popupBackground + ' ">\n' +

        '    <canvas id="joergPfruenderTimePickerCanvas' + currentTimePickerId + '" width="' + widthAndHeight + '" height="' + widthAndHeight + '" style="cursor:pointer"></canvas><br>\n' +
        '<button id="timePickerPopupCloseButton" style="position: absolute; top: 0px; right: 0px "' +
        '>x</button>\n' +
        '</div>';

      var timePickerPopup = createPopup(popupHtmlSnippet);
      timePickerPopup.style.top = popupTop + " px";
      timePickerPopup.style.left = popupLeft + " px";
      timePickerPopup.style.width = widthAndHeight + " px;";
      timePickerPopup.style.height = (widthAndHeight + 20) + " px;";

      return document.getElementById("joergPfruenderTimepPickerPopUp");
    };

    var timePickerPopup = createTimePickerPopup(timeInputRect.bottom, timeInputRect.left);
    self.createTimePickerCanvas(timeInput, currentConfig, currentTimePickerId);

    var glassPaneHtmlSnippet = '<div id="joergPfruenderTimePickerGlassPane" style=" position: absolute ; top: 0px ; left:0px ; z-index:1000 ; width: 100%; height: 100%;"></div>';
    createPopup(glassPaneHtmlSnippet);

    var timePickerGlassPane = document.getElementById("joergPfruenderTimePickerGlassPane");

    var removeTimePicker = function () {
      if (timePickerPopup && timePickerPopup.parentNode) {
        timePickerPopup.parentNode.removeChild(timePickerPopup);
      }
      if (timePickerGlassPane && timePickerGlassPane.parentNode) {
        timePickerGlassPane.parentNode.removeChild(timePickerGlassPane);
      }
    }

    timeInput.onblur = function (event) {
      removeTimePicker();
    }

    timePickerGlassPane.onclick = function (event) {
      removeTimePicker();
    };

    document.getElementById("timePickerPopupCloseButton").onclick = function (event) {
      removeTimePicker();
    }


  },


  isCanvasSupported: function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }(),


  createTimePickerCanvas: function (timeInput, currentConfig, currentTimePickerId) {

    var self = this;

    var timePickerCanvasMouseHandler = {

      drag: false,
      offsetLeft: 0,
      offsetTop: 0,

      doMouseDown: function (event) {
        this.drag = true;
        var xPos = event.pageX;
        var yPos = event.pageY;
        this.handleEvent(xPos - this.offsetLeft, yPos - this.offsetTop);
      },

      doTouchStart: function (event) {
        this.drag = true;
        var touchobj = event.changedTouches[0];
        var xPos = parseInt(touchobj.clientX);
        var yPos = parseInt(touchobj.clientY);
        this.handleEvent(xPos - this.offsetLeft, yPos - this.offsetTop);
        ;
      },

      doTouchMove: function (event) {
        if (this.drag) {
          var touchobj = event.changedTouches[0];
          var xPos = parseInt(touchobj.clientX);
          var yPos = parseInt(touchobj.clientY);
          this.handleEvent(xPos - this.offsetLeft, yPos - this.offsetTop);
        }
      },

      stopDrag: function () {
        this.drag = false
      },
      doMouseUp: function (event) {
        this.stopDrag();
      },

      doMouseOut: function (event) {
        this.stopDrag();
      },

      doTouchCancel: function (event) {
        this.stopDrag();
      },

      doTouchLeave: function (event) {
        this.stopDrag();
      },

      doMouseMove: function (event) {
        if (this.drag) {
          var xPos = event.pageX;
          var yPos = event.pageY;

          this.handleEvent(xPos - this.offsetLeft, yPos - this.offsetTop);
        }
      }


    };


    var cumulativeOffset = function (element) {
      var top = 0, left = 0;
      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left
      };
    };

    var timePickerCanvas = document.getElementById('joergPfruenderTimePickerCanvas' + currentTimePickerId);
    var timePickerCanvasContext = timePickerCanvas.getContext('2d');

    var timePickerCanvasOffset = cumulativeOffset(timePickerCanvas);
    //    console.log("timePickerCanvasOffset=" + timePickerCanvasOffset.top + ", " + timePickerCanvasOffset.left);
    timePickerCanvasMouseHandler.offsetLeft = timePickerCanvasOffset.left;
    timePickerCanvasMouseHandler.offsetTop = timePickerCanvasOffset.top;

    var initialDate = new Date();

    if (timeInput.value) {
      var parsedTime = this.parseTime(timeInput.value);
      initialDate.setHours(parsedTime.hours);
      initialDate.setMinutes(parsedTime.minutes);
    }
    else {
      initialDate.setHours(12);
      initialDate.setMinutes(0);
    }
    var lastSelectedDate = initialDate;

    var lastSelectedTime;

    timePickerCanvasMouseHandler.handleEvent = function handleEvent(offsetFromLeft, offsetFromTop) {
//  console.log("timePickerCanvasOffset from Left=" + offsetFromLeft + ", timePickerCanvasOffset from Top=" + offsetFromTop);
      var numberOfPixelsRightFromCenter = offsetFromLeft - currentConfig.clockRadius;
      var numberOfPixelsBottomFromCenter = offsetFromTop - currentConfig.clockRadius;
      var currentSelectedTime = addTimePicker.getTimeFromCoordinates(numberOfPixelsRightFromCenter, numberOfPixelsBottomFromCenter, lastSelectedDate);
      if (!lastSelectedTime || currentSelectedTime.timeAsString != lastSelectedTime.timeAsString) {
        lastSelectedTime = currentSelectedTime;
        if (currentSelectedTime.date) {
          lastSelectedDate = currentSelectedTime.date;
        }
        timeInput.value = currentSelectedTime.timeAsString24;
        self.canvasClockPainter.repaintClockWithContent(timePickerCanvasContext, currentConfig, currentSelectedTime.hours, currentSelectedTime.minutes);
      }
    };


    self.canvasClockPainter.repaintClockWithContent(timePickerCanvasContext, currentConfig, initialDate.getHours(), initialDate.getMinutes());

    timePickerCanvas.addEventListener("mousedown", function (event) {
      timePickerCanvasMouseHandler.doMouseDown(event);
      event.preventDefault(); // would perform a blur event on the input element which would cause the popup to hide
    }, false);
    timePickerCanvas.addEventListener("mouseup", function (event) {
      timePickerCanvasMouseHandler.doMouseUp(event);
    }, false);
    timePickerCanvas.addEventListener("mousemove", function (event) {
      timePickerCanvasMouseHandler.doMouseMove(event);
    }, false);
    timePickerCanvas.addEventListener("mouseout", function (event) {
      timePickerCanvasMouseHandler.doMouseOut(event);
    }, false);
    timePickerCanvas.addEventListener("touchstart", function (event) {
      timePickerCanvasMouseHandler.doTouchStart(event);
      event.preventDefault(); // would perform a blur event on the input element which would cause the popup to hide
    }, false);
    timePickerCanvas.addEventListener("touchend", function (event) {
      timePickerCanvasMouseHandler.doMouseUp(event);
      event.preventDefault();
    }, false);
    timePickerCanvas.addEventListener("touchcancel", function (event) {
      timePickerCanvasMouseHandler.doTouchCancel(event);
      event.preventDefault();
    }, false);
    timePickerCanvas.addEventListener("touchleave", function (event) {
      timePickerCanvasMouseHandler.doTouchLeave(event);
      event.preventDefault();
    }, false);
    timePickerCanvas.addEventListener("touchmove", function (event) {
      timePickerCanvasMouseHandler.doTouchMove(event);
      event.preventDefault();
    }, false);

    var onInputOld = timeInput.oninput;

    if (!onInputOld) {
      timeInput.oninput = function (event) {
        var parsedTime2 = self.parseTime(timeInput.value);
        self.canvasClockPainter.repaintClockWithContent(timePickerCanvasContext, currentConfig, parsedTime2.hours, parsedTime2.minutes);
      }
    }
    else {
      timeInput.oninput = function (event) {
        var parsedTime3 = self.parseTime(timeInput.value);
        self.canvasClockPainter.repaintClockWithContent(timePickerCanvasContext, currentConfig, parsedTime3.hours, parsedTime3.minutes);
        onInputOld(event)
      }
    }

    return timePickerCanvas;

  },


  getTimeFromCandidates: function (angle, candidates, initialResult) {
    var lastResult = initialResult;
    for (var i = 0; i < candidates.length; i++) {
      if (angle > candidates[i].rad) {
        lastResult = candidates[i];
      }
      else {
        break;
      }
    }
    return lastResult;
  },

  getTimeByAngleRightTop: function (angleFrom12) {
    var candidates = new Array({
        time: "12:15",
        rad: Math.PI * 3.75 / 180
      },
      {
        time: "12:30",
        rad: Math.PI * (7.5 + 3.75) / 180
      },
      {
        time: "12:45",
        rad: Math.PI * (2 * (7.5) + 3.75) / 180
      },
      {
        time: "1:00",
        rad: Math.PI * (3 * (7.5) + 3.75) / 180
      },
      {
        time: "1:15",
        rad: Math.PI * (4 * (7.5) + 3.75) / 180
      },
      {
        time: "1:30",
        rad: Math.PI * (5 * (7.5) + 3.75) / 180
      },
      {
        time: "1:45",
        rad: Math.PI * (6 * (7.5) + 3.75) / 180
      },
      {
        time: "2:00",
        rad: Math.PI * (7 * (7.5) + 3.75) / 180
      },
      {
        time: "2:15",
        rad: Math.PI * (8 * (7.5) + 3.75) / 180
      },
      {
        time: "2:30",
        rad: Math.PI * (9 * (7.5) + 3.75) / 180
      },
      {
        time: "2:45",
        rad: Math.PI * (10 * (7.5) + 3.75) / 180
      },
      {
        time: "3:00",
        rad: Math.PI * (11 * (7.5) + 3.75) / 180
      }
    );

    return this.getTimeFromCandidates(angleFrom12, candidates, {
      time: "12:00",
      rad: 0
    });
  },


  getTimeByAngleLeftTop: function (angleFrom12) {
    var candidates = new Array({
        time: "11:45",
        rad: Math.PI * 3.75 / 180
      },
      {
        time: "11:30",
        rad: Math.PI * (7.5 + 3.75) / 180
      },
      {
        time: "11:15",
        rad: Math.PI * (2 * (7.5) + 3.75) / 180
      },
      {
        time: "11:00",
        rad: Math.PI * (3 * (7.5) + 3.75) / 180
      },
      {
        time: "10:45",
        rad: Math.PI * (4 * (7.5) + 3.75) / 180
      },
      {
        time: "10:30",
        rad: Math.PI * (5 * (7.5) + 3.75) / 180
      },
      {
        time: "10:15",
        rad: Math.PI * (6 * (7.5) + 3.75) / 180
      },
      {
        time: "10:00",
        rad: Math.PI * (7 * (7.5) + 3.75) / 180
      },
      {
        time: "9:45",
        rad: Math.PI * (8 * (7.5) + 3.75) / 180
      },
      {
        time: "9:30",
        rad: Math.PI * (9 * (7.5) + 3.75) / 180
      },
      {
        time: "9:15",
        rad: Math.PI * (10 * (7.5) + 3.75) / 180
      },
      {
        time: "9:00",
        rad: Math.PI * (11 * (7.5) + 3.75) / 180
      }
    );

    return this.getTimeFromCandidates(angleFrom12, candidates, {
      time: "12:00",
      rad: 0
    });

  },


  getTimeByAngleLeftBottom: function (angleFrom6) {
    var candidates = new Array({
        time: "6:15",
        rad: Math.PI * 3.75 / 180
      },
      {
        time: "6:30",
        rad: Math.PI * (7.5 + 3.75) / 180
      },
      {
        time: "6:45",
        rad: Math.PI * (2 * (7.5) + 3.75) / 180
      },
      {
        time: "7:00",
        rad: Math.PI * (3 * (7.5) + 3.75) / 180
      },
      {
        time: "7:15",
        rad: Math.PI * (4 * (7.5) + 3.75) / 180
      },
      {
        time: "7:30",
        rad: Math.PI * (5 * (7.5) + 3.75) / 180
      },
      {
        time: "7:45",
        rad: Math.PI * (6 * (7.5) + 3.75) / 180
      },
      {
        time: "8:00",
        rad: Math.PI * (7 * (7.5) + 3.75) / 180
      },
      {
        time: "8:15",
        rad: Math.PI * (8 * (7.5) + 3.75) / 180
      },
      {
        time: "8:30",
        rad: Math.PI * (9 * (7.5) + 3.75) / 180
      },
      {
        time: "8:45",
        rad: Math.PI * (10 * (7.5) + 3.75) / 180
      },
      {
        time: "9:00",
        rad: Math.PI * (11 * (7.5) + 3.75) / 180
      }
    );

    return this.getTimeFromCandidates(angleFrom6, candidates, {
      time: "6:00",
      rad: 0
    });

  },


  getTimeByAngleRightBottom: function (angleFrom6) {
    var candidates = new Array({
        time: "5:45",
        rad: Math.PI * 3.75 / 180
      },
      {
        time: "5:30",
        rad: Math.PI * (7.5 + 3.75) / 180
      },
      {
        time: "5:15",
        rad: Math.PI * (2 * (7.5) + 3.75) / 180
      },
      {
        time: "5:00",
        rad: Math.PI * (3 * (7.5) + 3.75) / 180
      },
      {
        time: "4:45",
        rad: Math.PI * (4 * (7.5) + 3.75) / 180
      },
      {
        time: "4:30",
        rad: Math.PI * (5 * (7.5) + 3.75) / 180
      },
      {
        time: "4:15",
        rad: Math.PI * (6 * (7.5) + 3.75) / 180
      },
      {
        time: "4:00",
        rad: Math.PI * (7 * (7.5) + 3.75) / 180
      },
      {
        time: "3:45",
        rad: Math.PI * (8 * (7.5) + 3.75) / 180
      },
      {
        time: "3:30",
        rad: Math.PI * (9 * (7.5) + 3.75) / 180
      },
      {
        time: "3:15",
        rad: Math.PI * (10 * (7.5) + 3.75) / 180
      },
      {
        time: "3:00",
        rad: Math.PI * (11 * (7.5) + 3.75) / 180
      }
    );

    return this.getTimeFromCandidates(angleFrom6, candidates, {
      time: "6:00",
      rad: 0
    });

  },


  rightTop: function (rightFromCenter, bottomFromCenter) {
    return Math.atan2(rightFromCenter, -bottomFromCenter);
  },

  rightBottom: function (rightFromCenter, bottomFromCenter) {
    return Math.atan2(rightFromCenter, bottomFromCenter);
  },

  leftTop: function (rightFromCenter, bottomFromCenter) {
    return Math.atan2(-rightFromCenter, -bottomFromCenter);
  },

  leftBottom: function (rightFromCenter, bottomFromCenter) {
    return Math.atan2(-rightFromCenter, bottomFromCenter);
  },

  getAngleFromCoordinates: function (rightFromCenter, bottomFromCenter) {
    if (rightFromCenter > 0) {
      if (bottomFromCenter > 0) {
        return this.rightBottom(rightFromCenter, bottomFromCenter);
      }
      else {
        return this.rightTop(rightFromCenter, bottomFromCenter);
      }
    }
    else {
      if (bottomFromCenter > 0) {
        return this.leftBottom(rightFromCenter, bottomFromCenter);
      }
      else {
        return this.leftTop(rightFromCenter, bottomFromCenter);
      }
    }
  },

  getTime12ByAngle: function (rightFromCenter, bottomFromCenter, angle) {
    if (rightFromCenter > 0) {
      if (bottomFromCenter > 0) {
        return this.getTimeByAngleRightBottom(angle);
      }
      else {
        return this.getTimeByAngleRightTop(angle);
      }
    }
    else {
      if (bottomFromCenter > 0) {
        return this.getTimeByAngleLeftBottom(angle);
      }
      else {
        return this.getTimeByAngleLeftTop(angle);
      }
    }
  },

  parseTime: function (timeAsString) {
    var hourMinuteSeparator = timeAsString.indexOf(":");
    var hoursInt = parseInt(timeAsString.substring(0, hourMinuteSeparator), 10);
    var minutesInt = parseInt(timeAsString.substring(hourMinuteSeparator + 1), 10);
    return {
      hours: hoursInt,
      minutes: minutesInt
    }
  },

  getTimeFromCoordinates: function (numberOfPixelsRightFromCenter, numberOfPixelsBottomFromCenter,
                                    initialDateOptional) {
    var angle = this.getAngleFromCoordinates(numberOfPixelsRightFromCenter, numberOfPixelsBottomFromCenter);
    var time12raw = this.getTime12ByAngle(numberOfPixelsRightFromCenter, numberOfPixelsBottomFromCenter, angle);
    var time12parsed = this.parseTime(time12raw.time);
    var hours12 = time12parsed.hours;
    var result = {

      getHours24: function (hours12, isPM) {
        var hours24;
        if (isPM && hours12 >= 12) {
          hours24 = hours12;
        }
        else if (isPM && hours12 < 12) {
          hours24 = hours12 + 12;
        }
        else if (!isPM && hours12 == 12) {
          hours24 = 0;
        }
        else {
          hours24 = hours12;
        }
        return hours24;
      },

      guessPM: function (dateOld, hoursNew) {
        var hoursOld24 = dateOld.getHours();
        var dateOldIsEarlyAfternoon = hoursOld24 >= 12 && hoursOld24 < 15;
        var dateOldIsLateEvening = hoursOld24 >= 21;
        var dateOldIsAfterMidnight = hoursOld24 < 3;
        var dateOldIsLateMorning = hoursOld24 >= 9 && hoursOld24 < 12;
        var dateOldIsPm = hoursOld24 > 12;

        if (dateOldIsEarlyAfternoon) {
          if (hoursNew >= 9 && hoursNew < 12) {
            return false;
          }
          else {
            return true;
          }
        }
        if (dateOldIsLateMorning) {
          if (hoursNew < 3 || hoursNew == 12) {
            return true;
          }
          else {
            return false;
          }
        }
        if (dateOldIsAfterMidnight) {
          if (hoursNew < 12 && hoursNew >= 9) {
            return true;
          }
          else {
            return false;
          }
        }
        if (dateOldIsLateEvening) {
          if (hoursNew < 3 || hoursNew == 12) {
            return false;
          }
          else {
            return true;
          }
        }
        return dateOldIsPm;
      },

      timeAsString: time12raw.time,
      hours: hours12,
      minutes: time12parsed.minutes,
      setToDate: function (dateToChange, isPM) {
        if (isPM == undefined) {
          isPM = this.guessPM(dateToChange, hours12)
        }
        var hours24 = this.getHours24(hours12, isPM);
        dateToChange.setHours(hours24);
        dateToChange.setMinutes(this.minutes);
        return dateToChange;
      },
      angle: angle
    };

    if (initialDateOptional) {
      var isPm = result.guessPM(initialDateOptional, hours12);
      result.pm = isPm;
      var date = result.setToDate(initialDateOptional, isPm);
      result.date = date;
      result.timeAsString = isPm ? result.timeAsString + " PM" : result.timeAsString + " AM";

      var hourAsString = date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours();
      var minutesAsString = date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes();
      result.timeAsString24 = hourAsString + ":" + minutesAsString;
    }
    return result;
  },

  getPoint: function (centerX, centerY, radius, angleInRad) {
    return {
      x: (centerX + Math.cos(angleInRad) * radius),
      y: (centerY + Math.sin(angleInRad) * radius)
    };
  },

  getAngleFromTime: function (hours, minutesOptional) {
    var minutes;
    if (!minutesOptional) {
      minutes = 0;
    }
    else {
      minutes = minutesOptional;
    }
    var partialHours = minutes / 60;
    var angleInDegrees = ((hours + partialHours) + 9) * 30;
    var angleInRad = angleInDegrees * Math.PI / 180;
    return angleInRad;
  },

  getTickCoordinates: function (centerX, centerY, radius, hours, minutesOptional) {
    var angleInRad = this.getAngleFromTime(hours, minutesOptional);
    return this.getPoint(centerX, centerY, radius, angleInRad);
  },

  canvasClockPainter: {

    repaintClockWithContent: function (canvasContext, config, hours, minutes) {

      var clockRadius = config.clockRadius;
      var width = 2 * clockRadius;
      var centerX = clockRadius;
      var centerY = clockRadius;
      var innerCircleTickRadius = clockRadius - (clockRadius / 10) - 1;

      var paintBackground = function () {
        canvasContext.fillStyle = "rgba(255, 255, 255, 0.5)";
        canvasContext.arc(clockRadius, clockRadius, clockRadius - 1, 0, Math.PI * 2, true);
        canvasContext.fill();
      };


      var getTickCoordinates = function (innerOrOuterCircleRadius, currentHours, currentMinutesOptional) {
        return addTimePicker.getTickCoordinates(centerX, centerY, innerOrOuterCircleRadius, currentHours, currentMinutesOptional);
      }

      var paintClock = function () {

        var radius = this.radius;

        paintBackground();

        canvasContext.strokeStyle = "rgb(0,0,0)";   // black
        canvasContext.beginPath();
        canvasContext.arc(clockRadius, clockRadius, clockRadius - 1, 0, Math.PI * 2, true);
        canvasContext.fill();
        canvasContext.stroke();

        var outerCircleTickRadius = clockRadius - 1;

        for (var hour = 0; hour < 12; hour++) {
          var startHourTick = getTickCoordinates(outerCircleTickRadius, hour);
          var endHourTick = getTickCoordinates(innerCircleTickRadius, hour);
          canvasContext.beginPath();
          //console.log("from [" + startHourTick.x + "," + startHourTick.y + "] to  [" + endHourTick.x + ", " + endHourTick.y + "]");
          canvasContext.moveTo(startHourTick.x, startHourTick.y);
          canvasContext.lineTo(endHourTick.x, endHourTick.y);
          canvasContext.stroke();

        }
      }

      var paintClockHand = function (hours, minutes) {
        var endOfClockHand = getTickCoordinates(innerCircleTickRadius - 2, hours, minutes);
        canvasContext.beginPath();
        canvasContext.moveTo(centerX, centerY);
        canvasContext.lineTo(endOfClockHand.x, endOfClockHand.y);
        canvasContext.stroke();
      }

      var clearCanvas = function () {
        canvasContext.clearRect(0, 0, width, width);
      }

      clearCanvas();
      paintClock();
      paintClockHand(hours, minutes);
    }

  }
};