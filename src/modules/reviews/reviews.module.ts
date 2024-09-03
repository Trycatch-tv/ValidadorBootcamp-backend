import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from 'src/controllers/reviews/reviews.controller';
import { ReviewEntity } from 'src/models/review/review.entity';
import { ReviewsService } from 'src/services/reviews/reviews.service';
import { jwtConstants } from 'src/utils/jwt/constants.jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,

      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([ReviewEntity]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
