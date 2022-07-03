import { useSession, signOut } from "next-auth/react";
import type { ReactNode } from "react";
import { ExitIcon } from "@radix-ui/react-icons";

import { IconButtonThemeToggle } from "modules/landing";
import { Page, Text, Avatar, Box, DropdownMenu as Menu } from "common/ui";
import { styled } from "stitches.config";

type HeaderProps = {
  left?: ReactNode;
};

export const Header = ({ left }: HeaderProps) => {
  const { data: session } = useSession();
  return (
    <Flex css={{ jc: "space-between", w: "100%", mb: "$3" }}>
			<Flex>
				{left}
			</Flex>
      <Flex>
        <IconButtonThemeToggle />
        <AvatarSettings />
      </Flex>
    </Flex>
  );
};

const AvatarSettings = () => {
  const { data: session } = useSession();
  return (
    <Menu>
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
    </Menu>
  );
};

const Flex = styled(Box, {
  display: "flex",
  gap: "$2",
  ai: "center",
});
