const _isType = (target, type) => {
  return Object.prototype.toString.call(target) === `[object ${type[0].toUpperCase()}${type.slice(1)}]`
}

const _toArray = list => {
  return _isType(list.length, 'undefined')
    ? [list]
    : Array.from(list)
};

export {
  _isType,
  _toArray
}
