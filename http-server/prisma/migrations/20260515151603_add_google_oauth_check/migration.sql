-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ProviderGoogle" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "password" DROP NOT NULL;
