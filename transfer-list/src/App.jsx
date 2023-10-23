import "./App.css";
import { useState } from "react";
import List from "./components/list/List";

const list = [
  { id: 1, item: "item 1" },
  { id: 2, item: "item 2" },
  { id: 3, item: "item 3" },
  { id: 4, item: "item 4" },
];

function App() {
  const [leftList, setLeftList] = useState(list);
  const [rightList, setRightList] = useState([]);
  const [checkedList, setCheckedList] = useState(new Array(4).fill(false));

  function handleChange(e) {
    const cl = [...checkedList];
    cl[e.target.id - 1] = !cl[e.target.id - 1];
    setCheckedList(cl);
  }

  function leftToRight() {
    const shouldProceed = leftList.some((ele) => {
      return checkedList[ele.id - 1] === true;
    });
    if (!shouldProceed) return;

    const rightChecked = rightList.filter((ele) => {
      return checkedList[ele.id - 1] === true;
    });

    const newRightList = list.filter((ele) => {
      return checkedList[ele.id - 1] === true;
    });
    const newLeftList = leftList.filter((l) => {
      if (checkedList[l.id - 1] !== true) return l;
    });

    setLeftList(newLeftList);
    setRightList([...new Set(rightList.concat(newRightList))]);

    let newCheckedList = new Array(4).fill(false);
    if (rightChecked.length) {
      rightChecked.forEach((e) => {
        newCheckedList[e.id - 1] = true;
      });
    }

    setCheckedList(newCheckedList);
  }

  function rightToLeft() {
    const shouldProceed = rightList.some((ele) => {
      return checkedList[ele.id - 1] === true;
    });
    if (!shouldProceed) return;

    const leftChecked = leftList.filter((ele) => {
      return checkedList[ele.id - 1] === true;
    });

    const newLeftList = list.filter((ele) => {
      return checkedList[ele.id - 1] === true;
    });
    const newRightList = rightList.filter((l) => {
      if (checkedList[l.id - 1] !== true) return l;
    });

    setRightList(newRightList);
    setLeftList([...new Set(leftList.concat(newLeftList))]);

    let newCheckedList = new Array(4).fill(false);
    if (leftChecked.length) {
      leftChecked.forEach((e) => {
        newCheckedList[e.id - 1] = true;
      });
    }

    setCheckedList(newCheckedList);
  }

  return (
    <div className="container">
      <div className="box">
        {leftList.map((l) => {
          return <List key={l.id} label={l.item} handleChange={handleChange} />;
        })}
      </div>
      <div className="btns">
        <button onClick={leftToRight}>{">"}</button>
        <button onClick={rightToLeft}>{"<"}</button>
      </div>
      <div className="box">
        {rightList.map((l) => {
          return <List key={l.id} label={l.item} handleChange={handleChange} />;
        })}
      </div>
    </div>
  );
}

export default App;
