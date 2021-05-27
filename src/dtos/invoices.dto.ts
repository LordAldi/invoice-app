import { Type } from 'class-transformer';
import { IsDateString, IsEmail, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './addresses.dto';
import { CreateItemDto } from './items.dto';
export class CreateInvoiceDto {
  
  
  @ValidateNested({each:true})
  // @Type(()=>CreateAddressDto )
  public from:CreateAddressDto  

  @ValidateNested({each:true})
  // @Type(()=>CreateAddressDto )
  public to:CreateAddressDto

  @ValidateNested({each:true})
  // @Type(()=>CreateAddressDto )
  public items:CreateItemDto[]

  @IsEmail()
  public email: string;

  @IsString()
  public name: string;
  
  @IsDateString()
  public date:string
  
  @IsDateString()
  public paymentTerm:string
  
  @IsString()
  public description:string
}
