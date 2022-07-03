import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "..";

export default {
  title: "Dotoriham Design System/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>버튼</Button>
);

const defaultProps = {
  width: "80px",
  height: "30px",
};

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  ...defaultProps,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  ...defaultProps,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  variant: "tertiary",
  ...defaultProps,
};

export const Quaternary = Template.bind({});
Quaternary.args = {
  variant: "quaternary",
  ...defaultProps,
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "primary",
  disabled: true,
  ...defaultProps,
};
