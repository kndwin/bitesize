import { createRouter } from "trpc/utils";
import { prisma } from "prisma/client";
import { z } from "zod";

export const unitsRouter = createRouter()
  .query("get-one", {
    input: z.object({
      unitId: z.string().nullish(),
    }),
    async resolve({ input }) {
      const unit = await prisma.unit.findFirst({
        where: { id: input.unitId },
      });
      return unit;
    },
  })
