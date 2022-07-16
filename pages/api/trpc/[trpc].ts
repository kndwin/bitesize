import { createRouter } from "trpc/utils";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import * as Routes from "trpc/routers";

export const appRouter = createRouter()
  .merge("courses.", Routes.coursesRouter)
  .merge("curriculum.", Routes.curriculumRouter)
  .merge("units.", Routes.unitsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
