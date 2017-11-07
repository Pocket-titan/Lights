var ws281x = require('rpi-ws281x-native');

var NUM_LEDS = 144,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

// ---- animation-loop
setInterval(function () {
  for (var led = 0; led < NUM_LEDS; led++) {
    pixelData[led] = rgb2Int(255, 0, 0);
  }
  ws281x.render(pixelData);
}, 1000 / 30);

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

console.log('Press <ctrl>+C to exit.');
