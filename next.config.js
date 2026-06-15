const path = require('path');

/**
 * Ensure Turbopack resolves the project root correctly when running from
 * nested app directories. This avoids the "couldn't find next/package.json"
 * inference error.
 */
module.exports = {
  turbopack: {
    root: path.resolve(__dirname),
  },
};
