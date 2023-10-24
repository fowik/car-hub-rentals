/*
  Warnings:

  - You are about to drop the column `engineCapacity` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerMinute` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `engineCapacity`,
    DROP COLUMN `pricePerMinute`,
    DROP COLUMN `type`;
