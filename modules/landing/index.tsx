import { signIn } from "next-auth/react";

import { styled } from "stitches.config";
import { Page, Text, Button, IconButton, Box } from "common/ui";
import { IconButtonThemeToggle } from "modules/dashboard/Header";

export function Landing() {
  return (
    <Page variant="container">
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
  fd: "row-reverse",
});

const ButtonLogin = () => {
  return (
    <Button
      onClick={() =>
        signIn("github", {
          redirect: true,
          callbackUrl: "http://localhost:3000/dashboard",
        })
      }
      size="2"
      variant="green"
      css={{ w: "fit-content" }}
    >
      Sign in
    </Button>
  );
};
