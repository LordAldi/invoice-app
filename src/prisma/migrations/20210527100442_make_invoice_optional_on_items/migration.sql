/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `invoiceId` INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX `Item.name_unique` ON `Item`(`name`);
