import { theme, darkTheme } from "stitches.config";
import type { SandpackTheme } from "@codesandbox/sandpack-react";

export const themeEditorLight: SandpackTheme = {
  colors: {
    surface1: theme.colors.slate1.value,
    surface2: theme.colors.slate2.value,
    surface3: theme.colors.slate3.value,
    clickable: theme.colors.slate7.value,
    base: theme.colors.slate12.value,
    disabled: theme.colors.slate6.value,
    hover: theme.colors.slate10.value,
    accent: theme.colors.slate10.value,
    error: theme.colors.tomato9.value,
    errorSurface: theme.colors.tomato7.value,
  },
  syntax: {
    keyword: theme.colors.pink10.value,
    property: theme.colors.blue10.value,
    plain: theme.colors.slate12.value,
    static: theme.colors.crimson10.value,
    string: theme.colors.crimson10.value,
    definition: theme.colors.purple10.value,
    punctuation: theme.colors.slate10.value,
    tag: theme.colors.grass10.value,
    comment: {
      color: theme.colors.slate8.value,
      fontStyle: "normal",
    },
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"Fira Mono", "DejaVu Sans Mono", Menlo, Consolas, "Liberation Mono", Monaco, "Lucida Console", monospace',
    size: theme.fontSizes["4"].value,
    lineHeight: "30px",
  },
};

export const themeEditorDark: SandpackTheme = {
  colors: {
    surface1: "#222",
    surface2: "#444",
    surface3: "#333",
    clickable: darkTheme.colors.slate7.value,
    base: darkTheme.colors.slate12.value,
    disabled: darkTheme.colors.slate6.value,
    hover: darkTheme.colors.slate10.value,
    accent: darkTheme.colors.slate10.value,
    error: darkTheme.colors.tomato9.value,
    errorSurface: darkTheme.colors.tomato7.value,
  },
  syntax: {
    keyword: "#c27628",
    property: "#e5a638",
    plain: "#fff",
    static: "#8799B0",
    string: "#B0C975",
    definition: "#9B71C6",
    punctuation: "#fff",
    tag: "#ffd893",
    comment: {
      color: "#797979",
      fontStyle: "normal",
    },
  },
  font: {
    body: 'Menlo, Monaco, "Courier New", monospace',
    mono: 'Menlo, Monaco, "Courier New", monospace',
    size: theme.fontSizes["4"].value,
    lineHeight: "30px",
  },
};
