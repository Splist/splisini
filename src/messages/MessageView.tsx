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

const TAKE = 10;

export const MessageView: FC = () => {

    const { loading, error, data, subscribeToMore, fetchMore } = useQuery(MESSAGES, {
        variables: {
            input: {
                skip: 0,
                take: TAKE,
            },
        },
    });

    // When server emits new message
    useEffect(() => subscribeToMore({
        document: NEW_MESSAGE,
        updateQuery: (prev, { subscriptionData: { data } }) => {

            if (!data) return prev;

            return {
                ...prev,
                messages: [
                    data.newMessage,
                    ...prev.messages,
                ],
            };
        },
    }));

    // When user asks for more old messages
    const loadMore = () => fetchMore({
        variables: {
            input: {
                skip: data.messages.length,
                take: TAKE,
            },
        },
        updateQuery: (prev: any, { fetchMoreResult: data }) => {

            if (!data) return prev;

            return {
                ...prev,
                messages: [
                    ...prev.messages,
                    ...data.messages,
                ],
            };
        },
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error! {error.message}</p>;

    return <ul>
        <li>
            <button onClick={loadMore}>Load More</button>
        </li>
        {
            data.messages.map((msg: any) =>
                <li key={msg.id}>{msg.content}</li>
            )
            .reverse()
        }
    </ul>;
};
