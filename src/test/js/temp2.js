const relR = 1/0.2126;
const relG = 1/0.7152;
const relB = 1/0.0722;

const L = Math.pow(255, 2.4) / 6;

const color = (r,g,b) => {

    const count = r + g + b;

    const inv = 1/2.4;

    const r2 = Math.pow(r * L * relR / count, inv);
    const g2 = Math.pow(g * L * relG / count, inv);
    const b2 = Math.pow(b * L * relB / count, inv);


    return [r2,g2,b2];
}

console.log(color(1, 0, 0))
console.log(color(0, 1, 0))
console.log(color(0, 0, 1))
console.log(color(1, 0, 1))
console.log(color(1, 1, 0))
console.log(color(0, 1, 1))
