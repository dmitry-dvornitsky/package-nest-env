import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config'
import { validateEnvironmentVariables } from './env.validation'

export interface EnvModuleOptions<T> {
	/** The environment class with class-validator decorators */
	env: new () => T extends object ? T : never

	/** Options passed to ConfigModule.forRoot (optional) */
	settings: Omit<ConfigModuleOptions, 'validate'>
}
/**
 * A Dynamic Module that uses ConfigModule.forRoot internally
 * and class-validator for environment validation.
 */
@Module({})
export class EnvModule {
	static forRoot<T>(options: EnvModuleOptions<T>): DynamicModule {
		const { env, settings } = options

		return {
			module: EnvModule,
			global: settings.isGlobal ?? true, // often you want it global
			imports: [
				ConfigModule.forRoot({
					...settings,
					validate: config => validateEnvironmentVariables(config, env),
				}),
			],
			exports: [ConfigModule],
		}
	}
}
