function deepcopy(target, map=new WeakMap) {
    if(map.get(target)) {
        return target;
    }
}