import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validateEnvironmentVariables } from './env.validation'

export interface EnvModuleOptions<T> {
	/** The environment class with class-validator decorators */
	env: new () => T extends object ? T : never
}
/**
 * A Dynamic Module that uses ConfigModule.forRoot internally
 * and class-validator for environment validation.
 */
@Module({})
export class EnvModule {
	static forRoot<T>(options: EnvModuleOptions<T>): DynamicModule {
		const { env } = options

		return {
			module: EnvModule,
			global: true,
			imports: [
				ConfigModule.forRoot({
					validate: config => validateEnvironmentVariables(config, env),
				}),
			],
			exports: [ConfigModule],
		}
	}
}
