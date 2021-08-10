var noop = () => { }

var easing = {
  quadratic: function (x) {
    return Math.sqrt(x);
  }
};

function range(start, stop, step) {
  var array = [];
  for (var i = start; i < stop; i += step) array.push(i);
  return array;
}

function interpolation(fps, easing, finalValue, start = 0) {
  function scaleIt(value) { return start + (Math.abs(finalValue - start) * value); }
  var x = range(0, 1, 1 / fps),
    y = x.map(easing).map(scaleIt);
  return y;
}

function animateEl(values, duration, onAnimate = noop, onEndAnimate = noop) {
  var frameIndex = 0,
    fps = values.length,
    id = setInterval(anime, duration / fps);
  function anime() {
    var current = values[frameIndex],
      isLastFrame = (frameIndex === fps - 1);

    onAnimate(current, frameIndex, values);

    if (isLastFrame) {
      clearInterval(id);
      id = null
      onEndAnimate()
    } else {
      frameIndex++;
    }
  }

  return () => {
    if (id) {
      clearInterval(id)
      id = null
    }
  }
}

export default class VsBubble {
  constructor(config = {}) {
    this.animateTime = config.animateTime || 3000
    this.fps = config.fps || 30
  }

  start(value, onAnimate = noop, onEndAnimate = noop) {
    this.end()
    const [start, end] = Array.isArray(value) ? value : [0, value]
    const fps = Math.min(Math.abs(end - start), 30)
    var values = interpolation(fps, easing.quadratic, end, start);
    this.timerFn = animateEl(values, 3000, onAnimate, onEndAnimate);
    return this.timerFn
  }

  end() {
    if (this.timerFn) {
      this.timerFn()
      this.timerFn = null
    }
  }
}