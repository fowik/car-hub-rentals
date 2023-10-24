/*
  Warnings:

  - Added the required column `engineCapacity` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` ADD COLUMN `engineCapacity` INTEGER NOT NULL,
    ADD COLUMN `pricePerHour` DOUBLE NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
