package io.github.kronae.ezajax;

public enum AjaxMethod {
    GET("GET"),
    POST("POST");
    private final String name;
    AjaxMethod(String name) {
        this.name = name;
    }
    @Override
    public String toString() {
        return name;
    }
}
