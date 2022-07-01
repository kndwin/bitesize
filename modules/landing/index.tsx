import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

import { signIn } from "next-auth/react";

import { styled } from "stitches.config";
import { Page, Text, Button, IconButton, Box } from "common/ui";

export function Landing() {
  return (
    <Page>
      <StyledHeader>
        <IconButtonThemeToggle />
      </StyledHeader>
      <Text size="8" css={{ fontWeight: "bold" }}>
        Bite size
      </Text>
      <Text size="5" css={{ mb: "$3", mt: "$4" }}>
        Interactive coding experience
      </Text>
      <ButtonLogin />
    </Page>
  );
}

const StyledHeader = styled("div", {
  d: "flex",
  mb: "$3",
});

export const IconButtonThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === "light" ? "dark" : "light";

    setTheme(targetTheme);
  };

  return (
    <IconButton onClick={toggleTheme} variant="ghost">
      {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

const ButtonLogin = () => {
  return (
    <Button
      onClick={() => signIn("github")}
      size="2"
      css={{ w: "fit-content" }}
    >
      Sign in
    </Button>
  );
};
