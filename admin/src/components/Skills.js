import axios from "axios";
import { useEffect, useState } from "react";
export default function Skills() {
  const [skills, setSkills] = useState();
  useEffect(() => {
    axios
      .get("http://www.kevinstonge.com/api/portfolio/skills", {
        withCredentials: true,
        headers: {
          Cookie:
            "auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTkyNzUxMTV9.T690MMnkAahGkBdglx0GAxgBYqCUhoikfKBfUOpNk0c; Path=/;",
        },
      })
      .then((r) => {
        console.log(r);
        setSkills(r);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(skills);
  return <p>skills</p>;
}
