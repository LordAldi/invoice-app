import { Router } from 'express';
import InvoicesController from '@controllers/invoices.controller';
import { CreateInvoiceDto } from '@dtos/invoices.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import invoiceMiddleware from '@/middlewares/invoice.middleware';

class InvoicesRoute implements Route {
  public path = '/invoices';
  public router = Router();
  public invoicesController = new InvoicesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,authMiddleware, this.invoicesController.getInvoices);
    this.router.get(`${this.path}/:id(\\d+)`,authMiddleware, this.invoicesController.getInvoiceById);
    this.router.post(`${this.path}`,authMiddleware, invoiceMiddleware, validationMiddleware(CreateInvoiceDto, 'body'), this.invoicesController.createInvoice);
    this.router.put(`${this.path}/:id(\\d+)`,authMiddleware,invoiceMiddleware, validationMiddleware(CreateInvoiceDto, 'body', true), this.invoicesController.updateInvoice);
    this.router.delete(`${this.path}/:id(\\d+)`,authMiddleware, this.invoicesController.deleteInvoice);
  }
}

export default InvoicesRoute;
