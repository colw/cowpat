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

export const getBaseURL = (url)  => {
	if (url.slice(0,4) != 'http') {
	  url = 'http://' + url;
	}
	var a = document.createElement('a');
	a.href = url;
	return a.hostname.replace(/^www./, '');
}
