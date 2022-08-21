import React from "react";
import axios from "axios";
import Create from "./Create";
import View from "./View";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector(selectUser);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:4000/article").then((res) => {
      if (res.data.article) {
        setData(res.data.article);
      } else {
        alert("error");
      }
    });
  }, []);
  return (
    <>
      <Create userid={user.userid} _id={user._id} />
      {data?.map((article) => (
        <View
          key={article._id}
          id={article._id}
          image={article.image}
          title={article.title}
          comments={article.comments}
          description={article.description}
          userid={user._id}
          name={user.userid}
          creator={article.creator.userid}
        />
      ))}
    </>
  );
};

export default Home;
