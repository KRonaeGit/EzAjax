package io.github.kronae.ezajax;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class Ajax {
    private final String data;
    private final AjaxMethod method;
    private final String url;
    private final Map<String, String> headers;
    public Charset charset = StandardCharsets.UTF_8;

    public Ajax(AjaxMethod method, String url) {
        this.method = method;
        this.url = url;
        this.data = null;
        this.headers = new HashMap<>();
    }
    public Ajax(AjaxMethod method, String url, String data) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.headers = new HashMap<>();
    }
    public Ajax(AjaxMethod method, String url, String data, Map<String, String> headers) {
        this.method = method;
        this.url = url;
        this.data = data;
        this.headers = headers;
    }
    public String getData() {
        return data;
    }
    public AjaxMethod getMethod() {
        return method;
    }
    public String getUrl() {
        return url;
    }
    public AjaxResponse request() throws IOException, URISyntaxException {
        URL urlo = new URI(url).toURL();
        HttpURLConnection con = (HttpURLConnection) urlo.openConnection();

        con.setRequestMethod(method.toString());

        if(data != null) {
            byte[] bytes = data.getBytes(StandardCharsets.UTF_8);
            int length = bytes.length;

//            con.setRequestProperty("Accept", "*/*");

            // con.setRequestProperty("Accept-Encoding", "gzip, deflate");
            // con.setRequestProperty("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
            // con.setRequestProperty("Connection", "keep-alive");

//            con.setRequestProperty("Content-Type", "application/json; " + charset.displayName());
//            con.setRequestProperty("Charset", charset.displayName());
//            con.setRequestProperty("Content-Length", Integer.toString(length));
//            con.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36");
//            con.setRequestProperty("X-Requested-With", "XMLHttpRequest");
//            con.setRequestProperty("Host", urlo.getHost());
//            con.setRequestProperty("Origin", url.startsWith("https://") ? "https://" + urlo.getHost() : "http://" + urlo.getHost());
//            con.setRequestProperty("Referer", url);

            for (String key : headers.keySet()) {
                String val = headers.get(key);
                con.setRequestProperty(key, val);
            }

            con.setDoOutput(true);
            try (OutputStream os = con.getOutputStream()) {
                os.write(bytes, 0, length);
            }
        }


        con.connect();

        int code = con.getResponseCode();
        BufferedReader reader;
        if (code != 200 && con.getErrorStream() != null) {
            System.err.println(code);
            reader = new BufferedReader(new InputStreamReader(con.getErrorStream(), charset));
        } else {
            reader = new BufferedReader(new InputStreamReader(con.getInputStream(), charset));
        }

        String t, r = "";
        while ((t = reader.readLine()) != null)
            r += t;

        return new AjaxResponse(code, r);
    }
}
