import { styled } from "stitches.config";

export const StyledIconCheck = styled("div", {
  br: "$pill",
  size: "$5",
  bc: "$slate7",
  display: "flex",
  ai: "center",
  jc: "center",
  variants: {
    checked: {
      true: {
        bc: "$grass5",
      },
    },
  },
});
