import * as Bucket from "@spica-devkit/bucket";
const API_KEY = "f2bcj17laqlao3a";
const BUCKET_ID = "6385cbc7ea080c002bb484ac";
export interface TextItem {
  _id: string;
  like: number;
  dislike: number;
  text: string;
}

let connection: Bucket.RealtimeConnection<TextItem[]>;

function initialize() {
  Bucket.initialize({
    publicUrl: "https://master.spicaengine.com/api",
    apikey: API_KEY,
  });
}
function getReactionsRealTime() {
  initialize();
  connection = Bucket.data.realtime.getAll(BUCKET_ID);
  return connection;
}

export { getReactionsRealTime, initialize };
