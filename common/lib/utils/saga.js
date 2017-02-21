export default function wrap(promise, ...args) {
  return promise(...args)
    .then(response => ({ _error: false, ...response }))
    .catch(error => ({ _error: true, error: true, ...error }));
}
