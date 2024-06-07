/////////////////////////
// /=================\ //
// | MADE BY KRONAE! | //
// |  EzAjax v1.0.0  | //
// | -Javascript web | //
// \=================/ //
/////////////////////////

/**
 * @typedef { 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' } AjaxMethod
 * 
 * @typedef {object} AjaxOption - Ajax Option
 * @property {AjaxMethod?} method - Ajax Method. Default to 'GET'.
 * @property {string} url - Target to send ajax request. Example: 
 * @property {( string | object )?} data - Data to send. Object will be auto stringified. Default to "".
 * @property {Record<string, string>?} headers - Header to send. Default to {}.
 * @property {function(AjaxResponse)?} callback - It will call after server send response.
 * 
 * @typedef {object} AjaxResponse - Response by the server.
 * @property {boolean} error - Is there error while communicating to server.
 * @property {BigInteger} statusCode - HTTP Status Code.
 * @property {string} statusText - Status Text about status code.
 * @property {string} responseText - Response body by the server.
 * 
 * @param {AjaxOption} option - Option to send ajax request.
 * @example ajax({ "method": 'GET', "url": location.origin + "/toajax/" });
 * @returns {Promise<AjaxResponse>} - Returns Promise for AjaxResponse.
 */
ajax = (option) => {
    const method = option.method == undefined ? "GET" : option.method.toUpperCase();
    const url = option.url;
    const data = option.data == undefined ? "" : (typeof (option.data) == 'object' ? JSON.stringify(option.data) : option.data)
    const headers = option.headers == undefined ? {} : option.headers;
    headers.Accept = headers.Accept == undefined ? "*/*" : headers.Accept;
    const callback = option.callback == undefined ? (res) => {} : option.callback;

    const xhr = new XMLHttpRequest();

    const promise = new Promise((resolve, reject) => {
        xhr.open(method, url);

        var headerKeys = Object.keys(headers);
        for (var i = 0; i < headerKeys.length; i++) {
            xhr.setRequestHeader(headerKeys[i], headers[headerKeys[i]]);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState != XMLHttpRequest.DONE)
                return;

            const res = {
                error: false,
                statusCode: xhr.status,
                statusText: xhr.statusText,
                responseText: xhr.responseText
            };
            callback(res);
            resolve(res);
        };

        xhr.onerror = function () {
            if (xhr.readyState != XMLHttpRequest.DONE)
                return;

            const res = {
                error: true,
                statusCode: xhr.status,
                statusText: xhr.statusText,
                responseText: xhr.responseText
            };
            callback(res);
            reject(res);
        }
    });

    promise.status = {
        xhr,
        method,
        url,
        data
    };

    return promise;
}