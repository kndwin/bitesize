import { useRouter } from "next/router";
import { styled } from "stitches.config";

import { Page } from "common/ui";
import { CourseCard } from "modules/dashboard/Courses";
import trpc from "trpc/hooks";

export const Admin = () => {
  return (
    <Page>
      <Courses />
    </Page>
  );
};

const Courses = () => {
  const router = useRouter();
  const { data: courses, status } = trpc.useQuery(["courses.get-all"]);

  const handleOnClick = (courseId: string) => {
    router.push(`/admin/${courseId}`);
  };

  return (
    <StyledGrid>
      {status === "success" &&
        courses.map((course) => (
          <CourseCard
            key={course.id}
            onClick={() => handleOnClick(course.id)}
            {...{ course }}
          />
        ))}
    </StyledGrid>
  );
};

const StyledGrid = styled("div", {
  display: "grid",
  py: "$5",
  gap: "$3",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr));",
});
