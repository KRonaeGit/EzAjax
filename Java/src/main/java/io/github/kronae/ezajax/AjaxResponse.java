package io.github.kronae.ezajax;

public class AjaxResponse {
    private final int code;
    private final String data;

    public AjaxResponse(int responseCode, String data) {
        this.code = responseCode;
        this.data = data;
    }
    public int getResponseCode() {
        return code;
    }
    public String getData() {
        return data;
    }
}
