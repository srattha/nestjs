"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('My API')
        .setDescription('API used for testing purpose')
        .setVersion('1.0.0')
        .setBasePath('api')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token',
    })
        .addSecurityRequirements('bearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(cookieParser());
    app.enableCors();
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Running API in MODE :${process.env.NODE_ENV} on Port: ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map