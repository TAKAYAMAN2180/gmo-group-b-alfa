import React, { useState } from "react";

/**
 * 以下のようなプロフィールを作成する
 */
interface Profile {
  name: string;
  department: string;
  abilities: Ability[];
}

/**
 * 保有技術
 */
interface Ability {
  name: string;
  age: string;
}

/**
 * プロフィールページ
 * 
 * @returns 
 */
export default function Page() {
  const [inputValue, setInputValue] = useState<Profile>({
    name: "",
    department: "",
    abilities: [{
      name: "",
      age: ""
    }]
  });

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
   * @param e 保有技術入力欄の変更イベント
   * @param index 保有技術のindex
   * @param attribute 保有技術の属性
   */
  const handleAbilitiesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, attribute: string) => {
    const newInputValue = { ...inputValue };
    newInputValue.abilities[index] = {
      name: attribute === "name" ? e.target.value : inputValue.abilities[index].name,
      age: attribute === "age" ? e.target.value : inputValue.abilities[index].age
    }
    setInputValue(newInputValue);
  };

  /**
   * 保有技術の追加
   */
  const handleAddAbility = () => {
    const newInputValue = { ...inputValue };
    newInputValue.abilities.push({
      name: "",
      age: ""
    });
    setInputValue(newInputValue);
  }

  /**
   * @param index 削除する保有技術のindex
   */
  const handleDeleteAbility = (index: number) => {
    const newInputValue = { ...inputValue };
    newInputValue.abilities.splice(index, 1);
    setInputValue(newInputValue);
  }

  /**
   * 更新ボタン押下時の処理
   */
  const submit = () => {
    console.log(inputValue);
  }

  return (
    <div>
      <h1>プロフィール</h1>

      <div>
        <label>お名前：<input type="text" onChange={(e) => handleNameChange(e)} /></label>
        <br />
        <label>部署：<input type="text" onChange={(e) => handleDepartmentChange(e)} /></label>
        <br />
        <label>
          保有技術：<br />
          {inputValue.abilities.map((ability, index) => (
            <div key={index}>
              <label>技術：<input type="text" value={ability.name} onChange={(e) => handleAbilitiesChange(e, index, "name")} /></label>
              <label>年数：<input type="text" value={ability.age} onChange={(e) => handleAbilitiesChange(e, index, "age")} /></label>
              <button onClick={() => handleDeleteAbility(index)}>削除</button>
            </div>
          )
          )}
          <button onClick={() => handleAddAbility()}>追加</button>
        </label>
        <br />
        <label><button onClick={() => submit()}>更新</button></label>
      </div>
    </div>
  )
}
