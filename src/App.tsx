import React, { FC, Fragment } from 'react';
import { MessageInput } from './messages/MessageInput';
import { MessageView } from './messages/MessageView';

export const App: FC = () => (
    <Fragment>
        <MessageView />
        <MessageInput />
    </Fragment>
);
