import { Page, Text, Avatar, Box, DropdownMenu as Menu } from "common/ui";
import { useSession, signOut } from "next-auth/react";
import { IconButtonThemeToggle } from "modules/landing";
import { ExitIcon } from "@radix-ui/react-icons";

import { styled } from "stitches.config";

export function Dashboard() {
  const { data: session } = useSession();

  return (
    <Page>
      <Flex css={{ jc: "space-between", w: "100%" }}>
        <Text size="8" css={{ fontWeight: "bold" }}>
          Welcome {session?.user?.name.split(" ")[0]}
        </Text>
        <Flex>
          <IconButtonThemeToggle />
          <AvatarSettings />
        </Flex>
      </Flex>
    </Page>
  );
}

const AvatarSettings = () => {
  const { data: session } = useSession();
  return (
    <Menu>
      <Menu.Trigger asChild>
        <Avatar size="4" src={session?.user?.image} />
      </Menu.Trigger>
      <Menu.Content sideOffset={4}>
        <Menu.Item
					onClick={() => signOut({ callbackUrl: "/"})}
          css={{ jc: "space-between", color: "$red9", fontWeight: "bold" }}
        >
          {`Log out`}
          <ExitIcon />
        </Menu.Item>
      </Menu.Content>
    </Menu>
  );
};

const Flex = styled(Box, {
  display: "flex",
  gap: "$2",
  ai: "center",
});
