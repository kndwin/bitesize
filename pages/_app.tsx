import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import { AppRouter } from "./api/trpc/[trpc]";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { darkTheme, globalCss } from "stitches.config";

const globalStyle = globalCss({
  "html, body": {
    margin: 0,
    padding: 0,
		background: "$slate1"
  },
});

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  globalStyle();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return { url };
  },
  ssr: true,
})(App);
