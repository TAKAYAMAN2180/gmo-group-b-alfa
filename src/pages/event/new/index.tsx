import React, { useState } from "react";

type Event = {
    "create_user": string,
    "name": string,
    "technologies": string[],
    "start_time": string,
    "end_time": string,
    "location": string,
    "description": string,
    "limitation": number,
    "record_url": string,
}

export default function Page() {
  const [formData, setFormData] = useState<Event>({
    "create_user": "Taro",
    "name": "Vue.js勉強会",
    "technologies": [
      "フロントエンド",
      "Vue.js",
    ],
    "start_time": "2022-02-02 17:00",
    "end_time": "2022-02-02 19:00",
    "location": "オンライン",
    "description": "Let's study Vue.js!!!",
    "limitation": 20,
    "record_url": "hoge.google.com?hogehogehoge",
  });
  //   const [formData, setFormData] = useState<Event>({
  //   "create_user": "",
  //   "name": "",
  //   "technologies": [""],
  //   "start_time": "",
  //   "end_time": "",
  //   "location": "",
  //   "description": "",
  //   "limitation": 0,
  //   "record_url": "",
  // });
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  };

  const handleTechChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTech = [...formData.technologies]
    newTech[index] = e.target.value;
    setFormData({ ...formData, technologies: newTech})
  };
 
  const submitEventInfo = async (e: any) => {
    e.preventDefault();
    
    const updatedForm = {...formData,
      "create_user": "Taro",
    };
    setFormData(updatedForm);
    try {
      const response = await fetch("api/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log("form data is submitted.");
      } else {
        console.log("form data is not submitted")
        console.log(formData);
      } 
    } catch (error) {
      console.error("Error", error);
    }
  };
  
  const addTags = async () => {
    setFormData({...formData, technologies: [...formData.technologies, ""]});
  }

  return (
    <form onSubmit={submitEventInfo}>
      <div>
        <div>
        <label>イベント名</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
        </div>
        <div>
        {formData.technologies.map((tech, index) => (
          <div key={index}>
            <label>技術ラベル{index + 1}</label>
            <input type="text" name={`technologies[${index}]`} value={tech} onChange={(e) => handleTechChange(e, index)} required/>
          </div>
        ))}
        <button type="button" onClick={addTags}>新しいタグの追加</button>
        </div>
        <div>
        <label>開始時刻</label>
        <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required/>
        </div>
        <div>
        <label>終了時刻</label>
        <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required/>
        </div>
        <div>
        <label>場所</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required/>
        </div>
        <div>
        <label>イベントの説明</label>
        <textarea name="description" value={formData.description} cols={40} rows={5} onChange={handleChange} required></textarea>
        </div>
        <div>
        <label>参加可能人数</label>
        <input type="number" name="limitation" value={formData.limitation} onChange={handleChange} required/>
        </div>
        <div>
        <label>record_url</label>
        <input type="text" name="record_url" value={formData.record_url} onChange={handleChange} required/>
        </div>
        <div>
        <button type="submit">送信</button>
        </div>
      </div>
    </form>
  )
}
