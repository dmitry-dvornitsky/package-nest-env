import { Module } from '@nestjs/common'
import { EnvironmentVariables } from '../lib/env'
import { EnvModule } from '../lib/env.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [
		EnvModule.forRoot({
			env: EnvironmentVariables,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
