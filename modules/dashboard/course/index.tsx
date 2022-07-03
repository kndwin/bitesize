import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Text, Box, Page, IconButton } from "common/ui";
import { styled } from "stitches.config";
import { useRouter } from "next/router";
import trpc from "trpc/hooks";

import { Header } from "modules/dashboard/Header";

export const Course = () => {
  const { query } = useRouter();

  const { data: course } = trpc.useQuery(
    ["courses.get-one", { id: query?.id as string }],
    {
      enabled: Boolean(query?.id),
    }
  );

  return (
    <Page variant="container">
			<Header left={<IconButtonBack />} />
      <StyledBanner>
        <StyledImage dangerouslySetInnerHTML={{ __html: course?.iconSvg }} />
      </StyledBanner>
			<Box css={{ d: "flex", fd: "column", mt: "$4", gap: "$3"}}>
        <Text size="8" css={{ fw: "bold", mx: "auto" }}>
          {course?.label}
        </Text>
        <Text size="6" css={{ mx: "auto" }}>
          {course?.description}
        </Text>
      </Box>
    </Page>
  );
};

const IconButtonBack = () => {
	const router = useRouter()

	const handleOnClick = () => {
		router.push("/dashboard")
	}

	return (
		<IconButton onClick={handleOnClick}>
			<ArrowLeftIcon />
		</IconButton>
	)
}

const StyledBanner = styled("div", {
  height: "10em",
  width: "100%",
  background: "$slate2",
  display: "flex",
  br: "$4",
});

const StyledImage = styled("div", {
  size: "$5",
  margin: "auto",
  fill: "$slate11",
});
