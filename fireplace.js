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
var time = 0
setInterval(function () {
  for (var led = 0; led < NUM_LEDS; led++) {
    pixelData[led] = get_random_color()
  }
  ws281x.render(pixelData);
  ws281x.setBrightness(Math.round(Math.random()*200 + (255 - 200)));
}, 100);

function get_random_color() {
  var colors = [
    {'r':255, 'g':88, 'b':0 },
    {'r':247, 'g':148, 'b':0 },
    {'r':255, 'g':148, 'b':0 },
    {'r':255, 'g':198, 'b':0 },
    {'r':255, 'g':232, 'b':0 },
    {'r':255, 'g':98, 'b':0 },
    {'r':255, 'g':56, 'b':55 },
  ]
  var random_color = colors[Math.floor(Math.random()*colors.length)];
  console.log(random_color)
  return rgb2Int(random_color['r'], random_color['b'], random_color['g'])
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

console.log('Press <ctrl>+C to exit.');
