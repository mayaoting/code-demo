function isPalindrome(string) {
    if(string.length <= 1) return false;
    const strArr = string.replace(' ','').trim().split();
    return strArr;
}

console.log(isPalindrome('1234321'))