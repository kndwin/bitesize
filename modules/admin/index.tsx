import { useState, useEffect } from "react";
import { styled } from "stitches.config";

import { Page, Text, Box, IconButton, TextArea } from "common/ui";
import { Header } from "modules/dashboard/Header";
import * as Menu from "common/ui/overlay/DropdownMenu";
import trpc from "trpc/hooks";
import type { Course, Unit } from "@prisma/client";
import { SlashIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { CourseOverview } from "./CourseOverview";

export const Admin = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [unit, setUnit] = useState<Unit | null>(null);
  return (
		<Page css={{ d: "flex", fd: "column"}}>
      <Header
        left={
          <Box css={{ d: "flex", gap: "$3", ai: "center" }}>
            <Text size="5" css={{ fw: "bold" }}>{`Admin`}</Text>
            <SlashIcon />
            <DropdownCourse {...{ course, setCourse }} />
          </Box>
        }
      />
			<Box css={{ d: "flex", flex: 1 }}>
        <CourseOverview {...{ courseId: course?.id, setUnit }} />
        <Box
          css={{
            p: "$3",
            br: "$4",
            border: "1px solid $slate6",
            fx: 1,
            w: "100%",
						ml: "$3"
          }}
        >
          <Text>{unit?.label}</Text>
        </Box>
      </Box>
    </Page>
  );
};

type DropdownCourseProps = {
  course: Course | null;
  setCourse: (course: Course) => void;
};

const DropdownCourse = ({ course, setCourse }: DropdownCourseProps) => {
  const { data: courses, status } = trpc.useQuery(["courses.get-all"]);

  useEffect(() => {
    if (courses) {
      setCourse(courses[0]);
    }
  }, [courses?.length]);

  return (
    <>
      {status === "success" && (
        <Menu.Root>
          <StyledTrigger>
            <StyledImage
              dangerouslySetInnerHTML={{ __html: course?.iconSvg ?? "" }}
            />
            <Text>{course?.label}</Text>
          </StyledTrigger>
          <Menu.Trigger asChild>
            <IconButton variant="ghost">
              <ChevronDownIcon />
            </IconButton>
          </Menu.Trigger>
          <Menu.Content>
            {courses.map((c) => (
              <Menu.Item
                css={{ d: "flex", ai: "center", p: "$2" }}
                onClick={() => setCourse(c)}
              >
                <StyledImage dangerouslySetInnerHTML={{ __html: c.iconSvg }} />
                <Text css={{ p: "$2" }}>{c.label}</Text>
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Root>
      )}
    </>
  );
};

const StyledTrigger = styled("div", {
  p: "$2",
  d: "flex",
  ai: "center",
  gap: "$2",
});

const StyledImage = styled("div", {
  size: "$5",
  fill: "$slate11",
});
