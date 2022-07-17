import { useState } from "react";
import { TextArea, Box, Text, IconButton, Button, TextField } from "common/ui";
import trpc from "trpc/hooks";
import type { ExtendedCurriculum } from "modules/dashboard/course";
import type { Unit } from "@prisma/client";
import {
  Pencil1Icon,
  PlusIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  Cross1Icon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { styled } from "stitches.config";

import * as Popover from "common/ui/overlay/Popover";

type CourseProps = {
  courseId?: string;
  setUnit: (unit: Unit) => void;
};

export const CourseOverview = ({ courseId, setUnit }: CourseProps) => {
  const { data: curriculum } = trpc.useQuery(
    ["curriculum.get-overview", { courseId }],
    {
      enabled: Boolean(courseId),
    }
  );
  return (
    <Box css={{ maw: 300, width: "100%" }}>
      {(curriculum as ExtendedCurriculum)?.sections?.map((section) => (
        <Box key={section.id} css={{ mb: "$3" }}>
          <EditableSectionTitle {...{ section }} />
          <EditableSectionDescription {...{ section }} />

          <Box css={{ d: "flex", fd: "column", gap: "$3", py: "$2" }}>
            {section.units.map((u) => (
              <StyledUnit key={u.id} onClick={() => setUnit(u)}>
                <Text>{u.label}</Text>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <IconButton>
                      <DotsHorizontalIcon />
                    </IconButton>
                  </Popover.Trigger>
                  <StyledContent>
                    <TextField value={u.label} />
                    <Box css={{ d: "flex", ai: "center", gap: "$1" }}>
                      <IconButton>
                        <ChevronUpIcon />
                      </IconButton>
                      <IconButton>
                        <ChevronDownIcon />
                      </IconButton>
                      <Button
                        css={{ flex: 1 }}
                        variant="red"
                      >{`Delete`}</Button>
                    </Box>
                  </StyledContent>
                </Popover.Root>
              </StyledUnit>
            ))}
            <Button css={{ w: "fit-content", gap: "$1" }}>
              <PlusIcon />
              {`Add Unit`}
            </Button>
          </Box>
        </Box>
      ))}
      <Button size="2" css={{ w: "fit-content", gap: "$1" }}>
        <PlusIcon />
        {`Add Section`}
      </Button>
    </Box>
  );
};

const EditableSectionTitle = ({ section }: { section: Section }) => {
  const [editable, setEditable] = useState(false);
  const [label, setLabel] = useState(section.label);

  const onUpdate = () => {
    setEditable(false);
  };

  return (
    <Box css={{ d: "flex", ai: "center", gap: "$3", mb: "$2" }}>
      {editable === false && (
        <Text onClick={() => setEditable(true)} size="6" css={{ fw: "bold" }}>
          {label}
        </Text>
      )}
      {editable === true && (
        <TextField
          onBlur={onUpdate}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      )}
    </Box>
  );
};

const EditableSectionDescription = ({ section }: { section: Section }) => {
  const [editable, setEditable] = useState(false);
  const [description, setDescription] = useState(section.description);

  const onUpdate = () => {
    setEditable(false);
  };

  return (
    <Box css={{ d: "flex", ai: "center", gap: "$3", mb: "$2" }}>
      {editable === false && (
        <Text onClick={() => setEditable(true)}>{description}</Text>
      )}
      {editable === true && (
        <TextArea
          css={{ w: "100%" }}
          onBlur={onUpdate}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      )}
    </Box>
  );
};

const StyledContent = styled(Popover.Content, {
  bc: "$slate1",
  p: "$1",
  gap: "$1",
  border: "1px solid $slate6",
});

const StyledUnit = styled("div", {
  d: "flex",
  ai: "center",
  jc: "space-between",
  gap: "$1",
  bc: "$slate3",
  br: "$2",
  py: "$1",
  px: "$2",
  "&:hover": {
    bc: "$slate5",
  },
});
