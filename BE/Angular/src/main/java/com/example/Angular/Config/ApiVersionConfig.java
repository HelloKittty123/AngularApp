package com.example.Angular.Config;

import com.example.Angular.Ultity.CustomAnnotation.ApiVersion;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcRegistrations;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.web.servlet.mvc.condition.PatternsRequestCondition;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;

@Configuration
public class ApiVersionConfig implements WebMvcRegistrations {

    @Override
    public RequestMappingHandlerMapping getRequestMappingHandlerMapping() {
        return new ApiVersionRequestMappingHandlerMapping();
    }

    private class ApiVersionRequestMappingHandlerMapping extends RequestMappingHandlerMapping {
        @Override
        protected void registerHandlerMethod(Object handler, Method method, RequestMappingInfo mapping) {
            Class<?> beanType = method.getDeclaringClass();
            ApiVersion apiVersion = AnnotatedElementUtils.findMergedAnnotation(beanType, ApiVersion.class);
            if (apiVersion != null) {
                String version = apiVersion.value();
                PatternsRequestCondition apiPattern = new PatternsRequestCondition("/api/v" + version + mapping.getPatternsCondition().getPatterns().toArray()[0]);
                RequestMappingInfo apiVersionMapping = new RequestMappingInfo(
                        mapping.getName(),
                        apiPattern,
                        mapping.getMethodsCondition(),
                        mapping.getParamsCondition(),
                        mapping.getHeadersCondition(),
                        mapping.getConsumesCondition(),
                        mapping.getProducesCondition(),
                        mapping.getCustomCondition()
                );
                super.registerHandlerMethod(handler, method, apiVersionMapping);
            } else {
                super.registerHandlerMethod(handler, method, mapping);
            }
        }
    }
}
