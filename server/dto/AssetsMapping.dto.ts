import { IsOptional, IsString } from 'class-validator'

export class AssetsMappingDto {
  @IsString()
  deviceId: string

  @IsString()
  @IsOptional()
  assetKey: string|null
}
