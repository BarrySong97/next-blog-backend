-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "cover" TEXT;

-- AlterTable
ALTER TABLE "Setting" ALTER COLUMN "github" SET DEFAULT '',
ALTER COLUMN "weibo" SET DEFAULT '',
ALTER COLUMN "bilibili" SET DEFAULT '',
ALTER COLUMN "twitter" SET DEFAULT '',
ALTER COLUMN "bilibiliAvatar" SET DEFAULT '',
ALTER COLUMN "githubAvatar" SET DEFAULT '',
ALTER COLUMN "twitterAvatar" SET DEFAULT '',
ALTER COLUMN "weiboAvatar" SET DEFAULT '';
