-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,
    "daily_streak" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoralInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genus" TEXT NOT NULL,
    "main_image" TEXT NOT NULL,
    "gallery_urls" TEXT[],
    "id_tips" TEXT NOT NULL,
    "fun_fact" TEXT NOT NULL,
    "distribution" TEXT NOT NULL,

    CONSTRAINT "CoralInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBadge" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "badgeId" INTEGER NOT NULL,
    "earned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyChallenge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "time_limit" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "genus" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "header" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "options" TEXT[],

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursesCompleted" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoursesCompleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyChallengesCompleted" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "daily_challengeId" INTEGER NOT NULL,
    "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyChallengesCompleted_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseQuestions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserBadge_userId_badgeId_key" ON "UserBadge"("userId", "badgeId");

-- CreateIndex
CREATE UNIQUE INDEX "CoursesCompleted_userId_courseId_key" ON "CoursesCompleted"("userId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyChallengesCompleted_userId_daily_challengeId_key" ON "DailyChallengesCompleted"("userId", "daily_challengeId");

-- CreateIndex
CREATE INDEX "_CourseQuestions_B_index" ON "_CourseQuestions"("B");
