import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Tag,
} from "@once-ui-system/core";
import { home, about, person, baseURL, work, showcase } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { CountUp } from "@/components/CountUp";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx horizontal="center" paddingBottom="20">
            <Avatar src={person.avatar} size="xl" />
          </RevealFx>
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="8">
            <Heading wrap="balance" variant="display-strong-l">
              <span className="brandGradientText">{person.name}</span>
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center" paddingBottom="20">
            <Heading wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx delay={0.2} horizontal="center" paddingBottom="24">
            <Row gap="8" wrap horizontal="center">
              {showcase.chips.map((c) => (
                <Tag key={c} size="l">
                  {c}
                </Tag>
              ))}
            </Row>
          </RevealFx>
          <RevealFx delay={0.3} horizontal="center">
            <Row gap="12" wrap horizontal="center">
              <Button
                href={`mailto:${person.email}`}
                data-border="rounded"
                variant="primary"
                size="m"
                weight="default"
              >
                Email me
              </Button>
              <Button
                href={work.path}
                data-border="rounded"
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
              >
                View my work
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>

      {/* What I do */}
      <Column fillWidth gap="l">
        <Reveal>
          <Heading as="h2" variant="display-strong-xs">
            {showcase.capabilities.title}
          </Heading>
        </Reveal>
        <Reveal delay={0.05}>
          <Text onBackground="neutral-weak" variant="body-default-l" wrap="balance">
            {showcase.identity}
          </Text>
        </Reveal>
        <Row fillWidth gap="16" wrap marginTop="8">
          {showcase.capabilities.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} style={{ flex: "1 1 calc(50% - 8px)", minWidth: "16rem" }}>
              <SpotlightCard>
                <Column fillWidth gap="8" padding="l">
                  <Heading as="h3" variant="heading-strong-m">
                    {item.title}
                  </Heading>
                  <Text onBackground="neutral-weak" variant="body-default-m">
                    {item.description}
                  </Text>
                </Column>
              </SpotlightCard>
            </Reveal>
          ))}
        </Row>
      </Column>

      {/* What I bring */}
      <Column fillWidth gap="m">
        <Reveal>
          <Heading as="h2" variant="display-strong-xs">
            {showcase.resources.title}
          </Heading>
        </Reveal>
        <Reveal delay={0.05}>
          <Text onBackground="neutral-weak" variant="body-default-l">
            {showcase.resources.subtitle}
          </Text>
        </Reveal>
        <Column fillWidth gap="8" marginTop="8">
          {showcase.resources.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <SpotlightCard>
                <Row fillWidth gap="16" vertical="start" padding="m">
                  <Text variant="heading-default-xl">{item.emoji}</Text>
                  <Column gap="4">
                    <Text variant="label-strong-m" onBackground="neutral-strong">
                      {item.title}
                    </Text>
                    <Text onBackground="neutral-weak" variant="body-default-m">
                      {item.description}
                    </Text>
                  </Column>
                </Row>
              </SpotlightCard>
            </Reveal>
          ))}
        </Column>
      </Column>

      {/* Stats — animated count-up */}
      <Reveal>
        <Row fillWidth horizontal="center" wrap gap="40" paddingY="16">
          {showcase.stats.map((s) => (
            <Column key={s.label} horizontal="center" align="center" gap="4" minWidth={10}>
              <Heading variant="display-strong-l">
                <span className="brandGradientText">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {s.label}
              </Text>
            </Column>
          ))}
        </Row>
      </Reveal>

      {/* Selected work — teaser only; full list lives on /work */}
      <Reveal>
        <Column fillWidth gap="l">
          <Row fillWidth horizontal="between" vertical="end">
            <Heading as="h2" variant="display-strong-xs">
              Selected work
            </Heading>
            <Button href={work.path} variant="tertiary" size="s" weight="default" arrowIcon>
              View all
            </Button>
          </Row>
          <Projects range={[1, 2]} />
        </Column>
      </Reveal>
      <Mailchimp />
    </Column>
  );
}
