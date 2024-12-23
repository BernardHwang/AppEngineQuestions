import React from "react";
import {
  Flex,
  Heading,
  Paragraph,
  Strong,
  useCurrentTheme,
} from "@dynatrace/strato-components";
import { Card } from "../components/Card";

export const Home = () => {
  const theme = useCurrentTheme();
  return (
    <Flex flexDirection="column" alignItems="center" padding={32}>
      <img
        src="./assets/Dynatrace_Logo.svg"
        alt="Dynatrace Logo"
        width={150}
        height={150}
        style={{ paddingBottom: 32 }}
      ></img>

      <Heading>Welcome To Your Dynatrace App</Heading>
      <Paragraph>
        Edit <Strong>src/app/pages/Home.tsx</Strong> and save to reload the app.
      </Paragraph>
      <Paragraph>
        For more information and help on app development, check out the
        following:
      </Paragraph>

      <Flex gap={48} paddingTop={64} flexFlow="wrap">
        <Card
          href="/Task1"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"
          }
          name="Task1"
        />
        <Card
          href="/Task2"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"
          }
          name="Task2"
        />
        <Card
          href="/Task3"
          inAppLink
          imgSrc={
            theme === "light" ? "./assets/data.png" : "./assets/data_dark.png"
          }
          name="Task3"
        />
      </Flex>
    </Flex>
  );
};
