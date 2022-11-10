export function isEqual(a: any, b: any) {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) return false;

    let length;
    let i;
    let keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!isEqual(a[i], b[i])) return false;
      return true;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      /*
        TS2802: Type 'IterableIterator[any, any]>' can only be iterated through
        when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
      */
      /*@ts-ignore*/
      for (i of a.entries()) if (!b.has(i[0])) return false;
      /*@ts-ignore*/
      for (i of a.entries()) if (!isEqual(i[1], b.get(i[0]))) return false;
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      /*
        TS2802: Type 'IterableIterator[any, any]>' can only be iterated through
        when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
      */
      /*@ts-ignore*/
      for (i of a.entries()) if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      /* TS2339: Property 'length' does not exist on type 'ArrayBufferView'. */
      /*@ts-ignore*/
      length = a.length;
      /* TS2339: Property 'length' does not exist on type 'ArrayBufferView'. */
      /*@ts-ignore*/
      if (length != b.length) return false;
      /* TS7053: Element implicitly has an 'any' type because expression
      of type 'any' can't be used to index type 'ArrayBufferView' */
      /*@ts-ignore*/
      for (i = length; i-- !== 0; ) if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        continue;
      }
      if (!isEqual(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
}
