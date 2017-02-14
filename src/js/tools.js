export function capitalise(t) {
  return t[0].toUpperCase() + t.slice(1);
}

export function capitaliseEachWord(ws) {
  return decodeURI(ws).split(' ').map(capitalise).join(' ');
}
