/*
  Warnings:

  - You are about to drop the column `pricePerHour` on the `cars` table. All the data in the column will be lost.
  - Added the required column `pricePerMinute` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `pricePerHour`,
    ADD COLUMN `pricePerMinute` DOUBLE NOT NULL;
