import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useRouter } from "next/router";

import { Box, Text, Page } from "common/ui";
import { Header, IconButtonBack } from "modules/dashboard/Header";
import trpc from "trpc/hooks";

export const Unit = () => {
  const router = useRouter();
  const unitId = router.query?.unitId;
  const { data: unit, status } = trpc.useQuery(["units.get-one", { unitId }], {
    enabled: Boolean(unitId),
  });

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
      <Box css={{ h: "100%", flex: 1, d: "flex", fd: "column" }}>
        <CustomSandpack />
      </Box>
    </Page>
  );
};

const CustomSandpack = () => (
  <SandpackProvider template="react" style={{ display: "flex", flex: 1 }}>
    <SandpackLayout style={{ height: "auto", flex: 1 }}>
      <SandpackCodeEditor showTabs style={{ height: "100%" }} />
      <SandpackPreview showNavigator style={{ height: "100%" }} />
    </SandpackLayout>
  </SandpackProvider>
);
