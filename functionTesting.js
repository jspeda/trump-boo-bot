function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function booGenerator() {
  var o = "bo"
  for (var i = 0; i < getRandomInt(2, 9); i++) {
    o+= "o"
  }
  console.log(o);
}
booGenerator();
