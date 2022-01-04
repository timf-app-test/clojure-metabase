import React from "react";
import { ComponentStory } from "@storybook/react";
import { createDatabase } from "metabase-types/api/database";
import DatabaseStatusSmall from "./DatabaseStatusSmall";

export default {
  title: "Status/DatabaseStatusSmall",
  component: DatabaseStatusSmall,
  argTypes: { onExpand: { action: "onExpand" } },
};

const Template: ComponentStory<typeof DatabaseStatusSmall> = args => {
  return <DatabaseStatusSmall {...args} />;
};

export const Incomplete = Template.bind({});
Incomplete.args = {
  databases: [createDatabase({ initial_sync_status: "incomplete" })],
};

export const Complete = Template.bind({});
Complete.args = {
  databases: [createDatabase({ initial_sync_status: "complete" })],
};

export const Aborted = Template.bind({});
Aborted.args = {
  databases: [createDatabase({ initial_sync_status: "aborted" })],
};