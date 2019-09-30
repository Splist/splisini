import { createElement, FC, Fragment } from 'react';
import { MessageView } from './messages/MessageView';
import { MessageInput } from './messages/MessageInput';

export const App: FC = () => {
    return <Fragment>
        <MessageView/>
        <MessageInput/>
    </Fragment>
};
