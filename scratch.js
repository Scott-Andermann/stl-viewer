let arr = [
    { name:"string 1", value:"this", other: "that" },
    { name:"string 2", value:"this", other: "that" }
];

let obj = arr.find(o => o.name === 'string 1');

console.log(arr.findIndex(element => element.name === 'string 3'))

console.log(obj);

const arrr = [1, 2, 4, 5, 6]

console.log(...arrr);