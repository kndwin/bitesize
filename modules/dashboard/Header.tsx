import { useSession, signOut } from "next-auth/react";
import { ReactNode, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  ExitIcon,
  ArrowLeftIcon,
  SunIcon,
  MoonIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";

import { Page, Text, Avatar, Box, IconButton } from "common/ui";
import * as Menu from "common/ui/overlay/DropdownMenu";
import { styled } from "stitches.config";

type HeaderProps = {
  left?: ReactNode;
};

export const Header = ({ left }: HeaderProps) => {
  const { data: session } = useSession();
  return (
    <Nav>
      <Flex>{left}</Flex>
      <Flex>
        <IconButtonThemeToggle />
        <AvatarSettings />
      </Flex>
    </Nav>
  );
};

const Nav = styled("nav", {
  display: "flex",
  jc: "space-between",
  w: "100%",
  mb: "$3",
});

const AvatarSettings = () => {
  const { data: session } = useSession();
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Avatar size="4" src={session?.user?.image as string} />
      </Menu.Trigger>
      <Menu.Content sideOffset={4}>
        <Menu.Item
          onClick={() => signOut({ callbackUrl: "/" })}
          css={{ color: "$red9" }}
        >
          <Text size="2" css={{ fontWeight: "bold" }}>
            {`Log out`}
          </Text>
          <ExitIcon />
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
};

const Flex = styled(Box, {
  display: "flex",
  gap: "$2",
  ai: "center",
});

export const IconButtonBack = ({ path }: { path: string }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(path);
  };

  return (
    <IconButton onClick={handleOnClick}>
      <ArrowLeftIcon />
    </IconButton>
  );
};

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
