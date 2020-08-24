/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
function identity(value) {
  return value !== undefined ? () => value : (val) => val;
}

function ensureFunction(fn, fallback) {
  if (fn === '%local' || fn === '%l') fn = function () { return this; };

  return typeof fn === 'function' ? fn : fallback(fn);
}

function isNone(value) {
  return value === undefined || value === null;
}

export function getter(name) {
  const path = name ? name.split('.') : [];
  const len = path.length;

  return function (ctx) {
    let idx = 0;

    while (ctx && idx < len) ctx = ctx[path[idx++]];

    return ctx;
  };
}

export function firstOf(...conditions) {
  const fns = [];

  for (const condition of conditions) {
    fns.push(ensureFunction(condition, identity));
  }

  return function (...args) {
    for (const fn of fns) {
      const result = fn.call(this, ...args);

      if (result) return result;
    }

    return false;
  };
}

export function eql(key, value) {
  key = ensureFunction(key, getter);
  value = ensureFunction(value, identity);

  return function (context) {
    return key.call(this, context) === value.call(this, context);
  };
}

export function isEmpty(value) {
  if (isNone(value)) return true;

  return (typeof value === 'number' || value === 'boolean')
    ? false
    : !Object.keys(value).length;
}

export function detect(id) {
  return (items) => items.find((item) => item.id === id);
}
