import { IsString } from 'class-validator'

export class EnvironmentVariables {
	@IsString()
	TEST: string
}
