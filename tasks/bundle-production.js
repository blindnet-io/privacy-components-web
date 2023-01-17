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
    /stage.computing.blindnet.io/g,
    /blindnet-connector-demo-staging.azurewebsites.net/g,
    /1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc/g, // Auth0 staging app client ID
    /28b5bee0-9db8-40ec-840e-64eafbfb9ddd/g, // Staging consent ID
  ],
  to: [
    'computing.blindnet.io', // Point all blindnet modules to production PCE
    'blindnet-connector-demo.azurewebsites.net', // Point any other URLs to production backend
    'Q4KiSJ5vF1HCcWyNPYZLzQmNzt3YLszz', // Auth0 production app client ID
    '3b60d2dc-bbe7-4bd8-8429-8952263b41ea', // Production consent ID
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
