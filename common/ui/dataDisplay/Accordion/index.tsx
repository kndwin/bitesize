import React from "react";
import { styled, keyframes, CSS } from "stitches.config";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type AccordionProps = React.FC<typeof AccordionPrimitive.Root & { children: React.ReactNode}> & {
  Trigger?: React.FC<typeof StyledTrigger>;
  Content?: React.FC<typeof StyledContent>;
  Item?: React.FC<AccordionPrimitive.AccordionItemProps & CSS>;
  CSS?: CSS;
};

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-accordion-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-accordion-content-height)" },
  to: { height: 0 },
});

export const Accordion: AccordionProps = styled(AccordionPrimitive.Root, {
  borderRadius: "$2",
});

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: "hidden",
  marginTop: 1,
  border: "1px solid $slate2",

  "&:first-child": {
    marginTop: 0,
    borderTopLeftRadius: "$4",
    borderTopRightRadius: "$4",
  },

  "&:last-child": {
    borderBottomLeftRadius: "$4",
    borderBottomRightRadius: "$4",
  },

  "&:focus-within": {
    position: "relative",
    zIndex: 1,
  },
});

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: "unset",
  display: "flex",
});

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  padding: "$3",
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "$slate2",
  "&:hover": { backgroundColor: "$slate3" },
});

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "$whiteA1",
  padding: "$3",

  '&[data-state="open"]': {
    animation: `${slideDown} 200ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 200ms cubic-bezier(0.87, 0, 0.13, 1) forwards`,
  },
});

const StyledChevron = styled(ChevronDownIcon, {
  color: "$slate10",
  transition: "transform 300ms cubic-bezier(0.87, 0, 0.13, 1)",
  "[data-state=open] &": { transform: "rotate(180deg)" },
});

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof StyledTrigger>,
  AccordionPrimitive.AccordionTriggerProps & {
    children?: React.ReactNode;
  }
>(({ children, ...props }, forwardedRef) => (
  <StyledHeader>
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledChevron />
    </StyledTrigger>
  </StyledHeader>
));

Accordion.Trigger = AccordionTrigger;
Accordion.Item = StyledItem;
Accordion.Content = StyledContent;
