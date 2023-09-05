import React, { useEffect, useState } from "react";

type Task = {
  "id": number,
  "name": string,
  "date": string,
  "maxNumber": number,
  "number": number,
  "location": string,
};

// const getTasks = async (setData: any) => {
//   //   // api実装されたらこれをやる
//   const response = await fetch("/api/tasks");
//   const data: Task[] = await response.json();
//     // ダミーデータ
//   const tasks: Task[] = [
//     {
//       "id": 1,
//       "name": "モダンフロント勉強会",
//       "date": "9月11日 17時～",
//       "maxNumber": 20,
//       "number": 20,
//       "location": "オンライン", 
//     },
//     {
//       "id": 2,
//       "name": "React.js勉強会",
//       "date": "9月13日",
//       "maxNumber": 25,
//       "number": 10,
//       "location": "GMOオフィス", 
//     }
//   ];
//   setData(tasks);
// }

export default function Page() {
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "name": "モダンフロント勉強会",
      "date": "9月11日 17時～",
      "maxNumber": 20,
      "number": 20,
      "location": "オンライン", 
    },
    {
      "id": 2,
      "name": "React.js勉強会",
      "date": "9月13日",
      "maxNumber": 25,
      "number": 10,
      "location": "GMOオフィス", 
    }
  ]);
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data.tasks)
    };
    fetchTasks();
  }, [])
  return (
  <>
  <p>username</p>
  <a href="/event/new">イベントの作成</a>
  <div>
    {tasks.map((task: any) => 
    <div>
      <h1>{task.name}</h1>
      <h2>{task.date}</h2>
      <p>参加者 {task.number}/{task.maxNumber}人</p>
      <p>場所  {task.location}</p>
    </div>
    )}
  </div>
  <div>
    <h3>フィルター</h3>
  </div>
  </>
  ) 
}
