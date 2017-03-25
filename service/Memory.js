
class Memory {
  storage = {}

  get(key) {
    return this.storage[key];
  }

  set(key, value) {
    this.storage[key] = value;
  }
}

export default new Memory();
