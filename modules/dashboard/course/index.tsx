import { CheckIcon } from "@radix-ui/react-icons";
import { Curriculum } from "@prisma/client";

import { Text, Box, Page, IconButton, Accordion } from "common/ui";
import { styled } from "stitches.config";
import { useRouter } from "next/router";
import trpc from "trpc/hooks";

import { Header, IconButtonBack } from "modules/dashboard/Header";

export const Course = () => {
  const router = useRouter();
  const courseId = router.query?.courseId;

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
        <StyledImage dangerouslySetInnerHTML={{ __html: course?.iconSvg }} />
      </StyledBanner>
      <StyledDescriptionContainer>
        <Text size="8" css={{ fw: "bold" }}>
          {course?.label}
        </Text>
        <Text size="6" css={{ lh: "1.4em" }}>
          {curriculum?.description}
        </Text>
      </StyledDescriptionContainer>
      <CurriculumOverview
        curriculum={curriculum?.sections?.sort((a, b) => a.order - b.order)}
      />
    </Page>
  );
};

const CurriculumOverview = ({ curriculum }: { curriculum: Curriculum }) => {
  const router = useRouter();

  const handleUnitOnClick = (unitId: string) => {
    router.push(`/dashboard/course/${router.query?.courseId}/${unitId}`);
  };

  return (
    <Box css={{ d: "flex", fd: "column" }}>
      {curriculum?.map((section) => (
        <Accordion
          collapsible
          type="single"
          key={section?.id}
          css={{ mt: "$4" }}
        >
          <Accordion.Item value={`${section.order}`}>
            <Accordion.Trigger>
              <Box css={{ d: "flex", fd: "column", gap: "$3" }}>
                <Text size="7" css={{ fw: "bold" }}>
                  {section?.label}
                </Text>
                <Text size="4">{section.description}</Text>
              </Box>
            </Accordion.Trigger>
            <Accordion.Content>
              <StyledSectionContainer>
                {section?.units?.map((unit) => (
                  <StyledSection
                    onClick={() => handleUnitOnClick(unit?.id)}
                    key={unit?.id}
                  >
                    <Text size="5">{unit?.label}</Text>
                    <IconCheck checked={false} />
                  </StyledSection>
                ))}
              </StyledSectionContainer>
            </Accordion.Content>
          </Accordion.Item>
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
  border: "1px solid $slate3",
  padding: "$3",
  display: "flex",
  br: "$4",
  ai: "center",
  jc: "space-between",
  "&:hover": {
    bc: "$slate2",
  },
});

const IconCheck = ({ checked }: { checked: boolean }) => (
  <Box
    css={{
      br: "$pill",
      size: "$5",
      bc: checked ? "$grass5" : "$slate5",
      display: "flex",
      ai: "center",
      jc: "center",
    }}
  >
    {checked && <CheckIcon />}
  </Box>
);

const StyledBanner = styled("div", {
  height: "10em",
  width: "100%",
  background: "$slate2",
  display: "flex",
  br: "$4",
});

const StyledImage = styled("div", {
  size: "$5",
  margin: "auto",
  fill: "$slate11",
});
