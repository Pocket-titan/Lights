var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 144,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// Audio stuff
var readAudio = require('read-audio')
var pull = require('pull-stream')
var terminalBar = require('terminal-bar')

pull(
  readAudio(),
  pull.map(function (arr, enc, cb) {
    var data = [].slice.call(arr.data, 0, 128)
    return terminalBar(data) + "\n"
  }),
  pull.drain(function (str) {
    process.stdout.write(str)
  })
)

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

// // ---- animation-loop
// var offset = 0;
// setInterval(function () {
//   for (var i = 0; i < NUM_LEDS; i++) {
//     pixelData[i] = colorwheel((offset + i) % 256);
//   }
//
//   offset = (offset + 1) % 256;
//   ws281x.render(pixelData);
// }, 1000 / 30);

console.log('Press <ctrl>+C to exit.');
