import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

export function validateEnvironmentVariables<T extends object>(
	config: Record<string, unknown>,
	env: new () => T,
): T {
	const validatedConfig = plainToInstance(env, config, {
		enableImplicitConversion: true,
	})

	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	})

	if (errors.length > 0) {
		throw new Error(errors.toString())
	}
	return validatedConfig
}
