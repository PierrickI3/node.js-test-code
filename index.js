// Full Node.js SDK is available here: https://developer.mypurecloud.ie/api/rest/client-libraries/javascript/

// Obtain a reference to the platformClient object
const platformClient = require('purecloud-platform-client-v2');
const client = platformClient.ApiClient.instance;

const clientId = 'f73c5e92-850f-4569-85bb-3886f9f34be3';
const clientSecret = 'IvMI23xGds2n41pGt2dia7P9PKpA2QEpN86vmB5UEog';

// Set your region/environment (depends which Genesys Cloud organization you are using)
client.setEnvironment('mypurecloud.ie'); // Available environments: https://developer.mypurecloud.com/api/rest/index.html

// We will login using the 'Client Credentials' OAuth method. This is preferred when being used from a service.
client.loginClientCredentialsGrant(clientId, clientSecret).then(()=> {
  console.log('Connected!');
  
  // Show all queues
  getAllQueues();

  // Get EWT from a specific queue id
  //getEWT('c88937af-df4f-47cf-80e3-a6739afa65b5');

  // Create a callback on a specific queue id
  //createCallback('c88937af-df4f-47cf-80e3-a6739afa65b5', 'Pierrick', ['+33680854089']);

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
function createCallback(queueId, name, phoneNumbers) {
  let apiInstance = new platformClient.ConversationsApi();
  let body = {
    queueId: queueId,
    callbackUserName: name,
    callbackNumbers: phoneNumbers,
  }

  apiInstance.postConversationsCallbacks(body).then((data) => {
    console.log(JSON.stringify(data, null, 2));
  }).catch((err) => {
    console.error(err);
  });
}