import { useRouter } from "next/router";
import { Course } from "@prisma/client";

import { styled } from "stitches.config";
import { Text, Box } from "common/ui";
import trpc from "trpc/hooks";

export const Courses = () => {
  const { data: courses, status } = trpc.useQuery(["courses.get-all"]);

  return (
    <StyledGrid>
      {status === "success" &&
        courses.map((course) => <CourseCard key={course.id} {...{ course }} />)}
    </StyledGrid>
  );
};

const StyledGrid = styled("div", {
  display: "grid",
  py: "$5",
  gap: "$3",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr));",
});

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/dashboard/course/${course.id}`);
  };

  return (
    <StyledCard onClick={handleOnClick}>
      <StyledImageContainer>
        <StyledImage dangerouslySetInnerHTML={{ __html: course.iconSvg }} />
      </StyledImageContainer>

      <Box css={{ p: "$2" }}>
        <Text size="5" b css={{ mb: "$3" }}>
          {course.label}
        </Text>
        <Text size="3">{course.description}</Text>
      </Box>
    </StyledCard>
  );
};

const StyledImage = styled("div", {
  size: "$5",
  margin: "auto",
  fill: "$slate11",
});

const StyledImageContainer = styled("div", {
  height: "$9",
  width: "100%",
  background: "$slate2",
  display: "flex",
});

const StyledCard = styled("div", {
  $shadow: "$red2",
  borderRadius: "$2",
  display: "flex",
  flexDirection: "column",
  border: "1px solid $slate6",
  overflow: "hidden",
  "&:hover": {
    background: "$slate1",
    borderWidth: "1px",
    borderColor: "$slate8",
    boxShadow: "$4",
  },
});
