import { createRouter } from "trpc/utils";
import { prisma } from "prisma/client";
import { z } from "zod";

export const coursesRouter = createRouter()
  .query("get-one", {
    input: z.object({
      id: z.string().nullish(),
    }),
    async resolve({ input }) {
      const course = await prisma.course.findFirst({ where: { id: input.id } });
      return course;
    },
  })
  .query("get-all", {
    resolve: async () => {
      const courses = await prisma.course.findMany();
      return courses;
    },
  });
