function c1(f) {
  return function(a) {
    return f(a);
  };
}

function c2(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

function c3(f) {
  return function(a) {
    return function(b) {
      return function(c) {
        return f(a, b, c);
      };
    };
  };
}

function sum() {
  var args = [].slice.call(arguments);
  return args.reduce((a, b) => a + b);
}

function curry(theFunction) {
  var finalArgs = [];
  var curried = function() {
    var args = [].slice.call(arguments);
    if (args.length > 0) {
      finalArgs = finalArgs.concat(args);
      return curried;
    } else {
      return theFunction.apply(null, finalArgs);
    }
  };

  return curried;
}

const sumFinal = curry(sum);

const functionBind = (fn, ctx, args) => {
  return fn.apply(ctx, args);
};

Function.prototype.bind2 = function(...args) {
  return curry(functionBind)(this, ...args);
};

console.log(sumFinal(1)(2)(3, 4)(5)());
// console.log(mulN(1, 2, 3, 4, 5));

// [sumFinal](1) ---> fn(1)
// [sumFinal(1)](2)--> fn(2)
// [sumFinal(1)(2)](3, 4) --->fn(3,4)
// [sumFinal(1)(2)(3, 4)](5) --->fn(5)
// [sumFinal(1)(2)(3, 4)(5)]() --->fn()

// final  --->: sum(1,2,3,4,5);
