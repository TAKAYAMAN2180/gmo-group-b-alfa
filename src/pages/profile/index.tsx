import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

/**
 * 以下のようなプロフィールを作成する
 */
export interface Profile {
  name: string;
  email: string;
  department: string;
  technologies: Technology[];
}

/**
 * 保有技術
 */
export interface Technology {
  name: string;
  // age: string;
}

/**
 * プロフィールページ
 * 
 * @returns 
 */
export default function Page() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<Profile>({
    name: "",
    email: "",
    department: "",
    technologies: [{
      name: "",
    }]
  });

  // セッション内にプロフィールがあれば取得する
  useEffect(() => {
    const item = sessionStorage.getItem("profile");
    if (item) setInputValue(JSON.parse(item));
  }, [])

  /**
   * @param e 名前入力欄の変更イベント 
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      name: e.target.value
    });
  }

  /**
   * @param e 部署入力欄の変更イベント
   */
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      department: e.target.value
    });
  }

    /**
   * @param e メールアドレス入力欄の変更イベント
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      email: e.target.value
    });
  }

  /**
   * @param e 保有技術入力欄の変更イベント
   * @param index 保有技術のindex
   * @param attribute 保有技術の属性
   */
  const handletechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, attribute: string) => {
    const newInputValue = { ...inputValue };
    newInputValue.technologies[index] = {
      name: attribute === "name" ? e.target.value : inputValue.technologies[index].name,
      // age: attribute === "age" ? e.target.value : inputValue.technologies[index].age
    }
    setInputValue(newInputValue);
  };

  /**
   * 保有技術の追加
   */
  const handleAddTechnology = () => {
    // 入力がない場合は追加しない
    if (inputValue.technologies[inputValue.technologies.length - 1].name === "") return;
    // if (inputValue.technologies[inputValue.technologies.length - 1].age === "") return;

    const newInputValue = { ...inputValue };
    newInputValue.technologies.push({
      name: "",
      // age: ""
    });
    setInputValue(newInputValue);
  }

  /**
   * @param index 削除する保有技術のindex
   */
  const handleDeleteTechnology = (index: number) => {
    // 技術が1つしかない場合は削除しない
    if (inputValue.technologies.length === 1) return;
    const newInputValue = { ...inputValue };
    newInputValue.technologies.splice(index, 1);
    setInputValue(newInputValue);
  }

  /**
   * 更新ボタン押下時の処理
   */
  const submit = () => {
    // 入力がない場合は更新しない
    if (inputValue.name === "") return;
    if (inputValue.department === "") return;
    if (inputValue.technologies.some((ability) => ability.name === "")) return;

    sessionStorage.setItem("profile", JSON.stringify(inputValue));
    router.push("/profile/confirm");
  }

  return (
    <div>
      <h1>プロフィール</h1>

      <div>
        <label>お名前：<input type="text" value={inputValue.name} onChange={(e) => handleNameChange(e)} /></label>
        <br />
        <label>メールアドレス：<input type="email" value={inputValue.email} onChange={(e) => handleEmailChange(e)} /></label>
        <br />
        <label>部署：<input type="text" value={inputValue.department} onChange={(e) => handleDepartmentChange(e)} /></label>
        <br />
        <label>
          保有技術：<br />
          {inputValue.technologies.map((ability, index) => (
            <div key={index}>
              <label>技術：<input type="text" value={ability.name} onChange={(e) => handletechnologiesChange(e, index, "name")} /></label>
              {/* <label>年数：<input type="text" value={ability.age} onChange={(e) => handletechnologiesChange(e, index, "age")} /></label> */}
              <button onClick={() => handleDeleteTechnology(index)}>削除</button>
            </div>
          )
          )}
          <button onClick={() => handleAddTechnology()}>追加</button>
        </label>
        <br />
        <label><button onClick={() => submit()}>更新</button></label>
      </div>
    </div>
  )
}