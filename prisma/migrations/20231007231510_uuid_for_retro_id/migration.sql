/*
  Warnings:

  - The primary key for the `Retrospective` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "retrospectiveId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Board_retrospectiveId_fkey" FOREIGN KEY ("retrospectiveId") REFERENCES "Retrospective" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Board" ("createdAt", "id", "retrospectiveId", "title") SELECT "createdAt", "id", "retrospectiveId", "title" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
CREATE TABLE "new_Retrospective" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Retrospective_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Retrospective" ("createdAt", "creatorId", "id", "title") SELECT "createdAt", "creatorId", "id", "title" FROM "Retrospective";
DROP TABLE "Retrospective";
ALTER TABLE "new_Retrospective" RENAME TO "Retrospective";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
