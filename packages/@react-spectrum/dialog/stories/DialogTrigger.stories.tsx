/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {action} from '@storybook/addon-actions';
import {ActionButton, Button} from '@react-spectrum/button';
import {AlertDialog, Dialog, DialogTrigger} from '../';
import {ButtonGroup} from '@react-spectrum/buttongroup';
import {chain} from '@react-aria/utils';
import {Content, Header} from '@react-spectrum/view';
import {Divider} from '@react-spectrum/divider';
import {Flex} from '@react-spectrum/layout';
import {Heading, Text} from '@react-spectrum/text';
import {Item, Menu, MenuTrigger} from '@react-spectrum/menu';
import {Provider} from '@react-spectrum/provider';
import React from 'react';

export default {
  title: 'DialogTrigger',
  parameters: {
    providerSwitcher: {
      status: 'notice'
    }
  }
};

export const Default = {
  render: () => render({}),
  name: 'default'
};

export const TypePopover = {
  render: () =>
    renderPopover({
      type: 'popover'
    }),
  name: 'type: popover'
};

export const TypeModal = {
  render: () =>
    render({
      type: 'modal'
    }),
  name: 'type: modal'
};

export const TypeModalIsDismissable = {
  render: () =>
    render({
      type: 'modal',
      isDismissable: true
    }),
  name: 'type: modal isDismissable'
};

export const TypeFullscreen = {
  render: () =>
    render({
      type: 'fullscreen'
    }),
  name: 'type: fullscreen'
};

export const TypeFullscreenTakeover = {
  render: () =>
    render({
      type: 'fullscreenTakeover'
    }),
  name: 'type: fullscreenTakeover'
};

export const TypeTray = {
  render: () =>
    renderPopover({
      type: 'tray'
    }),
  name: 'type: tray'
};

export const MobileTypeFullscreen = {
  render: () =>
    render({
      type: 'modal',
      mobileType: 'fullscreen'
    }),
  name: 'mobileType: fullscreen'
};

export const MobileTypeFullscreenTakeover = {
  render: () =>
    render({
      type: 'modal',
      mobileType: 'fullscreenTakeover'
    }),
  name: 'mobileType: fullscreenTakeover'
};

export const PopoverWithMobileTypeModal = {
  render: () =>
    renderPopover({
      type: 'popover',
      mobileType: 'modal'
    }),
  name: 'popover with mobileType: modal'
};

export const PopoverWithMobileTypeTray = {
  render: () =>
    renderPopover({
      type: 'popover',
      mobileType: 'tray'
    }),
  name: 'popover with mobileType: tray'
};

export const NestedModals = {
  render: () => (
    <div
      style={{
        paddingTop: 100
      }}>
      <input />
      <Provider
        colorScheme="dark"
        UNSAFE_style={{
          padding: 40,
          marginTop: 10
        }}>
        <DialogTrigger isDismissable>
          <ActionButton>Trigger</ActionButton>
          <Dialog>
            <Content>
              <input />
              <input />
              <DialogTrigger isDismissable>
                <ActionButton>Trigger</ActionButton>
                <Dialog>
                  <Content>
                    <input />
                    <input />
                  </Content>
                </Dialog>
              </DialogTrigger>
            </Content>
          </Dialog>
        </DialogTrigger>
      </Provider>
    </div>
  ),
  name: 'nested modals'
};

export const NestedModalsFullscreentakeover = {
  render: () => (
    <DialogTrigger type="fullscreenTakeover">
      <ActionButton>Trigger</ActionButton>
      {(close) => (
        <Dialog>
          <Heading>The Heading</Heading>
          <Header>The Header</Header>
          <Divider />
          <Content>
            <DialogTrigger isDismissable>
              <ActionButton>Trigger</ActionButton>
              <Dialog>
                <Content>
                  <input />
                  <input />
                </Content>
              </Dialog>
            </DialogTrigger>
          </Content>
          <ButtonGroup>
            <Button variant="secondary" onPress={chain(close, action('cancel'))}>
              Cancel
            </Button>
            <Button variant="cta" onPress={chain(close, action('confirm'))}>
              Confirm
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  ),
  name: 'nested modals, fullscreentakeover'
};

export const WithMenuTrigger = {
  render: () => (
    <DialogTrigger type="popover">
      <ActionButton>Trigger</ActionButton>
      <Dialog>
        <Heading>The Heading</Heading>
        <Content>
          <MenuTrigger>
            <ActionButton>Test</ActionButton>
            <Menu autoFocus="first">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
              <Item>Item 3</Item>
            </Menu>
          </MenuTrigger>
        </Content>
      </Dialog>
    </DialogTrigger>
  ),
  name: 'with menu trigger'
};

export const NestedPopovers = {
  render: () => (
    <div
      style={{
        paddingTop: 100
      }}>
      <DialogTrigger type="popover">
        <ActionButton>Trigger</ActionButton>
        <Dialog>
          <Content>
            <input />
            <input />
            <DialogTrigger type="popover">
              <ActionButton>Trigger</ActionButton>
              <Dialog>
                <Content>Hi!</Content>
              </Dialog>
            </DialogTrigger>
          </Content>
        </Dialog>
      </DialogTrigger>
    </div>
  ),
  name: 'nested popovers'
};

export const PopoverInsideScrollView = {
  render: () => (
    <div
      style={{
        height: 100,
        display: 'flex'
      }}>
      <div
        style={{
          paddingTop: 100,
          height: 100,
          overflow: 'auto'
        }}>
        <div
          style={{
            height: 200
          }}>
          <DialogTrigger type="popover">
            <ActionButton>Trigger</ActionButton>
            <Dialog>
              <Content>
                <input />
                <input />
              </Content>
            </Dialog>
          </DialogTrigger>
        </div>
      </div>
      <div
        style={{
          paddingTop: 100,
          height: 100,
          overflow: 'auto',
          flex: 1
        }}>
        <div
          style={{
            height: 200
          }}>
          other
        </div>
      </div>
    </div>
  ),
  name: 'popover inside scroll view'
};

export const PlacementLeft = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'left'
    }),
  name: 'placement="left"'
};

export const PlacementLeftTop = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'left top'
    }),
  name: 'placement="left top"'
};

export const PlacementLeftBottom = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'left bottom'
    }),
  name: 'placement="left bottom"'
};

export const PlacementRight = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'right'
    }),
  name: 'placement="right"'
};

export const PlacementRightTop = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'right top'
    }),
  name: 'placement="right top"'
};

export const PlacementRightBottom = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'right bottom'
    }),
  name: 'placement="right bottom"'
};

export const PlacementBottom = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'bottom'
    }),
  name: 'placement="bottom"'
};

export const PlacementBottomLeft = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'bottom left'
    }),
  name: 'placement="bottom left"'
};

export const PlacementBottomRight = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'bottom right'
    }),
  name: 'placement="bottom right"'
};

export const PlacementTop = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'top'
    }),
  name: 'placement="top"'
};

export const PlacementTopLeft = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'top left'
    }),
  name: 'placement="top left"'
};

export const PlacementTopRight = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'top right'
    }),
  name: 'placement="top right"'
};

export const Offset = {
  render: () =>
    renderPopover({
      type: 'popover',
      offset: 50
    }),
  name: 'offset'
};

export const CrossOffset = {
  render: () =>
    renderPopover({
      type: 'popover',
      crossOffset: 50
    }),
  name: 'crossOffset'
};

export const ShouldFlipTrue = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'start',
      shouldFlip: true,
      width: 'calc(100vh - 100px)'
    }),
  name: 'shouldFlip: true'
};

export const ShouldFlipFalse = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'start',
      shouldFlip: false,
      width: 'calc(100vh - 100px)'
    }),
  name: 'shouldFlip: false'
};

export const ShouldFlipTrueWithOffset = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'start',
      shouldFlip: true,
      offset: 50,
      width: 'calc(100vh - 100px)'
    }),
  name: 'shouldFlip: true with offset'
};

export const KeyboardDismissDisabledModal = {
  render: () =>
    render({
      type: 'modal',
      isKeyboardDismissDisabled: true
    }),
  name: 'keyboard dismiss disabled: modal'
};

export const KeyboardDismissDisabledPopover = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'bottom',
      isKeyboardDismissDisabled: true
    }),
  name: 'keyboard dismiss disabled: popover'
};

export const KeyboardDismissDisabledTray = {
  render: () =>
    renderPopover({
      type: 'tray',
      isKeyboardDismissDisabled: true
    }),
  name: 'keyboard dismiss disabled: tray'
};

export const ContainerPadding = {
  render: () =>
    renderPopover({
      type: 'popover',
      placement: 'bottom',
      width: 'calc(100vh - 100px)',
      containerPadding: 20
    }),
  name: 'containerPadding'
};

export const CloseFunctionWithButtonPopover = {
  render: () => (
    <div
      style={{
        display: 'flex',
        margin: '100px 0'
      }}>
      <DialogTrigger type="popover" onOpenChange={action('open change')}>
        <ActionButton>Trigger</ActionButton>
        {(close) => (
          <Dialog>
            <Heading>The Heading</Heading>
            <Header>The Header</Header>
            <Divider />
            <Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique
                risus. In sit amet suscipit lorem. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. In condimentum imperdiet metus non
                condimentum. Duis eu velit et quam accumsan tempus at id velit. Duis elementum
                elementum purus, id tempus mauris posuere a. Nunc vestibulum sapien pellentesque
                lectus commodo ornare.
              </Text>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={chain(close, action('cancel'))}>
                Cancel
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>
    </div>
  ),
  name: 'Close function with button: popover'
};

export const TargetRef = {
  render: () => <TriggerWithRef type="popover" />,
  name: 'targetRef'
};

export const _AlertDialog = {
  render: () => renderAlert({}),
  name: 'alert dialog'
};

export const CrossoffsetExamples = {
  render: () => (
    <Flex gap="size-200" alignSelf="center">
      <Flex gap="size-200" direction="column" alignItems="start">
        <span>Left Top</span>
        <div>
          <span>-50</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left top',
              crossOffset: -50
            },
            false
          )}
        </div>
        <div>
          <span>0</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left top'
            },
            false
          )}
        </div>
        <div>
          <span>50</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left top',
              crossOffset: 50
            },
            false
          )}
        </div>
      </Flex>
      <Flex gap="size-200" direction="column" alignItems="start">
        <span>Left</span>
        <div>
          <span>-50</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left',
              crossOffset: -50
            },
            false
          )}
        </div>
        <div>
          <span>0</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left'
            },
            false
          )}
        </div>
        <div>
          <span>50</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left',
              crossOffset: 50
            },
            false
          )}
        </div>
      </Flex>
      <Flex gap="size-200" direction="column" alignItems="start">
        <span>Left Bottom</span>
        <div>
          <span>-50</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left bottom',
              crossOffset: -50
            },
            false
          )}
        </div>
        <div>
          <span>0</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left bottom'
            },
            false
          )}
        </div>
        <div>
          <span>50</span>
          {renderPopover(
            {
              type: 'popover',
              placement: 'left bottom',
              crossOffset: 50
            },
            false
          )}
        </div>
      </Flex>
    </Flex>
  ),
  name: 'crossoffset examples'
};

export const TriggerVisibleThroughUnderlay = {
  render: () => renderTriggerNotCentered({}),
  name: 'trigger visible through underlay'
};

export const _2Popovers = {
  render: () => (
    <Flex gap="size-200">
      <DialogTrigger type="popover">
        <ActionButton>Trigger</ActionButton>
        <Dialog>
          <Content>
            <input />
            <input />
          </Content>
        </Dialog>
      </DialogTrigger>
      <DialogTrigger type="popover">
        <ActionButton>Trigger</ActionButton>
        <Dialog>
          <Content>Hi!</Content>
        </Dialog>
      </DialogTrigger>
    </Flex>
  ),
  name: '2 popovers'
};

function render({width = 'auto', ...props}) {
  return (
    <div
      style={{
        display: 'flex',
        width,
        margin: '100px 0'
      }}>
      <DialogTrigger {...props} onOpenChange={action('open change')}>
        <ActionButton>Trigger</ActionButton>
        {(close) => (
          <Dialog>
            <Heading id="foo">The Heading</Heading>
            <Header>The Header</Header>
            <Divider />
            <Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique
                risus. In sit amet suscipit lorem. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. In condimentum imperdiet metus non
                condimentum. Duis eu velit et quam accumsan tempus at id velit. Duis elementum
                elementum purus, id tempus mauris posuere a. Nunc vestibulum sapien pellentesque
                lectus commodo ornare.
              </Text>
            </Content>
            {!props.isDismissable && (
              <ButtonGroup>
                <Button variant="secondary" onPress={chain(close, action('cancel'))}>
                  Cancel
                </Button>
                <Button variant="cta" onPress={chain(close, action('confirm'))}>
                  Confirm
                </Button>
              </ButtonGroup>
            )}
          </Dialog>
        )}
      </DialogTrigger>
    </div>
  );
}

function renderTriggerNotCentered(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '100px',
        left: '100px'
      }}>
      <div>
        action button shouldn't get any events if the underlay is up and you try to click it through
        the underlay
      </div>
      <DialogTrigger {...props} isDismissable onOpenChange={action('open change')}>
        <ActionButton
          onPressStart={action('onPressStart')}
          onPress={action('onPress')}
          onPressEnd={action('onPressEnd')}>
          Trigger
        </ActionButton>
        <Dialog>
          <Heading>The Heading</Heading>
          <Header>The Header</Header>
          <Divider />
          <Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique
              risus. In sit amet suscipit lorem. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. In condimentum imperdiet metus non
              condimentum. Duis eu velit et quam accumsan tempus at id velit. Duis elementum
              elementum purus, id tempus mauris posuere a. Nunc vestibulum sapien pellentesque
              lectus commodo ornare.
            </Text>
          </Content>
        </Dialog>
      </DialogTrigger>
    </div>
  );
}

function renderPopover({width = 'auto', ...props}, withMargin = true) {
  return (
    <div
      style={{
        display: 'flex',
        width,
        margin: withMargin && '100px 0'
      }}>
      <DialogTrigger {...props} onOpenChange={action('open change')}>
        <ActionButton>Trigger</ActionButton>
        <Dialog>
          <Heading>The Heading</Heading>
          <Header>The Header</Header>
          <Divider />
          <Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique
              risus. In sit amet suscipit lorem. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. In condimentum imperdiet metus non
              condimentum. Duis eu velit et quam accumsan tempus at id velit. Duis elementum
              elementum purus, id tempus mauris posuere a. Nunc vestibulum sapien pellentesque
              lectus commodo ornare.
            </Text>
          </Content>
        </Dialog>
      </DialogTrigger>
    </div>
  );
}

let TriggerWithRef = (props) => {
  let ref = React.useRef();
  return (
    <div
      style={{
        display: 'flex'
      }}>
      <DialogTrigger {...props} targetRef={ref} onOpenChange={action('open change')}>
        <ActionButton>Trigger</ActionButton>
        <Dialog>
          <Heading>The Heading</Heading>
          <Header>The Header</Header>
          <Divider />
          <Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet tristique
              risus. In sit amet suscipit lorem. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. In condimentum imperdiet metus non
              condimentum. Duis eu velit et quam accumsan tempus at id velit. Duis elementum
              elementum purus, id tempus mauris posuere a. Nunc vestibulum sapien pellentesque
              lectus commodo ornare.
            </Text>
          </Content>
        </Dialog>
      </DialogTrigger>
      <span
        ref={ref}
        style={{
          marginInlineStart: '200px'
        }}>
        Popover appears over here
      </span>
    </div>
  );
};

function renderAlert({width = 'auto', ...props}) {
  return (
    <div
      style={{
        display: 'flex',
        width,
        margin: '100px 0'
      }}>
      <DialogTrigger {...props} onOpenChange={action('open change')}>
        <ActionButton>Trigger</ActionButton>
        {(close) => (
          <AlertDialog
            title="Alert! Danger!"
            variant="error"
            primaryActionLabel="Accept"
            secondaryActionLabel="Whoa"
            cancelLabel="Cancel"
            onCancel={chain(close, action('cancel'))}
            onPrimaryAction={chain(close, action('primary'))}
            onSecondaryAction={chain(close, action('secondary'))}>
            <Text>
              Fine! No, absolutely fine. It's not like I don't have, you know, ten thousand other
              test subjects begging me to help them escape. You know, it's not like this place is
              about to EXPLODE.
            </Text>
          </AlertDialog>
        )}
      </DialogTrigger>
    </div>
  );
}
