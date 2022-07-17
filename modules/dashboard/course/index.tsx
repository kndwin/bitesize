import { Section, Unit, Curriculum } from "@prisma/client";

import {
  Text,
  Box,
  Page,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "common/ui";
import { styled } from "stitches.config";
import { CheckIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import trpc from "trpc/hooks";

import { StyledIconCheck } from "./unit/common";

import { Header, IconButtonBack } from "modules/dashboard/Header";

export type ExtendedCurriculum = Curriculum & {
  sections: ExtendedSection[];
};

export const Course = () => {
  const courseId = useRouter().query?.courseId as string;

  const { data: course } = trpc.useQuery(["courses.get-one", { courseId }], {
    enabled: Boolean(courseId),
  });

  const { data: curriculum } = trpc.useQuery(
    ["curriculum.get-overview", { courseId }],
    {
      enabled: Boolean(courseId),
    }
  );

  return (
    <Page variant="container">
      <Header left={<IconButtonBack path="/dashboard" />} />
      <StyledBanner>
        <StyledImage
          dangerouslySetInnerHTML={{ __html: course?.iconSvg as string }}
        />
      </StyledBanner>
      <StyledDescriptionContainer>
        <Text size="8" css={{ fw: "bold" }}>
          {course?.label}
        </Text>
        <Text size="6" css={{ lh: "1.4em" }}>
          {curriculum?.description}
        </Text>
      </StyledDescriptionContainer>
      <SectionsOverview
        sections={(curriculum as ExtendedCurriculum)?.sections?.sort(
          (a, b) => a.order - b.order
        )}
      />
    </Page>
  );
};

type ExtendedSection = Section & { units: Unit[] };

const SectionsOverview = ({ sections }: { sections: ExtendedSection[] }) => {
  const router = useRouter();

  const handleUnitOnClick = (unitId: string) => {
    router.push(`/dashboard/course/${router.query?.courseId}/${unitId}`);
  };

  const checked = true;

  return (
    <Box css={{ d: "flex", fd: "column", gap: "$4", mt: "$5" }}>
      {sections?.map((section: ExtendedSection) => (
        <Accordion collapsible type="single" key={section?.id}>
          <AccordionItem value={`${section}`}>
            <AccordionTrigger>
              <Box css={{ d: "flex", fd: "column", gap: "$3" }}>
                <Text size="7" css={{ fw: "bold" }}>
                  {section?.label}
                </Text>
                <Text size="4">{section.description}</Text>
              </Box>
            </AccordionTrigger>
            <AccordionContent>
              <StyledSectionContainer>
                {section?.units?.map((unit) => (
                  <StyledSection
                    onClick={() => handleUnitOnClick(unit?.id)}
                    key={unit?.id}
                  >
                    <Text size="5">{unit?.label}</Text>
                    <StyledIconCheck checked={checked}>
                      {checked && <CheckIcon />}
                    </StyledIconCheck>
                  </StyledSection>
                ))}
              </StyledSectionContainer>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
};

const StyledDescriptionContainer = styled("div", {
  d: "flex",
  fd: "column",
  mt: "$4",
  gap: "$3",
  p: "$3",
  border: "1px solid $slate2",
});

const StyledSectionContainer = styled("div", {
  display: "flex",
  fd: "column",
  gap: "$3",
});

const StyledSection = styled("div", {
  background: "$slate3",
  padding: "$3",
  display: "flex",
  br: "$4",
  ai: "center",
  jc: "space-between",
  "&:hover": {
    bc: "$slate5",
  },
});

const StyledBanner = styled("div", {
  height: "10em",
  width: "100%",
  background: "$slate3",
  display: "flex",
  br: "$4",
});

const StyledImage = styled("div", {
  size: "$5",
  margin: "auto",
  fill: "$slate11",
});
