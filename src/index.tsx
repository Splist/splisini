import { createElement } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { App } from './App';
import { createClient } from './createClient';

const client = createClient({
    url: 'http://localhost:8080',
});

const Root = () => (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

render(<Root/>, document.getElementById('app'));
