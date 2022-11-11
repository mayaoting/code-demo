//

function f(n) { 
    if (n < 2) {
        return n
    }
    return f(n - 1) + f(n-2)
 }

 function F2(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) {
        return ac2;
    }
    return F2(n - 1, ac2, ac1 + ac2);
}

function logRuntime(fn) {
console.time();
fn()
console.timeEnd();
}
