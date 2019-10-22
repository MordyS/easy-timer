export function DateNow() {
    const date = new Date()
    return String(date.getMonth() + 1).padStart(2, '0') + '/' +
        String(date.getDate()).padStart(2, '0') + '/' +
        String(date.getFullYear()) + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0')
}
export function CalculateDiff(from, to) {
    to = to ? to : DateNow()
    from = from.split(' ')[1].split(':')
    to = to.split(' ')[1].split(':')
    let h = +to[0] - +from[0]
    let m = +to[1] - +from[1]
    let s = +to[2] - +from[2]
    if (s < 0) {
        s += 60
        m -= 1
    }
    if (m < 0) {
        m += 60
        h -= 1
    }
    let timeDisplay = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
    let timeCalculate = h + (m / 60) + (s / 3600)
    return ({ timeDisplay: timeDisplay, timeCalculate: timeCalculate })
}
export function AddDiff(a, b) {
    a = a.split(':')
    b = b.split(':')
    let h = +a[0] + +b[0]
    let m = +a[1] + +b[1]
    let s = +a[2] + +b[2]
    if (s > 59) {
        s -= 60
        m += 1
    }
    if (m > 59) {
        m -= 60
        h += 1
    }
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0')
}