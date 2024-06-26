const sum = (array) => {
    return array.reduce((acc, val) => acc + val, 0);
};

const removeDuplicates = (array) => {
    return [...new Set(array)];
};

const max = (array) => {
    return Math.max(...array);
}

const min = (array) => {
    return Math.min(...array);
}

const avarage = (array) => {
    return array.length ? sum(array) / array.length : 0;
}

const flotten = (array) => {
    return array.reduce((acc, val) => acc.concat(Array.isArray(val) ? flotten(val) : val), [])
}

const unique = (array) => {
    return array.filter((val, index, self) => self.indexOf(val) === index);
}

const chunk = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

const findDuplicates = (array) => {
    const seen = new Set();
    const duplicates = new Set();
    array.forEach((item) => {
        if(seen.has(item)){
            duplicates.add(item);
        }else{
            seen.add(item);
        }
    });
    return [...duplicates];
}

const difference = (array1,array2)=>{
    return array1.filter((item) => !array2.includes(item));
}

module.exports = {
    sum,
    removeDuplicates,
    max,
    min,
    avarage,
    flotten,
    unique,
    chunk,
    findDuplicates,
    difference
}