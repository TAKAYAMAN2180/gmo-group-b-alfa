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
    },
    {
      "id": 3,
      "name": "Vue.js勉強会",
      "date": "9月15日",
      "maxNumber": 10,
      "number": 6,
      "location": "オンライン",
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
      <div className=".container mt-4 p-4 container-fluid">
        <div className="">
          <p>usernameさん</p>
          <div className="col-9 d-flex justify-content-between">
            <div className="pb-3">
              <h1 className="border-primary border-start border-3 ps-3">イベント一覧</h1>
            </div>
            <a className="btn btn-warning rounded-pill mt-5" href="/event/new">＋イベントの作成</a>
          </div>
        </div>
        <div className="row justify-content-around">
          <div className="row gy-2 col-9">
            {tasks.map((task: any) =>
              <div className="btn btn-outline-primary d-flex justify-content-around">
                <div className="col-9">
                  <h1>{task.name}</h1>
                  <h2>{task.date}</h2>
                </div>
                <div className="col-3 border-primary border-start pt-3">
                  <h5>参加者 {task.number}/{task.maxNumber}人</h5>
                  <h5>場所  {task.location}</h5>
                </div>
              </div>
            )}
          </div>
          <div className="row gy-2 col-3">
            <div className="border border-secondary rounded">
              <h3 className="border-bottom border-secondary p-3">フィルター</h3>
              <div className="m-2">
                <p>#フロントエンド</p>
                <p>#バックエンド</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
