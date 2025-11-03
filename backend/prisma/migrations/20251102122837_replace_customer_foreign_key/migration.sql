/*
  Warnings:

  - You are about to drop the column `customerId` on the `orders` table. All the data in the column will be lost.
  - Added the required column `customer` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."orders" DROP CONSTRAINT "orders_customerId_fkey";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "customerId",
ADD COLUMN     "customer" TEXT NOT NULL;
