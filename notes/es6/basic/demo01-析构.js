// 析构数组
let cold = ['autumn', 'winter'];
let  [autumn, ...otherSeasons] = cold;

console.log(autumn)  		// "autumn"
console.log(otherSeasons)      // => ['winter']
