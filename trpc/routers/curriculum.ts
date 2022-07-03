import { createRouter } from "trpc/utils";
import { prisma } from "prisma/client";
import { z } from "zod";

export const curriculumRouter = createRouter().query("get-overview", {
  input: z.object({
    courseId: z.string().nullish(),
  }),
  async resolve({ input }) {
    const curriculum = await prisma.curriculum.findFirst({
      where: { courseId: input.courseId },
      include: {
        sections: {
          include: {
            units: true,
          },
        },
      },
    });
    return curriculum;
  },
});
