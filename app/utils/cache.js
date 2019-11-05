export class Cache {

  constructor() {
    this._cache = new Map()
  }

  async fetch(key, cb) {
    if (this._cache.has(key)) {
      return this._cache.get(key)
    }
    const result = await cb()
    this._cache.set(key, result)
    return this._cache.get(key)
  }

}