import { IsEmail, IsString } from 'class-validator';

export class CreateAddressDto {
  
  @IsString()
  public streetAddress: string;

  @IsString()
  public city: string;

  @IsString()
  public postCode: string;
  
  @IsString()
  public country: string;
}
