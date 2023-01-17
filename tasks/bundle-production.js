// @ts-nocheck
/* eslint-disable no-console */
/**
 * Modify demo build directory for production
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import replace from 'replace-in-file';

const options = {
  files: 'build/demos/**/*',
  from: [
    'computation-base-url="https://stage.computing.blindnet.io"',
    /blindnet-connector-demo-staging.azurewebsites.net/g,
    /1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc/g, // Auth0 staging app client ID
  ],
  to: [
    'computation-base-url="https://computing.blindnet.io"', // Point all blindnet modules to production PCE
    'blindnet-connector-demo.azurewebsites.net', // Point any other URLs to production backend
    'Q4KiSJ5vF1HCcWyNPYZLzQmNzt3YLszz', // Auth0 production app client ID
  ],
};

replace(options)
  .then(results => {
    console.log(
      'Replacement results:',
      results.filter(result => result.hasChanged)
    );
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });
