import { createElement, FC, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
    mutation($input: SendMessageInput!) {
        sendMessage(input: $input) {
            id
        }
    }
`;

export const MessageInput: FC = () => {

    const [content, setContent] = useState('');

    const [sendMessage] = useMutation(SEND_MESSAGE);


    return <input

        value={content}
        onChange={e => setContent(e.target.value)}

        onKeyPress={e => {

            if (e.key !== 'Enter') return;

            sendMessage({
                variables: {
                    input: {
                        content,
                    },
                },
            });

            setContent('');
        }}
    />
};
