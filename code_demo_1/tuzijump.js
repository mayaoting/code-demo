function tuzijump(n) {
  if(n < 2) {
    return n;
  } else {
    return tuzijump(n - 1) + tuzijump(n-2)
  }
}