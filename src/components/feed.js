import React from 'react';
//import Typography from '@material-ui/core/Typography';

function Feed({match}) {
    return (
        <div>
            <h1>{match.params.id}</h1>
            </div>
    );
}

export default Feed;