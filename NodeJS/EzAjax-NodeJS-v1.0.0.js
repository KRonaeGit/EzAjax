const http  = null;
const https = null;

/**
 * @typedef { 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' } AjaxMethod
 * 
 * @typedef {object} AjaxOption - Ajax Option
 * @property {AjaxMethod?} method - Ajax Method. Default to 'GET'.
 * @property {string} url - Target to send ajax request. Example: 
 * @property {( string | object )?} data - Data to send. Object will be auto stringified. Default to "".
 * @property {Record<string, string>?} headers - Header to send. Default to {}.
 * @property { 'http' | 'https' ?} protocol - You can set the protocol manually.
 * @property {function(AjaxResponse)?} callback - It will call after server send response.
 * 
 * @typedef {object} AjaxResponse - Response by the server.
 * @property {boolean} error - Is there error while communicating to server.
 * @property {number} statusCode - HTTP Status Code.
 * @property {string} statusText - Status Text about status code.
 * @property {string} responseText - Response body by the server.
 * 
 * @param {AjaxOption} option - Option to send ajax request.
 * @example ajax({ "method": 'GET', "url": location.origin + "/toajax/" });
 * @returns {Promise<AjaxResponse>} - Returns Promise for AjaxResponse.
 */
exports.ajax = (option) => {
    const method = option.method == undefined ? 'GET' : option.method.toUpperCase();
    const url = option.url;
    const data = option.data == undefined ? "" : (typeof (option.data) == 'object' ? JSON.stringify(option.data) : option.data)
    const headers = option.headers == undefined ? {} : option.headers;
    headers.Accept = headers.Accept == undefined ? "*/*" : headers.Accept;
    const protocol = (option.protocol == undefined ? (url.startsWith("https://") ? "https" : "http") : option.protocol).toLowerCase();
    const callback = option.callback == undefined ? (res) => {} : option.callback;

    const requestData = {
        method: method,
        headers: headers
    };

    const promise = new Promise((resolve, reject) => {
        const lib = protocol == "http" ? (http == null ? require("http") : http) : (https == null ? require("https") : https);
        const req = lib.request(url, requestData, (res) => {
            var buffer = "";

            res.on("data", (chunk) => {
                buffer += chunk;
            });

            res.on("end", () => {
                const response = {
                    error: false,
                    statusCode: res.statusCode,
                    statusText: res.statusMessage,
                    responseText: buffer
                };

                callback(response);
                resolve(response);
            });
        });

        req.on("error", (err) => {
            const response = {
                error: true,
                statusCode: 500,
                statusText: err.message,
                responseText: ""
            };
            callback(response);
            reject(response);
        });

        if (method === 'POST' || method === 'PUT') {
            req.write(data);
        }

        req.end();
    });

    promise.status = {
        xhr,
        method,
        url,
        data,
        protocol: option.protocol
    };

    return promise;
}