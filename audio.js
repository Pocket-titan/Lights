var ws281x = require('rpi-ws281x-native');
var DecibelMeter = require('decibel-meter');

var NUM_LEDS = 144,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// Audio stuff
var meter = new DecibelMeter('unique-id');
meter.sources.then((sources) => {
  console.log(sources)
  meter.connect(sources[0])
})

meter.on('sample', (dB, percent, value) => console.log(`${dB} dB`)) // display current dB level
meter.listen()

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
