import React, { useEffect } from "react";
import classData from "../../../src/data/class_data";
import { useGlobalState } from "../../config/globalState";
const Classes = () => {
  // !useGlobalState is used to access store globally which is defined in app.js that has access to all the states
  const { store, dispatch } = useGlobalState();
  const { classes } = store;
  // !use ClassData in use effect
  useEffect(() => {
    dispatch({
      type: "setClasses",
      data: classData,
    });
  }, []);
  console.log("classes=>", classes);

  const content = classes.map((c) => (
    <div key={c._id}>
      <h3>{c.title}</h3>
      <p>{c.content}</p>
      <p>Time: {c.time}</p>
      <p>Maximum number: {c.maxNumber}</p>
    </div>
  ));

  return (
    <div>
      <h1>Classes</h1>
      {content}
    </div>
  );
};
export default Classes;

{
  /* <div>
      {blogPosts
        .sort((a, b) => b.modified_date - a.modified_date)
        .map((post) => (
          <BlogPost key={post._id} post={post} />
        ))}
    </div> */
}
