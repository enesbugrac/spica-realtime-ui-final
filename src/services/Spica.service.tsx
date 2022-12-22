import * as Bucket from "@spica-devkit/bucket";
const API_KEY = "<YOUR_API_KEY>";
const BUCKET_ID = "<YOUR_BUCKET_ID";
export interface TextItem {
  _id: string;
  like: number;
  dislike: number;
  text: string;
}

let connection: Bucket.RealtimeConnection<TextItem[]>;

function initialize() {
  Bucket.initialize({
    publicUrl: "<YOUR_API_URL>",
    apikey: API_KEY,
  });
}
function getReactionsRealTime() {
  initialize();
  connection = Bucket.data.realtime.getAll(BUCKET_ID);
  return connection;
}

export { getReactionsRealTime, initialize };
