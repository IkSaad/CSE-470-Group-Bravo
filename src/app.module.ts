import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres', // Replace with your PostgreSQL username
            password: 'saad1234', // Replace with your PostgreSQL password
            database: 'eco_shop',
            autoLoadEntities: true,
            synchronize: true,
        }),
        ProductsModule,
        UsersModule,
        AuthModule,
        CartModule
    ],
})
export class AppModule {}
