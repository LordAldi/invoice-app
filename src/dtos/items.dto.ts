import { IsDateString, IsInt,  IsString  } from 'class-validator';
import { CreateAddressDto } from './addresses.dto';
export class CreateItemDto {

  @IsString()
  public name: string;
  
  @IsInt()
  public price:number
  
  @IsInt()
  public quantity:number

  
}
