import { axiosWithoutAuth } from "../api/axios.js";
import { useEffect, useState } from "react";
import SkillForm from "./SkillForm.js";
import {emptySkill} from "../accessories/emptySkill.js";
export default function Skills() {
  const [skillForm, setSkillForm] = useState({
    saved: [],
    local: [],
    buttons: [],
  });
  useEffect(() => {
    axiosWithoutAuth
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
          buttons: [
            { apply: true, revert: true },
            ...r.data.skills.map((skill) => {
              return { apply: true, revert: true };
            }),
          ],
        });
      })
      .catch((e) => console.log(e));
  }, []);
  useEffect(()=>{ //set button status when newSkillForm changes
      const newSkillForm = skillForm;
      skillForm.saved.forEach((saved,index)=>{
        const identical = !Object.entries(saved)
            .map((entry) => {
              return entry[1] === newSkillForm.local[index][entry[0]];
            })
            .some((b) => b === false);
        newSkillForm.buttons[index].apply = identical;
        if (newSkillForm.local[index].long_name.length === 0) {
            newSkillForm.buttons[index].apply = true;
        }
        newSkillForm.buttons[index].revert = identical;
      });
      setSkillForm(newSkillForm);
  },[skillForm]);
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
