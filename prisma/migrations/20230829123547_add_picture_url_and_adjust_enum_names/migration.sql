/*
  Warnings:

  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `independency_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `space_requirement` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `url` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "IndependencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "SpaceRequirement" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL,
DROP COLUMN "independency_level",
ADD COLUMN     "independency_level" "IndependencyLevel" NOT NULL,
DROP COLUMN "space_requirement",
ADD COLUMN     "space_requirement" "SpaceRequirement" NOT NULL;

-- AlterTable
ALTER TABLE "pictures" ADD COLUMN     "url" TEXT NOT NULL;

-- DropEnum
DROP TYPE "energyLevel";

-- DropEnum
DROP TYPE "independencyLevel";

-- DropEnum
DROP TYPE "spaceRequirement";
