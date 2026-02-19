// Minimal planet utilities for baseline
const SimplexNoisePkg = require('simplex-noise');
const SimplexNoise = (SimplexNoisePkg && SimplexNoisePkg.default) ? SimplexNoisePkg.default : SimplexNoisePkg;

// Create a noise instance (optional seed) with robust handling of exports
function createNoise(seed) {
  // If the installed package exposes createNoise3D/createNoise2D helpers, use them
  if (SimplexNoisePkg && typeof SimplexNoisePkg.createNoise3D === 'function') {
    const fn = SimplexNoisePkg.createNoise3D();
    return { noise3D: fn };
  }

  // SimplexNoisePkg may export a constructor function, a factory, or an object with default
  let ctor = SimplexNoise;
  if (typeof ctor !== 'function') {
    // Try common alternatives
    if (SimplexNoise && typeof SimplexNoise === 'object') {
      if (typeof SimplexNoise.SimplexNoise === 'function') ctor = SimplexNoise.SimplexNoise;
      else if (typeof SimplexNoise.default === 'function') ctor = SimplexNoise.default;
    }
  }
  if (typeof ctor === 'function') {
    try { return new ctor(seed); } catch (e) { return ctor(seed); }
  }
  throw new Error('Unable to construct SimplexNoise from import');
}

// Return a noise value in [-1,1] for a 3D coordinate
function generateHeight(x, y, z, seed) {
  const noise = createNoise(seed);
  // Use 3D noise; scale inputs for variety
  const scale = 0.5;
  return noise.noise3D(x * scale, y * scale, z * scale);
}

module.exports = { createNoise, generateHeight };
