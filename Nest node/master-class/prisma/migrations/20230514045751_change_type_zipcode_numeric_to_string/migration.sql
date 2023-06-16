-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "document" TEXT,
    "acceptedTermsAndConditions" BOOLEAN NOT NULL,
    "zipcode" TEXT NOT NULL,
    "street" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("acceptedTermsAndConditions", "birthdate", "city", "createdAt", "document", "email", "id", "name", "neighborhood", "password", "state", "street", "updatedAt", "zipcode") SELECT "acceptedTermsAndConditions", "birthdate", "city", "createdAt", "document", "email", "id", "name", "neighborhood", "password", "state", "street", "updatedAt", "zipcode" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
