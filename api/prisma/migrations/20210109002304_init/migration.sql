-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "subid" TEXT NOT NULL,
    "avatar" TEXT,
    "nickname" TEXT,
    "website" TEXT,
    "podcastId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Podcast" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverArt" TEXT,
    "categoryId" INTEGER NOT NULL,
    "language" TEXT,
    "isExplicit" BOOLEAN DEFAULT false,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publishDate" TIMESTAMP(3),
    "podcastId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.subid_unique" ON "User"("subid");

-- CreateIndex
CREATE UNIQUE INDEX "Podcast.name_unique" ON "Podcast"("name");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY("podcastId")REFERENCES "Podcast"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Podcast" ADD FOREIGN KEY("categoryId")REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD FOREIGN KEY("podcastId")REFERENCES "Podcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;
