package me.adempsey.openshield.config;

import me.adempsey.openshield.entity.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private String alowedOrigins = "http://localhost:3000";

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
        config.exposeIdsFor(Team.class);
        config.exposeIdsFor(User.class);

        disableHttpMethods(Incident.class, config, unsupportedActions);
        disableHttpMethods(Comment.class, config, unsupportedActions);
        disableHttpMethods(Organization.class, config, unsupportedActions);
        disableHttpMethods(Task.class, config, unsupportedActions);
        disableHttpMethods(Team.class, config, unsupportedActions);
        disableHttpMethods(User.class, config, unsupportedActions);

        /* Configure CORS Mapping*/
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(alowedOrigins);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(unsupportedActions));
    }
}