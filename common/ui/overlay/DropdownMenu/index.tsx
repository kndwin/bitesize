import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled } from "stitches.config";
import { keyframes } from "@stitches/react";

export const Root = DropdownMenuPrimitive.Root;

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

export const Trigger = styled(DropdownMenuPrimitive.Trigger, {
  border: "none",
  background: "transparent",
});

export const Content = styled(DropdownMenuPrimitive.Content, {
  minWidth: 120,
  backgroundColor: "$slate1",
  borderRadius: "$1",
  padding: "$1",
  border: "1px solid $slate6",
  boxShadow: "$5", 
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  animationFillMode: "forwards",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
});

const itemStyles = {
  fontFamily: "$untitled",
  fontSize: "$2",
  color: "$slate12",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "$4",
  padding: "$1",
  position: "relative",
  userSelect: "none",
  cursor: "pointer",

  "&[data-disabled]": {
    color: "$slate8",
    pointerEvents: "none",
  },

  "&:focus": {
    backgroundColor: "$slate2",
    outline: "1px solid $slate3",
  },

  "&:hover": {
    backgroundColor: "$slate1",
  },
};

export const Item = styled(DropdownMenuPrimitive.Item, {
  ...itemStyles,
});

export const CheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
  ...itemStyles,
});
export const RadioItem = styled(DropdownMenuPrimitive.RadioItem, {
  ...itemStyles,
});

export const TriggerItem = styled(DropdownMenuPrimitive.TriggerItem, {
  '&[data-state="open"]': {
    backgroundColor: "$slate6",
    color: "$slate12",
  },
  ...itemStyles,
});
