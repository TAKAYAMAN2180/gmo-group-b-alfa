import { Props } from "next/script";
import React, { useEffect, useState } from "react";

export async function generateStaticParams() {
  // apiが完成したらfetchの方に切り替える
  // const response = await fetch("/api/tasks");
  // const data = await response.json();

  const data = {
    tasks: [
      {
        "id": "1",
        "name": "hello",
      },
      {
        "id": "2",
        "name": "world",
      }
    ]
  }

  // return data.tasks.map((task) => {})
  return data;
}

export default function Page({ params }) {
  return (
    <>
    <p>username</p>
    <a href="/event/new">イベントの作成</a>
    <div>
      {params.tasks.map((task) =>(
        <div>{task}</div>
      ))}
    </div>
    </>
  )
}

// export default function Page() {
//   return (
//     <>
//     <button className="btn btn-primary">hello</button>
//     </>
//   )
// }
