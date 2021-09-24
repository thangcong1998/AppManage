import React, { useState, Fragment } from 'react';
import { FC } from 'react';
import { View, Modal } from 'react-native';

interface CustomModalProps {
  children?: any;
  content: Function;
  otherProps?: any;
}

export const CustomModal = ({
  children,
  content,
  otherProps
}: CustomModalProps) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  let childClone = children
    ? {
        ...children,
        props: {
          ...children.props,
          onPress: () => {
            setOpen(true);
          }
        }
      }
    : null;

  return (
    <Fragment>
      {childClone}
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={onClose}
        {...otherProps}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000000a3'
          }}
        >
          {content(onClose)}
        </View>
      </Modal>
    </Fragment>
  );
};
