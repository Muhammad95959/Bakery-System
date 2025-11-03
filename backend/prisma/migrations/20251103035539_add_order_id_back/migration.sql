/*
  Warnings:

  - You are about to drop the `_OrderToOrderItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId,orderId]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_OrderToOrderItem" DROP CONSTRAINT "_OrderToOrderItem_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_OrderToOrderItem" DROP CONSTRAINT "_OrderToOrderItem_B_fkey";

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."_OrderToOrderItem";

-- CreateIndex
CREATE UNIQUE INDEX "order_items_productId_orderId_key" ON "order_items"("productId", "orderId");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
