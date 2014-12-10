module.exports = {

  /////////////////////////////
  // Project-Wide Config
  /////////////////////////////
  'aws': {
    'region': 'us-east-1',

    'swf': {
      'domain': 'aws-swf-test-domain'
    }
  },


  /////////////////////////////
  // Activity Worker
  /////////////////////////////
  'activities': {

    'tasklist': 'aws-swf-tasklist',
    'identity': 'default-activity-worker',

    /**
     * Add your activity configs here :
     */
    /*
    // Example for mogy-mysql :
    'mysql': {
      'host'     : 'localhost',
      'user'     : 'me',
      'password' : 'myp4ss',
      'database' : 'project'
    }*/

  },


  /////////////////////////////
  // Decider Worker
  /////////////////////////////
  'deciders': {
    'tasklist': 'aws-swf-tasklist',
    'identity': 'default-decider-worker'
  }


};
