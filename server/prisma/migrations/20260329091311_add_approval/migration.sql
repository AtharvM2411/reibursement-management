-- CreateTable
CREATE TABLE "Approval" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "comments" TEXT,
    "step" INTEGER NOT NULL,
    "expenseId" TEXT NOT NULL,
    "approverId" TEXT NOT NULL
);
