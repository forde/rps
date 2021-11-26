import React from "react";
import { Story, Meta } from "@storybook/react";

import { Avatar, AvatarProps } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {},
} as Meta;

const Template: Story<AvatarProps> = (args) => (
  <div className='flex justify-center'>
    <Avatar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "small",
  src: "/../.storybook/public/static/images/orange.jpeg",
  name: "Mr. Mittens",
  tagline: "Mewow purr purr probably",
  active: true,
};
