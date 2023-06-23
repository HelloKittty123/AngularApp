package com.example.Angular.Ultity.Constant;

public class Common {
    public static final String[] Swagger = {
            // -- Swagger UI v2
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            // -- Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**"
            // other public endpoints of your API may be appended to this array
    };

    public static final String ACCESS_TOKEN = "access_token";
    public static class Claims {
        public static final String USER_NAME = "user_name";
    }
}
