-- CreateTable
CREATE TABLE "CompanySummary" (
    "id" SERIAL NOT NULL,
    "reportedCompanyId" INTEGER NOT NULL,
    "calculatedSummary" TEXT,
    "summary" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP,

    CONSTRAINT "CompanySummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanySummary_reportedCompanyId_key" ON "CompanySummary"("reportedCompanyId");

-- AddForeignKey
ALTER TABLE "CompanySummary" ADD CONSTRAINT "CompanySummary_reportedCompanyId_fkey" FOREIGN KEY ("reportedCompanyId") REFERENCES "ReportedCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;
