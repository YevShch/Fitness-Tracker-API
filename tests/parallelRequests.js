import http from 'http';

// Function to send a request to the API
async function sendRequest ( url, data ) {
  return new Promise( ( resolve, reject ) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request( url, options, ( res ) => {
      let responseData = '';
      res.on( 'data', ( chunk ) => {
        responseData += chunk;
      } );
      res.on( 'end', () => {
        resolve( responseData );
      } );
    } );

    req.on( 'error', ( error ) => {
      reject( error );
    } );

    req.write( JSON.stringify( data ) );
    req.end();
  } );
}

// Function to send multiple parallel requests
async function sendParallelRequests () {
  try {
    const url = 'http://localhost:3000/api/goals';
    const requestData = {
      "userId": "661e34c1aa109d60e825719a",
      "type": "lose_weight",
      "target": "get_healthier",
      "createdAt": "2024-03-28T06:31:09.162Z"
    };

    const promises = [];
    for ( let i = 0; i < 5; i++ ) {
      promises.push( sendRequest( url, requestData ) );
    }

    // Waiting for all requests to complete
    const responses = await Promise.all( promises );
    console.log( 'Responses:', responses );
  } catch ( error ) {
    console.error( 'Error:', error );
  }
}

// Call the function to send parallel requests
sendParallelRequests();
