import React from "react";
import { Story, Meta } from "@storybook/react";

import { Selector, SelectorProps } from "./Selector";

export default {
  title: "Components/Selector",
  component: Selector,
  argTypes: {},
} as Meta;

const Template: Story<SelectorProps> = (args) => (
  <div className='flex justify-center'>
    <Selector {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
