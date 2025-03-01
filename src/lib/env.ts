import { IsString } from 'class-validator'

export class EnvironmentVariables {
	@IsString()
	LOGTAIL_TOKEN: string
}
