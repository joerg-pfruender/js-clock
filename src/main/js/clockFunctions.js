var clockFunctions = {

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
  }
};


var clockRadius = 80;

var canvasClockPainter = {


  radius: clockRadius,
  width: 2 * clockRadius,
  centerX: clockRadius,
  centerY: clockRadius,
  innerCircleTickRadius: clockRadius - (clockRadius / 10) - 1,


  paintBackground: function (canvasContext) {
    canvasContext.fillStyle = "rgba(255, 255, 255, 0.5)";
    canvasContext.arc(this.radius, this.radius, this.radius - 1, 0, Math.PI * 2, true);
    canvasContext.fill();
  },

  getTickCoordinates: function (radius, hours, optionalMinutes) {
    return clockFunctions.getTickCoordinates(this.centerX, this.centerY, radius, hours, optionalMinutes);
  },


  paintClock: function (canvasContext) {

    var radius = this.radius;

    this.paintBackground(canvasContext);

    canvasContext.strokeStyle = "rgb(0,0,0)";   // black
    canvasContext.beginPath();
    canvasContext.arc(radius, radius, radius - 1, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.stroke();

    var outerCircleTickRadius = this.radius - 1;

    for (var hour = 0; hour < 12; hour++) {
      var startHourTick = this.getTickCoordinates(outerCircleTickRadius, hour);
      var endHourTick = this.getTickCoordinates(this.innerCircleTickRadius, hour);
      canvasContext.beginPath();
      //console.log("from [" + startHourTick.x + "," + startHourTick.y + "] to  [" + endHourTick.x + ", " + endHourTick.y + "]");
      canvasContext.moveTo(startHourTick.x, startHourTick.y);
      canvasContext.lineTo(endHourTick.x, endHourTick.y);
      canvasContext.stroke();

    }
  },

  paintClockHand: function (canvasContext, hours, minutes) {
    var endOfClockHand = this.getTickCoordinates(this.innerCircleTickRadius - 2, hours, minutes);
    canvasContext.beginPath();
    canvasContext.moveTo(this.centerX, this.centerY);
    canvasContext.lineTo(endOfClockHand.x, endOfClockHand.y);
    canvasContext.stroke();
  },

  clearCanvas: function (canvasContext) {
    canvasContext.clearRect(0, 0, this.width, this.width);
  }

};