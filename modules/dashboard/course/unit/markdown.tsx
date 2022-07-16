import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as Theme from "react-syntax-highlighter/dist/esm/styles/prism";

import { Box, Text } from "common/ui";
import {useTheme} from "next-themes";

export const Markdown = ({ markdown }: { markdown: string }) => {
  return (
    <Box>
      <ReactMarkdown
        children={markdown}
        components={{
          h1: (node) => (
            <Text size="6" css={{ fw: "bold", mb: "$3" }}>
              {node.children}
            </Text>
          ),
          p: (node) => (
            <Text size="4" css={{ lineHeight: "1.4em", mb: "$2" }}>
              {node.children}
            </Text>
          ),
					code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
								style={Theme.cb}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </Box>
  );
};
