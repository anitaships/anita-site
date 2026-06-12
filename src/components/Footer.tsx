import { Row, Column, Heading, Text, Button, IconButton, SmartLink, Line } from "@once-ui-system/core";
import { person, social, about } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth horizontal="center" paddingX="16">
      <Column maxWidth="m" fillWidth horizontal="center" align="center" gap="16" paddingTop="80" paddingBottom="64">
        <Line marginBottom="40" />
        <Heading as="h2" variant="display-strong-s" wrap="balance">
          Let’s build something.
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-l" wrap="balance">
          Open to Growth, Community &amp; Product Operations roles — and always up for a good conversation.
        </Text>
        <Row gap="12" paddingTop="8" wrap horizontal="center">
          <Button href={`mailto:${person.email}`} variant="primary" size="m" weight="default">
            Email me
          </Button>
          <Button href={about.path} variant="secondary" size="m" weight="default" arrowIcon>
            More about me
          </Button>
        </Row>
        <Row gap="8" paddingTop="8">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="m"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Column>

      <Row
        className={styles.mobile}
        maxWidth="m"
        fillWidth
        paddingY="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{ direction: "column", horizontal: "center", align: "center" }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            / Build your portfolio with{" "}
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          Where others see chaos, I build order.
        </Text>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Column>
  );
};
