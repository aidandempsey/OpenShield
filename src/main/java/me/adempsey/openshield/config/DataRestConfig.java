package me.adempsey.openshield.config;

import me.adempsey.openshield.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){
        HttpMethod[] unsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };

        config.exposeIdsFor(Incident.class);
        config.exposeIdsFor(Comment.class);
        config.exposeIdsFor(Organization.class);
        config.exposeIdsFor(Task.class);
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Device.class);

        disableHttpMethods(Incident.class, config, unsupportedActions);
        disableHttpMethods(Comment.class, config, unsupportedActions);
        disableHttpMethods(Organization.class, config, unsupportedActions);
        disableHttpMethods(Task.class, config, unsupportedActions);
        disableHttpMethods(User.class, config, unsupportedActions);
        disableHttpMethods(Device.class, config, unsupportedActions);

        /* Configure CORS Mapping*/
        String allowedOrigins = "http://localhost:3000";
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigins);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));
    }
}