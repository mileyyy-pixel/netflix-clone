-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "subscriptionPlan" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "isKidsProfile" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "releaseYear" INTEGER,
    "maturityRating" TEXT,
    "duration" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContentItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contentId" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentItem_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WatchHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profileId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "watchedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watchedDuration" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "WatchHistory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WatchHistory_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentGenres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ContentGenres_A_fkey" FOREIGN KEY ("A") REFERENCES "Content" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContentGenres_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProfileWatchlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ProfileWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "ContentItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfileWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentGenres_AB_unique" ON "_ContentGenres"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentGenres_B_index" ON "_ContentGenres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileWatchlist_AB_unique" ON "_ProfileWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileWatchlist_B_index" ON "_ProfileWatchlist"("B");
