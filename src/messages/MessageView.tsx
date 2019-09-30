import { createElement, FC, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const MESSAGES = gql`
    query($input: MessagesInput!) {
        messages(input: $input) {
            id
            content
        }
    }
`;

const NEW_MESSAGE = gql`
    subscription {
        newMessage {
            id
            content
        }
    }
`;

export const MessageView: FC = () => {

    const { loading, error, data, subscribeToMore } = useQuery(MESSAGES, {
        variables: {
            input: {
                skip: 0,
                take: 0,
            } ,
        },
    });

    useEffect(() => subscribeToMore({
        document: NEW_MESSAGE,
        updateQuery: (prev, { subscriptionData: { data } }) => {

            if (!data) return prev;

            return {
                ...prev,
                messages: [
                    ...prev.messages,
                    data.newMessage,
                ],
            };
        },
    }));

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error! {error.message}</p>;

    return <ul>{
        data.messages.map((msg: any) =>
            <li key={msg.id}>{msg.content}</li>
        )
    }</ul>
};
