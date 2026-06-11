import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIntegrationDto {
  @IsNotEmpty()
  provider_name: string;

  @IsNotEmpty()
  auth_token: string;

  @IsNotEmpty()
  endpoint: string;

  @IsOptional()
  method?: string | null;
}

export class EditIntegrationDto {
  @IsOptional()
  provider_name?: string;

  @IsOptional()
  auth_token?: string;

  @IsOptional()
  endpoint?: string;

  @IsOptional()
  method?: string | null;
}
