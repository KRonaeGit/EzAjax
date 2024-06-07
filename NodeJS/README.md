### How to prepare to use?
First, you should write this command to your shell(cmd or somthing).
```bash
npm install ezajax-node
```
Second, write this code to use this library.
```javascript
import { ajax } from "ezajax-node";
```
or
```javascript
const ajax = require("ezajax-node").ajax;
```

and use `ajax()` function!

## Usage
#### Structure
```typescript
enum AjaxMethod {
    'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'
}
interface AjaxOption {
    method?: AjaxMethod | string; // Default to 'GET'
    url: string;
    data?: string | object; // object will be stringified.
    headers?: Record<string, string>; // Example: {"Accepts":"*/*"}
    callback?: (res: AjaxResponse) => void; // Example: res => { console.log(res.responseText) }
}
interface AjaxResponse {
    error: boolean; // It NOT means 'is status code is 200?'. It means 'network is not connected'.
    statusCode: integer; // HTTP Status code. (OK: 200)
    statusText: string; // Example: 200 = "OK".
    responseText: string; // Response text.
}
ajax(option: AjaxOption): Promise<AjaxResponse>;
// Params = [ option: AjaxOption ]
// Returns Promise for AjaxResponse
```
#### Example Usage
```javascript
ajax({
    url: "https://google.com",
    method: "GET",
    callback: res => {
        console.log(res.responseText);
    }
});
// Send ajax request to 'https://google.com' with GET method.
// And log responseText to console.
```

### Credit
Made by KRonae(Github: KR-onae) 2024
EzAjax License, Copyright (c) 2024 KRonae(Github: KR-onae)
EzAjax-NodeJS-v1.0.3 ([EzAjax Github Repository](https://github.com/KR-onae/EzAjax))