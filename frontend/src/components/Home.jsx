import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Router } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const [cookie, setcookie] = useState(null);
  useEffect(() => {
    setTimeout(() => {}, 100);
    axios({
      method: "post",
      url: "http://localhost:8000/",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        setcookie(response.data);
      })
      .catch((error) => {
        console.log(error.response.data); // handle errors here
      });
  }, []);

  setTimeout(() => {
    console.log(cookie);
  }, 1000);

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <h2>{cookie}</h2>
    </div>
  );
}

export default Home;
