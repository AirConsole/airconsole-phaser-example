// Decide if we are on a touch device or using the mouse (e.g. in the AirConsole simulator)
var event_down = isMobile() ? 'touchstart' : 'mousedown';
var event_up = isMobile() ? 'touchend' : 'mouseup';

// Reference to our two buttons in the controller
var btn_left_ele = $('#btn_left');
var btn_right_ele = $('#btn_right');
var role_info_ele  = $('#role_info');

// =======================================
// Create the AirConsole instance
// =======================================
var airconsole = new AirConsole({
  orientation: AirConsole.ORIENTATION_LANDSCAPE
});

airconsole.onReady = function() {};

airconsole.onMessage = function(device_id, data) {

  if (data.action === 'SET_ROLE') {
    var txt = "You are the " + data.role;
    if (data.role === "SHOOTER") {
      txt += "<br>Press BOTH buttons to shoot";
    } else {
      txt += "<br>Press BOTH buttons to toggle velocity";
    }
    role_info_ele.html(txt);
  }

};

// =======================================
// Bind touch events
// =======================================

btn_left_ele.on(event_down, function() {
  // Send the AirConsole Screen that we PRESSED the left button
  airconsole.message(AirConsole.SCREEN, {
    action: 'left',
    pressed: true
  });
});

btn_left_ele.on(event_up, function() {
  // Send the AirConsole Screen that we RELEASED the left button
  airconsole.message(AirConsole.SCREEN, {
    action: 'left',
    pressed: false
  });
});

btn_right_ele.on(event_down, function() {
  airconsole.message(AirConsole.SCREEN, {
    action: 'right',
    pressed: true
  });
});

btn_right_ele.on(event_up, function() {
  airconsole.message(AirConsole.SCREEN, {
    action: 'right',
    pressed: false
  });
});
