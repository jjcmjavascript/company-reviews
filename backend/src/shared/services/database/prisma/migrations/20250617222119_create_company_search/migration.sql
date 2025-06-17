-- CreateTable
CREATE TABLE "CompanySearch" (
    "id" SERIAL NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanySearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanySearch_reportedCompanyId_key" ON "CompanySearch"("reportedCompanyId");

-- AddForeignKey
ALTER TABLE "CompanySearch" ADD CONSTRAINT "CompanySearch_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
