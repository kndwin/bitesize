import { styled } from "stitches.config";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { CheckIcon } from "@radix-ui/react-icons";

import { Box, Text, Page, Button } from "common/ui";
import { Header, IconButtonBack } from "modules/dashboard/Header";
import trpc from "trpc/hooks";

import { CustomSandpack } from "./CustomSandpack";
import { themeEditorDark, themeEditorLight } from "./theme";
import { StyledIconCheck } from "./common";
import { Markdown } from "./markdown";

const tests = [
  { id: 1, label: `Text should say "Hello Component"`, passed: true },
  {
    id: 2,
    label: `Text should say "Hello Component a realllllyyyy lonnggg texytt"`,
    passed: false,
  },
];

const md = `# Hello world!

Welcome to your first component

Consectetur blanditiis sit harum itaque at at Facere ut labore tempore quae laudantium. Corporis tenetur sit totam expedita perspiciatis. Fuga perferendis esse numquam cum a harum debitis impedit? Autem molestiae?

~~~js
const hello = "world"
~~~

`;

const files = {
	"/App.js": `export default function App() {
	return <h1>Hello!</h1>
}`
}

export const Unit = () => {
  const router = useRouter();
  const unitId = router.query?.unitId as string;
  const { data: unit, status } = trpc.useQuery(["units.get-one", { unitId }], {
    enabled: Boolean(unitId),
  });
  const { resolvedTheme } = useTheme();
  const theme =  themeEditorDark;

  const backPath = `/dashboard/course/${router.query.courseId}`;

  return (
    <Page css={{ d: "flex", fd: "column" }}>
      <Header
        left={
          <>
            <IconButtonBack path={backPath} />
            <Text size="6" css={{ fw: "bold" }}>
              {unit?.label}
            </Text>
          </>
        }
      />

      <StyledContainer>
        <StyledLeftPanel>
					<Markdown markdown={md} />
					
          <Box css={{ d: "flex", fd: "column", gap: "$3" }}>
            <Box css={{ d: "flex", fd: "column", gap: "$3" }}>
              <Button size="3">{`Run tests`}</Button>
              <Button size="3">{`Reset`}</Button>
            </Box>
            <Box css={{ d: "flex", fd: "column", gap: "$3" }}>
              {tests.map((t) => (
                <TestContainer key={t.id} passed={t.passed}>
                  {t.label}
                </TestContainer>
              ))}
            </Box>
          </Box>
        </StyledLeftPanel>
        <StyledEditorContainer>
          <CustomSandpack {...{ files, theme}} />
        </StyledEditorContainer>
      </StyledContainer>
    </Page>
  );
};

const StyledEditorContainer = styled("div", {
  flex: 1,
  d: "flex",
  fd: "column",
	br: "$3", 
	overflow: "hidden"
});

const StyledContainer = styled("div", {
  d: "flex",
  flex: 1,
  h: "100%",
  gap: "$3",
});

const StyledLeftPanel = styled("div", {
  p: "$3",
	background: "$whiteA1", 
  width: 400,
  gap: "$2",
  d: "flex",
  fd: "column",
  jc: "space-between",
});

const TestContainer = ({
  children,
  passed,
}: {
  children: ReactNode;
  passed: boolean;
}) => {
  return (
    <StyledTestContainer>
      <StyledIconCheck checked={passed}>
        {passed && <CheckIcon />}
      </StyledIconCheck>
      <Text css={{ lh: "1.4em" }}>{children}</Text>
    </StyledTestContainer>
  );
};

const StyledTestContainer = styled("div", {
  bc: "$slate4",
  br: "$4",
  p: "$2",
  d: "flex",
  ai: "center",
  gap: "$3",
});
