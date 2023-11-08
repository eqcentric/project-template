import { IsBoolean } from 'class-validator'

export class ConnectionUpdateDto {
  @IsBoolean()
  Enabled: boolean;
}
