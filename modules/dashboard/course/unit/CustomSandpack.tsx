import { css, styled } from "stitches.config";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackThemeProp,
} from "@codesandbox/sandpack-react";

export const CustomSandpack = ({ theme, files }: { theme: SandpackThemeProp, file: Record<string, string> }) => (
  <SandpackProvider
    theme={theme}
    template="react"
    style={{ display: "flex", flex: 1 }}
		files={files}
  >
    <StyledSandpackLayout>
      <StyledCodeEditor showTabs closableTabs style={{ height: "100%" }} />
      <StyledPreview showNavigator style={{ height: "100%" }} />
    </StyledSandpackLayout>
  </SandpackProvider>
);

const StyledSandpackLayout = styled(SandpackLayout, {
  height: "auto",
  flex: 1,
  br: "$3",
  overflow: "hidden",
});

const StyledCodeEditor = styled(SandpackCodeEditor, {
  height: "100%",
});

const StyledPreview = styled(SandpackPreview, {
  height: "100%",
});
