import { Column, Heading, Text, Row, Tag, Media, SmartLink, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, creator } from "@/resources";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SectionHeader } from "@/components/SectionHeader";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero: photo + creator identity */}
      <Row fillWidth gap="32" vertical="center" s={{ direction: "column" }}>
        <Reveal style={{ flex: "0 0 auto", width: "260px", maxWidth: "100%" }}>
          <Media
            radius="l"
            sizes="260px"
            aspectRatio="3 / 4"
            alt="Anita"
            src={creator.photo}
          />
        </Reveal>
        <Column flex={1} gap="12">
          <Reveal>
            <Heading variant="display-strong-l">{person.name}</Heading>
          </Reveal>
          <Reveal delay={0.05}>
            <Text onBackground="brand-weak" variant="heading-default-m">
              {creator.handle} · {creator.identity}
            </Text>
          </Reveal>
          <Reveal delay={0.1}>
            <Heading as="h2" variant="heading-strong-l" wrap="balance">
              {creator.tagline}
            </Heading>
          </Reveal>
          <Reveal delay={0.15}>
            <Text onBackground="neutral-weak" variant="body-default-l" wrap="balance">
              {creator.intro}
            </Text>
          </Reveal>
        </Column>
      </Row>

      {/* Content channels */}
      <Column fillWidth gap="m">
        <SectionHeader index="01" eyebrow="Channels" title={creator.channels.title} />
        <Reveal delay={0.05}>
          <Text onBackground="neutral-weak" variant="body-default-l" wrap="balance">
            {creator.channels.subtitle}
          </Text>
        </Reveal>
        <Row fillWidth gap="16" wrap marginTop="8">
          {creator.channels.items.map((c, i) => (
            <Reveal key={c.platform} delay={i * 0.06} style={{ flex: "1 1 14rem", minWidth: "14rem" }}>
              <SpotlightCard>
                <Column fillWidth gap="4" padding="l">
                  <Text variant="label-strong-m" onBackground="neutral-strong">
                    {c.platform}
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {c.handle}
                  </Text>
                  <Text variant="body-default-m" onBackground="brand-weak">
                    {c.stat}
                  </Text>
                  {c.href && <SmartLink href={c.href}>Visit ↗</SmartLink>}
                </Column>
              </SpotlightCard>
            </Reveal>
          ))}
        </Row>
        <Reveal delay={0.1}>
          <Text onBackground="neutral-weak" variant="body-default-s">
            {creator.channels.note}
          </Text>
        </Reveal>
      </Column>

      {/* Building in public */}
      <Column fillWidth gap="m">
        <SectionHeader index="02" eyebrow="In progress" title={creator.building.title} />
        <Reveal delay={0.05}>
          <Text onBackground="neutral-weak" variant="body-default-l">
            {creator.building.subtitle}
          </Text>
        </Reveal>
        <Column as="ul" gap="12" paddingLeft="16">
          {creator.building.items.map((b, i) => (
            <Reveal key={b} delay={i * 0.05}>
              <Text as="li" variant="body-default-m" onBackground="neutral-weak">
                {b}
              </Text>
            </Reveal>
          ))}
        </Column>
        {creator.building.featured && (
          <Reveal delay={0.1}>
            <SpotlightCard featured>
              <Column fillWidth gap="8" padding="l">
                <Row gap="8" vertical="center" wrap>
                  <Text variant="label-strong-l" onBackground="neutral-strong">
                    {creator.building.featured.label}
                  </Text>
                  <Tag size="s">{creator.building.featured.tagline}</Tag>
                </Row>
                <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
                  {creator.building.featured.description}
                </Text>
                <SmartLink href={creator.building.featured.href}>
                  {creator.building.featured.cta}
                </SmartLink>
              </Column>
            </SpotlightCard>
          </Reveal>
        )}
      </Column>

      {/* Off the clock */}
      <Column fillWidth gap="m">
        <SectionHeader index="03" eyebrow="Beyond work" title={creator.interests.title} />
        <Reveal delay={0.05}>
          <Row fillWidth gap="8" wrap>
            {creator.interests.items.map((it) => (
              <Tag key={it.label} size="l">
                {it.emoji} {it.label}
              </Tag>
            ))}
          </Row>
        </Reveal>
        <Reveal delay={0.1}>
          <Text onBackground="neutral-weak" variant="body-default-m" wrap="balance">
            {creator.interests.subtitle}
          </Text>
        </Reveal>
        <Row fillWidth gap="16" wrap marginTop="8">
          {creator.interests.photos.map((p, i) => (
            <Reveal key={p} delay={i * 0.08} style={{ flex: "1 1 14rem", minWidth: "12rem" }}>
              <Media radius="l" sizes="(max-width: 700px) 50vw, 320px" aspectRatio="3 / 4" alt="Anita off the clock" src={p} />
            </Reveal>
          ))}
        </Row>
      </Column>
    </Column>
  );
}
