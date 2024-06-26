const ArrayUtils = require('./index');

console.log(ArrayUtils.sum([1,2,3,4])); //10

console.log(ArrayUtils.removeDuplicates([1,2,2,3,4,4])) //[ 1, 2, 3, 4 ]

console.log(ArrayUtils.max([1,2,3,4])) //4


console.log(ArrayUtils.min([1,2,3,4])) //1

console.log(ArrayUtils.avarage([1,2,3,4])) //2.5

console.log(ArrayUtils.flotten([1,[2,3],[4,[5,6]]])) //[ 1, 2, 3, 4, 5, 6 ]

console.log(ArrayUtils.unique([1,2,2,3,4,4])) //[ 1, 2, 3, 4 ]

console.log(ArrayUtils.chunk([1,2,2,3,4,5],2)) //[ [ 1, 2 ], [ 2, 3 ], [ 4, 5 ] ]

console.log(ArrayUtils.findDuplicates([1,2,2,3,4,4])) //[ 2, 4 ]

console.log(ArrayUtils.difference([1,2,3],[2,3,4])) //[ 1 ]