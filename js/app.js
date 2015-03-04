// create a fresh student with random presence
var Student = function(name, ary) {
  // student's name
  this.name = name;

  if (ary) {
    this.presence = ary;
  } else {
    // presence - boolean array indicating students presence or lack of it (aka absence)
    this.presence = new Array(12);
    for (var i = 0; i < 12; ++i) {
      this.presence[i] = (Math.random() >= 0.5);
    }
  }
};

// calculate number of missed day based on presence
Student.prototype.daysMissed = function() {
  var d = 0;
  this.presence.forEach(function(day) {
    if (!day) {
      d += 1;
    }
  });

  return d;
};

// mark student on particular day denoted by {idx} as present or absent
Student.prototype.dayCheck = function(idx, value) {
  if (idx >= 0 && idx < 12) {
    this.presence[idx] = !! value;
  }
};

Student.prototype.getDayCheck = function(idx) {
  if (idx >= 0 && idx < 12) {
    return this.presence[idx];
  }

  return false;
};

var Studentopus = {
  attendances: function() {
    if (!localStorage.attendance) {
      console.log('Creating attendance records...');

      var atts = {};
      ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Walrus', 'Gregory the Goat', 'Adam the Anaconda'].forEach(function(name) {
        attendance[name] = new Student(name);
      });

      localStorate.attendance = JSON.stringify(atts);
    }

    // pretty stupid - but it is "hidden" in the octopus, so who cares
    var attendance = {};
    $.each(JSON.parse(localStorage.attendance), function(key, value) {
      attendance[key] = new Student(value.name, value.presence);
    });

    return attendance;
  },

  init_views: function() {
    var attendance = Studentopus.attendances();

    $('tr.student').each(function(_, tr) {
      var name = $(tr).children('.name-col').text();
      StudentRowView.init(tr, attendance[name]);
    });
  }
};

var StudentRowView = {
  init: function(tr, model) {
    $(tr).children('.name-col').text(model.name);
    var inputs = $(tr).children('.attend-col').children('input');
    inputs.each(function(idx, checkbox) {
      $(checkbox).attr('checked', model.getDayCheck(idx));
      $(checkbox).on('click', function() {
        model.dayCheck(idx, $(this).prop('checked'));
        $(tr).children('.missed-col').text(model.daysMissed());
      });
    });

    $(tr).children('.missed-col').text(model.daysMissed());
  }
};

Studentopus.init_views();
