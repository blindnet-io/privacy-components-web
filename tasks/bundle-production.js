// @ts-nocheck
/* eslint-disable no-console */
/**
 * Modify build directory to switch the staging API url for the
 * production when building the production demo.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import replace from 'replace-in-file';

const options = {
  files: 'build/demos/**/*',
  from: [
    'computation-base-url="https://stage.computing.blindnet.io/v0/"',
    /blindnet-connector-demo-staging.azurewebsites.net/g,
  ],
  to: [
    'computation-base-url="https://computing.blindnet.io/v0/"',
    /blindnet-connector-demo.azurewebsites.net/g,
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
