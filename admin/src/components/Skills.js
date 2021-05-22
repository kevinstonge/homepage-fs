import { axiosWithAuth } from "../api/axios.js";
import { useEffect, useState } from "react";
import SkillForm from "./SkillForm.js";
import { emptySkill } from "../accessories/emptySkill.js";
export default function Skills() {
  const [skillForm, setSkillForm] = useState({
    saved: [],
    local: [],
  });
  useEffect(() => {
    axiosWithAuth
      .get(`/api/portfolio/skills`)
      .then((r) => {
        const logoPath = `${process.env.REACT_APP_API}/images`;
        const newSkill = emptySkill;
        setSkillForm({
          saved: [
            { ...newSkill },
            ...r.data.skills.map((skill) => {
              return {
                ...skill,
                localLogo:
                  skill.logo === null
                    ? `${logoPath}/defaultLogo.png`
                    : `${logoPath}/${skill.logo}`,
              };
            }),
          ],
          local: [
            { ...newSkill },
            ...r.data.skills.map((skill) => {
              return {
                ...skill,
                localLogo:
                  skill.logo === null
                    ? `${logoPath}/defaultLogo.png`
                    : `${logoPath}/${skill.logo}`,
              };
            }),
          ],
        });
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h2>skills</h2>
      {skillForm.local.length > 0 &&
        skillForm.local.map((skill, index) => {
          return SkillForm({ skill, index, skillForm, setSkillForm });
        })}
      <p style={{ fontSize: "smaller" }}>*required</p>
    </>
  );
}
