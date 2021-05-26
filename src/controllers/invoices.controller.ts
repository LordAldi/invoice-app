import { NextFunction, Request, Response } from 'express';
import { Invoice } from '@prisma/client';
import { CreateInvoiceDto } from '@dtos/invoices.dto';
import invoiceService from '@services/invoices.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class InvoicesController {
  public invoiceService = new invoiceService();

  public getInvoices = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);

      const findAllInvoicesData: Invoice[] = await this.invoiceService.findAllInvoice(userId);

      res.status(200).json({ data: findAllInvoicesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getInvoiceById = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const invoiceId = Number(req.params.id);
      const findOneInvoiceData: Invoice = await this.invoiceService.findInvoiceById(invoiceId,userId);

      res.status(200).json({ data: findOneInvoiceData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createInvoice = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      
      const userId = Number(req.user.id);
      const invoiceData: CreateInvoiceDto = req.body;
      const createInvoiceData: Invoice = await this.invoiceService.createInvoice(invoiceData,userId);

      res.status(201).json({ data: createInvoiceData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateInvoice = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const invoiceId = Number(req.params.id);
      const userId = Number(req.user.id);
      const invoiceData: CreateInvoiceDto = {...req.body, userId};
      const updateInvoiceData: Invoice = await this.invoiceService.updateInvoice(invoiceId, invoiceData,userId);

      res.status(200).json({ data: updateInvoiceData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteInvoice = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const invoiceId = Number(req.params.id);
      const deleteInvoiceData: Invoice = await this.invoiceService.deleteInvoice(invoiceId,userId);

      res.status(200).json({ data: deleteInvoiceData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default InvoicesController;
