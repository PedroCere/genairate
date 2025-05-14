package com.geneairate.userservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;

public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Oxi Carbon Footprint API")
                        .version("1.0")
                        .description("API para calcular y registrar emisiones de carbono basadas en datos energéticos, de transporte y materiales."));
    }

}
