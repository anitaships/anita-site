import { Column, Row, Heading, Text, Line } from "@once-ui-system/core";
import { Reveal } from "./Reveal";

// Editorial section header: hairline divider + numbered eyebrow + title.
// Adds rhythm and hierarchy between sections.
export function SectionHeader({
  index,
  eyebrow,
  title,
}: {
  index?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal>
      <Column fillWidth gap="16">
        <Line background="neutral-alpha-weak" />
        <Row gap="12" vertical="center">
          {index && (
            <Text variant="label-default-s" onBackground="brand-weak">
              {index}
            </Text>
          )}
          <Text
            variant="label-default-s"
            onBackground="neutral-weak"
            style={{ letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            {eyebrow}
          </Text>
        </Row>
        <Heading as="h2" variant="display-strong-xs">
          {title}
        </Heading>
      </Column>
    </Reveal>
  );
}
