export const capitalise = (t) => {
  return t[0].toUpperCase() + t.slice(1);
}

export const capitaliseEachWord = (ws) => {
  return decodeURI(ws).split(' ').map(capitalise).join(' ');
}

export const getTagFromPath = () => {
	const path =  window.location.pathname.split('/');
	let tag = null;
	if (path.length > 2 ) {
		tag = path[2];
	}
	return tag;
}
