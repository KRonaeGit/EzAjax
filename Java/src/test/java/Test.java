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
