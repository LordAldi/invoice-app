import bcrypt from 'bcrypt';
import { PrismaClient, Address } from '@prisma/client';
import { CreateAddressDto } from '@dtos/addresses.dto';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class AddressService {
  public addresses = new PrismaClient().address;

  public async findAllAddress(): Promise<Address[]> {
    const allAddress: Address[] = await this.addresses.findMany();
    return allAddress;
  }

  public async findAddressById(addressId: number): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(400, "input a valid addressId ");

    const findAddress: Address = await this.addresses.findUnique({ where: { id: addressId } });
    if (!findAddress) throw new HttpException(404, "address not found");

    return findAddress;
  }

  public async createAddress(addressData: CreateAddressDto): Promise<Address> {
    if (isEmpty(addressData)) throw new HttpException(400, "input a valid addressData ");

    const createAddressData: Address = await this.addresses.create({ data: { ...addressData } });
    return createAddressData;
  }

  public async updateAddress(addressId: number, addressData: CreateAddressDto): Promise<Address> {
    if (isEmpty(addressData)) throw new HttpException(400, "input a valid addressData ");

    const findAddress: Address = await this.addresses.findUnique({ where: { id: addressId } });
    if (!findAddress) throw new HttpException(404, "address not found");

    
    const updateAddressData = await this.addresses.update({ where: { id: addressId }, data: { ...addressData } });
    return updateAddressData;
  }

  public async deleteAddress(addressId: number): Promise<Address> {
    if (isEmpty(addressId)) throw new HttpException(400, "input a valid addressId");

    const findAddress: Address = await this.addresses.findUnique({ where: { id: addressId } });
    if (!findAddress) throw new HttpException(404, "address not found");

    const deleteAddressData = await this.addresses.delete({ where: { id: addressId } });
    return deleteAddressData;
  }
}

export default AddressService;
