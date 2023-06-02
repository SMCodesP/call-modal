import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from 'react-bootstrap';
import ModalExample from '../components/ModalExample';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalContainer } from '../components/ModalContainer';

export default {
  title: 'Modal',
  component: ModalContainer,
} as ComponentMeta<typeof ModalExample>;

const Template: ComponentStory<typeof ModalExample> = (args) => {
  const onShow = () => {
    ModalExample.show({
      animation: args.animation,
    });

    setTimeout(() => ModalExample.hide(), 2000);
  };

  return (
    <>
      <ModalContainer />

      <Button onClick={onShow}>Open modal</Button>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  animation: true,
};
