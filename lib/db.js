import { PrismaClient } from "@prisma/client";

// Use a singleton for the Prisma client so we don't recreate
// clients & trigger a "Too many clients already" error
if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export default global.prisma;
