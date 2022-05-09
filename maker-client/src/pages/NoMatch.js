import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';

const NoMatch = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='warning circle'/>
                Oops, we couldn't find that page.
            </Header>
            <Button as='a' href="/" primary>Back to Home</Button>
        </Segment>
    );
};

export default NoMatch;