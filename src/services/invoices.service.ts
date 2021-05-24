import { PrismaClient, Invoice } from '@prisma/client';
import { CreateInvoiceDto } from '@dtos/invoices.dto';
import HttpException from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class InvoiceService {
  public invoices = new PrismaClient().invoice;

  public async findAllInvoice(userId:number): Promise<Invoice[]> {
    const allInvoice: Invoice[] = await this.invoices.findMany({where:{userId:userId},include:{to:true,from:true}});
    return allInvoice;
  }

  public async findInvoiceById(invoiceId: number,userId:number): Promise<Invoice> {
    if (isEmpty(invoiceId)) throw new HttpException(400, "input a valid invoiceId ");

    const findInvoice: Invoice = await this.invoices.findFirst({ where: { id:invoiceId,userId:userId  },include:{to:true,from:true}});
    if (!findInvoice) throw new HttpException(404, "invoice not found");

    return findInvoice;
  }

  public async createInvoice(invoiceData: CreateInvoiceDto, userId:number): Promise<Invoice> {
    if (isEmpty(invoiceData)) throw new HttpException(400, "input a valid invoiceData ");

    const createInvoiceData: Invoice = await this.invoices.create({ data: { 
        name:invoiceData.name, 
        email:invoiceData.email, 
        date:invoiceData.date,
        user:{
            connect:{
                id:userId
            }
        },
        paymentTerm:invoiceData.paymentTerm, description:invoiceData.description,
        to:{
            create:{
                ...invoiceData.to
            }
        },
        from:{
            create:{
                ...invoiceData.from
            }
        } 
    } 
});
    return createInvoiceData;
  }

  public async updateInvoice(invoiceId: number, invoiceData: CreateInvoiceDto, userId:number): Promise<Invoice> {
    if (isEmpty(invoiceData)) throw new HttpException(400, "input a valid invoiceData ");

    const findInvoice: Invoice = await this.invoices.findUnique({ where: { id: invoiceId } });
    if (!findInvoice) throw new HttpException(404, "invoice not found");
    if (findInvoice.userId !== userId) throw new HttpException(403, "access denied")

    
    const updateInvoiceData = await this.invoices.update({ where: { id: invoiceId }, data: { 
        name:invoiceData.name, 
        email:invoiceData.email, 
        date:invoiceData.date,
        user:{
            connect:{
                id:userId
            }
        },
        paymentTerm:invoiceData.paymentTerm, description:invoiceData.description,
        to:{
            create:{
                ...invoiceData.to
            }
        },
        from:{
            create:{
                ...invoiceData.from
            }
        } 
    
    } });
    return updateInvoiceData;
  }

  public async deleteInvoice(invoiceId: number,userId:number): Promise<Invoice> {
    if (isEmpty(invoiceId)) throw new HttpException(400, "input a valid invoiceId");

    const findInvoice: Invoice = await this.invoices.findUnique({ where: { id: invoiceId } });
    if (!findInvoice) throw new HttpException(404, "invoice not found");
    if (findInvoice.userId !== userId) throw new HttpException(403, "access denied")
    
    const deleteInvoiceData = await this.invoices.delete({ where: { id: invoiceId } });
    return deleteInvoiceData;
  }
}

export default InvoiceService;
