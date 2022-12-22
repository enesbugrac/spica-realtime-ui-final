import { RealtimeConnection } from "@spica-devkit/bucket";
import React, { useEffect, useRef, useState } from "react";
import { getReactionsRealTime, TextItem } from "./services/Spica.service";
import "./App.css";

// const dummyTextandEmojis = [
//   { text: "Life", _id: "1", like: 5, dislike: 10 },
//   { text: "Test", _id: "2", like: 5, dislike: 10 },
//   { text: "Test2", _id: "3", like: 5, dislike: 10 },
//   { text: "Test3", _id: "4", like: 5, dislike: 10 },
//   { text: "Test4", _id: "5", like: 5, dislike: 10 },
// ];

function App() {
  const [textItems, settextItems] = useState<TextItem[]>([]);
  const connection = useRef<RealtimeConnection<TextItem[]>>();

  const setConnection = () => {
    connection.current = getReactionsRealTime() as RealtimeConnection<
      TextItem[]
    >;
  };

  useEffect(() => {
    setConnection();
    let subscribiton = connection.current?.subscribe((res: TextItem[]) =>
      settextItems(res)
    );
    return () => {
      subscribiton?.unsubscribe();
    };
  }, []);

  const handleClick = (_id: string, operation: string) => {
    var newDoc = textItems.find((item) => item._id === _id);
    if (operation === "like" && newDoc) {
      newDoc.like = newDoc.like + 1;
    } else if (operation === "dislike" && newDoc) {
      newDoc.dislike = newDoc.dislike + 1;
    }
    console.log(newDoc);
    connection.current?.replace(newDoc!);
  };
  return (
    <div className="container gp-2 page">
      <div className="page-header">SPICA REALTIME UI</div>
      <ul className="itemContainer card">
        {textItems.map((item) => (
          <li className="card" key={item._id}>
            <p>{item.text}</p>
            <div className="emojiContainer">
              <button
                onClick={() => handleClick(item._id, "like")}
                className="emojiCount"
              >
                <span>👍</span>
                <span>{item.like}</span>
              </button>
              <button
                onClick={() => handleClick(item._id, "dislike")}
                className="emojiCount"
              >
                <span>👎</span>
                <span>{item.dislike}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
