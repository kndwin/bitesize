import { styled } from "stitches.config";

export const Page = styled("div", {
  // Reset
  boxSizing: "border-box",
  // Style
  padding: "$2",
  height: "100%",
	minHeight: "100vh", 
  width: "stretch",
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
