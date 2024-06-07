### How to prepare to use?
Use file(`out/EzAjax-Java-v1.0.0.jar`) to use the library.
How? Just search on google.

## Usage
Example:
```java
import io.github.kronae.ezajax.Ajax;
import io.github.kronae.ezajax.AjaxMethod;
import io.github.kronae.ezajax.AjaxResponse;

import java.io.IOException;
import java.net.URISyntaxException;

public class Test {
    public static void main(String[] args) throws IOException, URISyntaxException {
        AjaxResponse response = new Ajax(AjaxMethod.GET, "https://google.com").request();
        System.out.println(response.getData());
    }
}
```

### Credit
Made by KRonae(Github: KR-onae) 2024
EzAjax License, Copyright (c) 2024 KRonae(Github: KR-onae)
EzAjax-Java-v1.0.0 ([EzAjax Github Repository](https://github.com/KR-onae/EzAjax))