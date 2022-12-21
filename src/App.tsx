import { RealtimeConnection } from "@spica-devkit/bucket";
import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { getReactionsRealTime, TextItem } from "./services/Spica.service";
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
    <div className={styles["App"]}>
      <h1>SPICA REALTIME UI</h1>
      <ul className={styles["itemContainer"]}>
        {textItems.map((item) => (
          <li key={item._id}>
            <p>{item.text}</p>
            <div className={styles["emojiContainer"]}>
              <button
                onClick={() => handleClick(item._id, "like")}
                className={styles["emojiCount"]}
              >
                <span>👍</span>
                <span>{item.like}</span>
              </button>
              <button
                onClick={() => handleClick(item._id, "dislike")}
                className={styles["emojiCount"]}
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
