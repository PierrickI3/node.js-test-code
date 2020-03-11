// Full Node.js SDK is available here: https://developer.mypurecloud.ie/api/rest/client-libraries/javascript/

// Obtain a reference to the platformClient object
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

const clientId = 'db4ca855-972b-49f5-8d26-16d3b3e5c0fd';
const clientSecret = 'm9MjISsNOMqhiTdP71td8ZWPk6_QFVILYcMoc9Y-cp4';

// Set your region/environment (depends which Genesys Cloud organization you are using)
client.setEnvironment('mypurecloud.ie'); // Available environments: https://developer.mypurecloud.com/api/rest/index.html

// We will login using the 'Client Credentials' OAuth method. This is preferred when being used from a service.
client.loginClientCredentialsGrant(clientId, clientSecret).then(()=> {
  console.log('Connected!');
  
  // Show all queues
  getAllQueues();

  // Get EWT from a specific queue id
  //getEWT('c88937af-df4f-47cf-80e3-a6739afa65b5');

  // Create a callback on a specific queue id at a specific date
  //createCallback('c88937af-df4f-47cf-80e3-a6739afa65b5', 'Pierrick', ['+33680854089'], new Date("2020-03-12T15:30:00.000Z"));

}).catch((err) => {
  // Handle failure response
  console.error(err);
});

// https://developer.mypurecloud.ie/api/rest/client-libraries/javascript/RoutingApi.html#getRoutingQueues
function getAllQueues() {
  let apiInstance = new platformClient.RoutingApi();
  let opts = {
    pageSize: 100,
    pageNumber: 1
  }

  apiInstance.getRoutingQueues(opts).then((data) => {
    console.log(JSON.stringify(data, null, 2));
  }).catch((err) => {
    console.error(err);
  });
}

// https://developer.mypurecloud.ie/api/rest/client-libraries/javascript/RoutingApi.html#estimatedwaittimepredictions_getroutingqueuemediatypeestimatedwaittime_queueid__mediatype_
function getEWT(queueId) {
  if (!queueId) return;

  // More information on what EWT is here: https://developer.mypurecloud.com/api/rest/v2/routing/estimatedwaittime.html

  let mediaType = 'all';
  let apiInstance = new platformClient.RoutingApi();

  apiInstance.getRoutingQueueMediatypeEstimatedwaittime(queueId, mediaType).then((data) => {
    console.log(JSON.stringify(data, null, 2)); // If "estimatedWaitTimeSeconds" is missing from the output, this means that there are no active agents in that queue
  }).catch((err) => {
    console.error(err);
  });

}

// https://developer.mypurecloud.ie/api/rest/client-libraries/javascript/ConversationsApi.html#postConversationsCallbacks
function createCallback(queueId, name, phoneNumbers, scheduledDate) {
  let apiInstance = new platformClient.ConversationsApi();
  let body = {
    queueId: queueId,
    callbackUserName: name,
    callbackNumbers: phoneNumbers,
    callbackScheduledTime: scheduledDate
  }

  apiInstance.postConversationsCallbacks(body).then((data) => {
    console.log(JSON.stringify(data, null, 2));
  }).catch((err) => {
    console.error(err);
  });
}