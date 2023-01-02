// @ts-nocheck
/* eslint-disable no-console */
/**
 * Use the staging api link for staging demo
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import replace from 'replace-in-file';

const options = {
  files: 'build/demos/**/*',
  from: 'computation-base-url="https://computing.blindnet.io/v0/"',
  to: 'computation-base-url="https://stage.computing.blindnet.io/v0/"',
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
