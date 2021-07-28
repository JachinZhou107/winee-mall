const num = 8791
const str1 = num.toString().split()
const str2 = str1.sort((a, b) => b - a)
let i = 0; let temp
console.log(str1.join(), str2)
if (str1[i] !== str2[i]) {
  temp = str2[i]
} else {
  while (str1[i] === str2[i] && i < str1.length) {
    i++
    if (str1[i] !== str2[i]) {
      temp = str2[i]
      break
    }
  }
}
let p
for (let i = 0; i < str1.lengtg; i++) {
  if (str1[i] === temp) { p = i }
}
