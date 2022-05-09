import React from 'react';
import Auth from '../utils/auth';
import SaveList from '../components/SaveList/SaveList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';


const Saves = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const saves = data?.me.saves || {};

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
            {saves.length === 0 && (
                <Segment placeholder>
                    <Header icon>
                        <Icon name="warning circle" />
                        You do not have any saves yet.
                    </Header>
                    <Button as='a' href="/" primary>Back to Home</Button>
                </Segment>
            )}
            {loading ? (
                <Segment loading/>
            ) : (
                <SaveList saves={saves}/>
            )}
        </main>
    )
}

export default Saves;