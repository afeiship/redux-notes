module.exports = function reduceFn(fn0, fn1, fn2) {
  return function() {
    var args = [].slice.call(arguments);
    // return (fns[args.length] || fn2)(args);
    if (args.length === 0) return fn0(args);
    if (args.length === 1) return fn1(args);
    return fn2(args);
  };
};
