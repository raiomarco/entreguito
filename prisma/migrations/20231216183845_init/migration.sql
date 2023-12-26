-- CreateEnum
CREATE TYPE "Company" AS ENUM ('CORREIOS', 'AZUL', 'ICARO_EXPRESS');

-- CreateEnum
CREATE TYPE "packageStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'UNDELIVERED', 'CANCELED', 'PAUSED', 'BLOCKED', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "trackCode" TEXT NOT NULL,
    "company" "Company" NOT NULL,
    "status" "packageStatus" NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "forecast" TIMESTAMP(3),
    "origin" TEXT,
    "destination" TEXT,
    "customStatus" TEXT,
    "weight" TEXT,
    "volumes" TEXT,
    "lastUpdate" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Update" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "info" TEXT NOT NULL,
    "location" TEXT,
    "subStatus" TEXT[],
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Update_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Update" ADD CONSTRAINT "Update_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
