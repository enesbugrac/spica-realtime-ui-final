import * as Bucket from "@spica-devkit/bucket";
const API_KEY = "<YOUR_API_KEY>";
const BUCKET_ID = "<YOUR_BUCKET_ID>";
function initialize() {
  Bucket.initialize({
    publicUrl: "<YOUR_API_URL>",
    apikey: API_KEY,
  });
}
function getReactionsRealTime() {
  initialize();
  return Bucket.data.realtime.getAll(BUCKET_ID);
}
function updateReactionRealTime(document: {
  _id: string;
  text: string;
  like: number;
  dislike: number;
}) {
  initialize();
  let connection = Bucket.data.realtime.getAll(BUCKET_ID);
  connection.subscribe();
  connection.replace(document);
  return connection.subscribe().unsubscribe();
}

export { getReactionsRealTime, initialize, updateReactionRealTime };
