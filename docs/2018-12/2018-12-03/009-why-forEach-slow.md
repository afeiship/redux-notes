# why forEach slow:
```js
/*
for: 7.552001953125ms
forEach: 132.47021484375ms
*/

var arr = [];
for (var i = 0; i < 100000; i++) arr[i] = i;

var numberOfRuns = 100;

function runTest(name, f) {
    var totalTime = 0;
    console.time(name);

    for (var r = 0; r < numberOfRuns; r++) {
        f();
    }

    return console.timeEnd(name);
}

function testFunction(v) {
    v;
}

var forTime = runTest('for', function() {
    for (var j = 0; j < arr.length; j++) {
        testFunction(arr[j]);
    }
});

var forEachTime = runTest('forEach', function() {
    arr.forEach(testFunction);
});


```
