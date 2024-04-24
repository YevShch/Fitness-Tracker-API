// import http from './node_modules/k6/package.json';
import k6 from 'k6';

import { sleep } from 'k6';

export default function () {
  // Send a request to the API
  const response = http.get( 'http://localhost:3000/api/users' );

  // Check if the response status code is 200
  if ( response.status !== 200 ) {
    console.error( `Unexpected status code: ${ response.status }` );
  }

  // Wait for some time before sending the next request (e.g., 1 second)
  sleep( 1 );

  // Send a request to the API
  const secondResponse = http.get( 'http://localhost:3000/api/activities' );

  // Check if the response status code is 200
  if ( secondResponse.status !== 200 ) {
    console.error( `Unexpected status code: ${ secondResponse.status }` );
  }

  // Wait for some time before sending the next request (e.g., 1 second)
  sleep( 1 );

  // Send a request to the API
  const thirdResponse = http.get( 'http://localhost:3000/api/goals' );

  // Check if the response status code is 200
  if ( thirdResponse.status !== 200 ) {
    console.error( `Unexpected status code: ${ thirdResponse.status }` );
  }

  // Wait for some time before sending the next request (e.g., 1 second)
  sleep( 1 );

  // Send a request to the API
  const fourthResponse = http.get( 'http://localhost:3000/api/stepCounts' );

  // Check if the response status code is 200
  if ( fourthResponse.status !== 200 ) {
    console.error( `Unexpected status code: ${ fourthResponse.status }` );
  }

  // Wait for some time before sending the next request (e.g., 1 second)
  sleep( 1 );
}
