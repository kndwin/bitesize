import { styled } from "stitches.config";

export const Page = styled("div", {
  // Reset
  boxSizing: "border-box",
  // Style
  padding: "$2",
  height: "stretch",
  width: "stretch",
  background: "$whiteA1",
	variants: {
		variant: {
			dashboard: {
			},
			container: {
				maxWidth: "60em",
				mx: "auto"
			}
		}
	},
	defaultVariants: {
		variant: "dashboard"
	}
});
