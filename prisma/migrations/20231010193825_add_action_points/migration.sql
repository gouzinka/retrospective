-- CreateTable
CREATE TABLE "ActionPoint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "retrospectiveId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ActionPoint_retrospectiveId_fkey" FOREIGN KEY ("retrospectiveId") REFERENCES "Retrospective" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
