import React from "react";

export default function ListComponent(props) {
  const listItems = myList.map((item) =>
    <li>{item}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const myList = ["apple", "orange", "strawberry", "blueberry", "avocado"];

