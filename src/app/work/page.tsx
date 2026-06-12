import { Column, Heading, Text, Row, Tag, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work, timeline } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column fillWidth horizontal="center" align="center" gap="8" marginBottom="l">
        <Heading variant="display-strong-l">Work</Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          A reverse-chronological log of what I’ve built — newest first.
        </Text>
      </Column>

      <Column fillWidth gap="xl">
        {timeline.map((era, i) => (
          <Reveal key={era.period} delay={i * 0.08}>
            <Row fillWidth gap="24" vertical="start" s={{ direction: "column" }}>
              <Column minWidth={10} paddingTop="4">
                <Tag size="l">{era.period}</Tag>
              </Column>
              <Column flex={1} fillWidth gap="12">
                <Heading as="h2" variant="heading-strong-l">
                  {era.org}
                </Heading>
                <Text variant="body-default-s" onBackground="brand-weak">
                  {era.role}
                </Text>
                <Text onBackground="neutral-weak" variant="body-default-m">
                  {era.summary}
                </Text>
                {era.outputs.length > 0 && (
                  <Column as="ul" gap="12" paddingLeft="16">
                    {era.outputs.map((o) => (
                      <Text as="li" key={o} variant="body-default-m" onBackground="neutral-weak">
                        {o}
                      </Text>
                    ))}
                  </Column>
                )}
                {era.cases && (
                  <Column fillWidth paddingTop="8">
                    <Projects />
                  </Column>
                )}
              </Column>
            </Row>
          </Reveal>
        ))}
      </Column>
    </Column>
  );
}
