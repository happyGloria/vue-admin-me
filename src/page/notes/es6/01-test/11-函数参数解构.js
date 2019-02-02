
function analysis({
  uid,
  uname
}) {
  console.log(uid, uname)
}
analysis({
  uid: 121,
  uname: '张三'
})


let person = {
  firstName: "Ted",
  lastName: "Neward",
  age: 12,
  favoriteLanguages: ["ECMAScript", "Java", "C#", "Scala", "F#"]
}

function displayDetails({
  firstName,
  age,
  favoriteLanguages: [lang1]
}) {
  console.log(`${firstName} is ${age} years old, he/she's favorite Language is ${lang1}`);
  // Ted is 12 years old, he/she's favorite Language is ECMAScript
}
displayDetails(person)