import React from 'react';
import Auth from '../utils/auth';
import FaveList from '../components/FaveList/FaveList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';


const Faves = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const faves = data?.me.favorites || {};

    console.log(faves);

    const loggedIn = Auth.loggedIn();

    return (
        <main className="flex-row">
            {!loggedIn && 
                <Segment placeholder>
                    <Header icon>
                        <Icon name="warning circle" />
                        You must be logged in to view this page
                    </Header>
                    <Button as='a' href="/" primary>Back to Home</Button>
                </Segment>
            } 
            {faves.length === 0 && (
                <Segment placeholder>
                    <Header icon>
                        <Icon name="warning circle" />
                        You do not have any faves yet.
                    </Header>
                    <Button as='a' href="/" primary>Back to Home</Button>
                </Segment>
            )}
            {loading ? (
                <Segment loading/>
            ) : (
                <FaveList faves={faves}/>
            )}
        </main>
    )
}

export default Faves;