import { useState } from "react";
import { useRouter } from "next/router";
import { Course } from "@prisma/client";

import { styled } from "stitches.config";
import { Text, Box, TextField } from "common/ui";
import trpc from "trpc/hooks";

export const Courses = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: courses, status } = trpc.useQuery(["courses.get-all"]);

  const handleOnClick = (courseId: string) => {
    router.push(`/dashboard/course/${courseId}`);
  };

  return (
    <Box css={{ d: "flex", fd: "column" }}>
      <TextField
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        css={{ w: "fit-content" }}
      />
      <StyledGrid>
        {status === "success" &&
          courses
            .filter((c) => (search === "" ? true : c.label.includes(search)))
            .map((course) => (
              <CourseCard
                key={course.id}
                onClick={() => handleOnClick(course.id)}
                {...{ course }}
              />
            ))}
      </StyledGrid>
    </Box>
  );
};

const StyledGrid = styled("div", {
  display: "grid",
  py: "$5",
  gap: "$3",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr));",
});

export const CourseCard = ({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) => {
  return (
    <StyledCard onClick={onClick}>
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
  background: "$slate3",
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
    boxShadow: "$4",
  },
});
