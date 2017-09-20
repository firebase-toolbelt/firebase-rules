/**
 * # TODO: Better naming.
 * Lifts function into a container that may execute it directly or wait for the passed function to be called.
 */

module.exports = fn => value => {
  return typeof value !== 'function'
    ? fn(value)
    : function() {
        const args = Array.from(arguments);
        return fn(value(...args));
      };
};
