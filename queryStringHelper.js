export function getQueryStringParams() {
    const search = window.location.search;
    const params = {};
    if (!search) return params;

    for (const param of search.split(/&/g)) {
        const parts = param.split('=');
        if (parts.length !== 2) continue;
        params[parts[0].replace('?', '')] = decodeURIComponent(parts[1]);
    }

    return params;
}

export function setQueryStringParam(key, value) {
    const params = getQueryStringParams();
    params[key] = value;

    window.history.pushState({}, '', location.pathname + '?' + createQueryStringFromObject(params));
}

export function removeQueryStringParam(key, replace) {
    const params = getQueryStringParams();
    params[key] = undefined;

    if (replace) {
        window.history.replaceState({}, '', location.pathname + '?' + createQueryStringFromObject(params, k => params[k] !== undefined));
    } else {
        window.history.pushState({}, '', location.pathname + '?' + createQueryStringFromObject(params, k => params[k] !== undefined));
    }
}

export function createQueryStringFromObject(obj, keyFilter) {
    return keyFilter ?
        Object.keys(obj).filter(keyFilter).map(k => `${k}=${encodeURIComponent(obj[k])}`).join('&') : 
        Object.keys(obj).map(k => `${k}=${encodeURIComponent(obj[k])}`).join('&');
}
