import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { combinedRouters } from 'trpc/routers'

export const appRouter = combinedRouters

// export type definition of API
export type AppRouter = typeof combinedRouters;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
