var timeSamples = [
  {x: 10, y: -10, expectedTime: "1:30"},
  {x: 10, y: 10, expectedTime: "4:30"},
  {x: -10, y: -10, expectedTime: "10:30"},
  {x: -10, y: 10, expectedTime: "7:30"},

  {x: 0, y: -90, expectedTime: "12:00"},
  {x: 0, y: -35, expectedTime: "12:00"},
  {x: 5, y: -80, expectedTime: "12:00"},
  {x: 10, y: -80, expectedTime: "12:15"},
  {x: 15, y: -60, expectedTime: "12:30"},
  {x: 15, y: -90, expectedTime: "12:15"},
  {x: 20, y: -50, expectedTime: "12:45"},
  {x: 20, y: -35, expectedTime: "1:00"},
  {x: 25, y: -85, expectedTime: "12:30"},
  {x: 25, y: -45, expectedTime: "1:00"},
  {x: 30, y: -40, expectedTime: "1:15"},
  {x: 35, y: -55, expectedTime: "1:00"},
  {x: 40, y: -55, expectedTime: "1:15"},
  {x: 40, y: -85, expectedTime: "12:45"},
  {x: 45, y: -85, expectedTime: "1:00"},
  {x: 50, y: -60, expectedTime: "1:15"},
  {x: 55, y: -75, expectedTime: "1:15"},
  {x: 60, y: -55, expectedTime: "1:30"},
  {x: 65, y: -45, expectedTime: "1:45"},
  {x: 65, y: -70, expectedTime: "1:30"},
  {x: 75, y: -60, expectedTime: "1:45"},
  {x: 80, y: -40, expectedTime: "2:00"},
  {x: 80, y: -50, expectedTime: "2:00"},
  {x: 85, y: -45, expectedTime: "2:00"},


  {x: 30, y: 0, expectedTime: "3:00"},
  {x: 55, y: 15, expectedTime: "3:30"},
  {x: 25, y: 45, expectedTime: "5:00"},
  {x: 20, y: 80, expectedTime: "5:30"},

  {x: 0, y: 3, expectedTime: "6:00"},
  {x: -25, y: 10, expectedTime: "8:15"},
  {x: -25, y: 60, expectedTime: "6:45"},

  {x: -30, y: 0, expectedTime: "9:00"},
  {x: -70, y: -30, expectedTime: "9:45"},
  {x: -30, y: -60, expectedTime: "11:00"}


];


describe('getTimeFromCoordinates parameterized test', function () {
  timeSamples.forEach(function (timeSample) {
    it('time from [' + timeSample.x + ', ' + timeSample.y + '] should be ' + timeSample.expectedTime, function () {
      var result = clockFunctions.getTimeFromCoordinates(timeSample.x, timeSample.y);
      expect(result.timeAsString).toEqual(timeSample.expectedTime);
    });
  });
});


describe("clock functions", function () {

  it("getTime from clock center should not crash", function () {
    expect(clockFunctions.getTimeFromCoordinates(0, 0).timeAsString).not.toBeUndefined();
    expect(clockFunctions.getTimeFromCoordinates(0, 0).timeAsString).toEqual("12:00")
  });


  it("can set a date to the selected time (PM)", function () {
    var timeFromCoordinates = clockFunctions.getTimeFromCoordinates(10, -10);
    expect(timeFromCoordinates.timeAsString).toEqual("1:30")
    var date = new Date(2050, 0, 1);
    timeFromCoordinates.setToDate(date, true)
    expect(date.getHours()).toEqual(13)
    expect(date.getMinutes()).toEqual(30)
  })

  it("can set a date to the selected time (AM)", function () {
    var timeFromCoordinates = clockFunctions.getTimeFromCoordinates(10, -10);
    expect(timeFromCoordinates.timeAsString).toEqual("1:30")
    var date = new Date(2050, 0, 1);
    timeFromCoordinates.setToDate(date, false)
    expect(date.getHours()).toEqual(1)
    expect(date.getMinutes()).toEqual(30)
  })

  it("can set a date to the selected time (high noon)", function () {
    var timeFromCoordinates = clockFunctions.getTimeFromCoordinates(0, -80);
    expect(timeFromCoordinates.timeAsString).toEqual("12:00")
    var date = new Date(2050, 0, 1);
    timeFromCoordinates.setToDate(date, true)
    expect(date.getHours()).toEqual(12)
    expect(date.getMinutes()).toEqual(0)
  })

  it("can set a date to the selected time (midnight)", function () {
    var timeFromCoordinates = clockFunctions.getTimeFromCoordinates(0, -80);
    expect(timeFromCoordinates.timeAsString).toEqual("12:00")
    var date = new Date(2050, 0, 1);
    timeFromCoordinates.setToDate(date, false)
    expect(date.getHours()).toEqual(0)
    expect(date.getMinutes()).toEqual(0)
  })


  it("should calculate the coordinates for 1 o' clock (center: 50, 50)", function () {
    var tickCoordinatesFor1 = clockFunctions.getTickCoordinates(50, 50, 50, 0);
    expect(tickCoordinatesFor1.x).toBeCloseTo(50, 0);
    expect(tickCoordinatesFor1.y).toBeCloseTo(0, 0);
  });

});

var nextIsPmParameters = [
  {timeOld24: "12:00", timeNew12: "11:59", expectedPM: false},
  {timeOld24: "12:00", timeNew12: "12:01", expectedPM: true},
  {timeOld24: "0:00", timeNew12: "11:59", expectedPM: true},
  {timeOld24: "0:00", timeNew12: "12:01", expectedPM: false},
  {timeOld24: "0:01", timeNew12: "11:59", expectedPM: true},
  {timeOld24: "12:01", timeNew12: "11:59", expectedPM: false},
  {timeOld24: "15:00", timeNew12: "08:00", expectedPM: true}/*,
  {timeOld24: "15:00", timeNew12: "08:00", expectedPM: true},*/
]

describe('guess PM for time', function () {
  nextIsPmParameters.forEach(function (param) {
    it('timeOld24=' + param.timeOld24 + ', timeNew12=' + param.timeNew12 + ' should be PM ' + param.expectedPM + ']', function () {
      var timeOld24 = clockFunctions.parseTime(param.timeOld24)
      var timeNew12 = clockFunctions.parseTime(param.timeNew12)
//      var angle = clockFunctions.getAngleFromTime(timeNew12.hours ,timeNew12.minutes);
      var timeObject = clockFunctions.getTimeFromCoordinates(10, 10);
      var dateOld = new Date(1,1,200, timeOld24.hours, timeOld24.minutes, 0);
      var actualPM = timeObject.guessPM(dateOld, timeNew12.hours)
      expect(actualPM).toEqual(param.expectedPM);
    });
  });
});

var clockHourTicks = [
  {time: 0, x: 0, y: -100},
  {time: 12, x: 0, y: -100},
  {time: 1, x: 50, y: -86.6},
  {time: 2, x: 86.6, y: -50},
  {time: 3, x: 100, y: 0},
  {time: 4, x: 86.6, y: 50},
  {time: 5, x: 50, y: 86.6},
  {time: 6, x: 0, y: 100},
  {time: 7, x: -50, y: 86.6},
  {time: 9, x: -100, y: 0},
  {time: 11, x: -50, y: -86.6}
]


describe('coordinates for hour ticks', function () {
  clockHourTicks.forEach(function (hour) {
    it('coordinates for ' + hour.time + ' should be about [' + hour.x + ', ' + hour.y + ']', function () {
      var result = clockFunctions.getTickCoordinates(0, 0, 100, hour.time);
      expect(result.x).toBeCloseTo(hour.x, 0);
      expect(result.y).toBeCloseTo(hour.y, 0);
    });
  });
});


