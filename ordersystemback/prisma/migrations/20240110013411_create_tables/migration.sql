/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `haircut` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "haircut" DROP CONSTRAINT "haircut_user_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_haircut_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
ADD COLUMN     "nameFarm" TEXT;

-- DropTable
DROP TABLE "haircut";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "Cow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "statusInsemination" BOOLEAN DEFAULT false,
    "dateInsemination" TEXT,
    "nameBull" TEXT,
    "birthForecast" TEXT,
    "productionPerLiters" TEXT,
    "dateMilkRegistration" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "Cow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cow" ADD CONSTRAINT "Cow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
