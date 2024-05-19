// let name = "riski febriyanto";
// let WahtDoyouWannaBecomeInYourLife = "Proagamer";
// let gender = "male";
// let twitterhandle = "@duriskifeb";

// console.log(name);
// console.log(WahtDoyouWannaBecomeInYourLife);
// console.log(gender);
// console.log(twitterhandle);

// let number = 100;

// console.log(number + undefined); // NaN

// let fristName = "Alex";
// let latsName = "Kocak gaming";

// let fullName = `${fristName} ${latsName} something`;
// console.log(fullName);

// let PemeranPertama = "Brucc lee";
// let PemeranKedua = "Jackie chan";
// let fullname = PemeranPertama + " " + PemeranKedua;
// let uppercase = fullname.toUpperCase();

// let message = `jangan malas untuk menuliskan sebuah code yaa,dan juga jangan lupa sholat...${uppercase}, `
// message += `his best tv show is silicion valley`
// console.log(message);

// let password = 10890;

// if (password === 9) {
//     console.log("Welcome, Succesffully.");
// }else if (password <= 9){
//     console.log("look at this password");
// }else if (password >= 9) {
//     console.log("To long password");
//     console.log("Password should be 9 caracters");
// }else {
//     console.log("Please provide a password");
// }

// const date = ["aku", "sedang", "ngoding", "sehat"];
// const num = [1, 2, 2, 3, 4];

// console.log(date.includes("aku"));
// console.log(date.join("1."));
// console.log(date);

// OBJEK
// const human = { type: "Berakal", model: "Pendiam", Perasaan: "senang" };

// console.log((human.type = "tidak berakal"));

// // FUCTION
// function apalahYa(name, age) {
//   console.log(`hello kakak ${name}`);
//   age();
// }

// function age() {
//   console.log(`Saya di panggil kakak kiki`);
// }

// apalahYa("riski", age);

// function showNumber(num) {
//   const value = "1002";
//   num(value);
// }

// showNumber(function (value) {
//   console.log(value);
// });

// const person = {
//   name: "riski",
//   old: 19,
//   hobi: "ngoding",
//   saran: function () {
//     return `hello, bruhhh as perogamer ${person.name} & iam ${person.hobi} suskses deh ah..`;
//   },
// };

// console.log(person.saran());

//JSON
// Using toJSON() method
// Define the toJSON method for BigInt
// Example data containing a BigInt
// Define the toJSON method for BigInt
// BigInt.prototype.toJSON = function () {
//   return this.toString();
// };

// // Example data containing a BigInt
// const data = {
//   gross_gdp: 12345678901234567890n, // BigInt value
// };

// // Serialize the data to a JSON string using toJSON method
// const str1 = JSON.stringify(data);
// console.log("Using toJSON method:", str1); // {"gross_gdp":"12345678901234567890"}

// // Serialize the data to a JSON string using a replacer function
// const str2 = JSON.stringify(data, (key, value) => {
//   if (typeof value === "bigint") {
//     return value.toString();
//   }
//   return value;
// });
// console.log("Using replacer function:", str2); // {"gross_gdp":"12345678901234567890"}

// Date
// const d = new Date(2018, 11, 24, 10, 33, 30);
// console.log(d);

const date = new Date();

// const thn = date.getFullYear();
// const bln = date.getMonth();
// const hr = date.getDay();

// console.log(`tahun sekarang ${thn}`);
// console.log(`Buln sekarang ${bln}`);
// console.log(`hari sekarang ${hr}`);

console.log(date.toDateString());
console.log(date.toISOString());
console.log(date.toLocaleString());

setInterval (
    ( => console.log(`This function interval`))
)