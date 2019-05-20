const obj2arr = (obj) => {
  if (Array.isArray(obj)) return obj
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const result = []
    for (const o in obj) {
      result.push(obj[o])
    }
    return result
  }
  return []
}

const deepCopy = (obj, cache = []) => {
  function find (list, f) {
    return list.filter(f)[0]
  }

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

const snapToGrid = v => {
  const snappedV = Math.round(v / 5) * 5
  return snappedV
}

const dash2camel = v => {
  const re = /-(\w)/g
  return v.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}

export {
  obj2arr,
  deepCopy,
  snapToGrid,
  dash2camel
}
