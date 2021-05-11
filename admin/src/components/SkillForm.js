import { axiosWithAuth } from "../api/axios.js";
import { emptySkill } from "../accessories/emptySkill.js";
export default function SkillForm(props) {
  const { skill, index, skillForm, setSkillForm } = props;
  const identical = !Object.entries(skillForm.local[index]).map(entry => {
    return entry[1] === skillForm.saved[index][entry[0]];
  }).some((b => b === false));
  const buttons = {
    apply: (skillForm.local[index].long_name.length === 0) ? true : identical,
    revert: identical
  }
    const changeHandler = (e) => {
        const newSkillForm = { ...skillForm };
        newSkillForm.local[index][e.target.name] = e.target.value;
        if (parseInt(e.target.value)) {
            newSkillForm.local[index][e.target.name] = parseInt(e.target.value);
        }
        if (e.target.name === "logo") {
            newSkillForm.local[index].localLogo = URL.createObjectURL(
            e.target.files[0]
            );
        }
      setSkillForm(newSkillForm);
    };

/*
URL.createObjectURL is causing csp problems - alternative approach:

<input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/>
<script>
  var loadFile = function(event) {
    var reader = new FileReader();
    reader.onload = function(){
      var output = document.getElementById('output');
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };
</script>
*/

    const revertHandler = (e) => {
        const newSkillForm = { ...skillForm };
        newSkillForm.local[index] = { ...skillForm.saved[index] };
        setSkillForm(newSkillForm);
    };
    const axiosResponseHandler = (r,method) => {
        if (r.status === 200 || r.status === 201) {
            const newSkillForm = {...skillForm};
            if (r.data?.addedSkillId) {
                newSkillForm.local[0] = emptySkill;
                newSkillForm.local.push({...skill, id:r.data.addedSkillId});
              newSkillForm.saved.push({ ...skill, id: r.data.addedSkillId });
            }
            else if (method === "delete") {
                newSkillForm.local.splice(index,1);
                newSkillForm.saved.splice(index,1);
            }
            else {
                newSkillForm.saved = [
                    ...newSkillForm.local.map((skill) => {
                        return { ...skill };
                    }),
                ];            
            }
            setSkillForm(newSkillForm);
        } else {
            console.log("error: unexpected response from server");
        }
    };
    const submitHandler = (e) => {
      const logoChanged =
          skillForm.local[index].logo === skillForm.saved[index].logo;
      const contentTypeHeader = logoChanged
          ? "multipart/form"
          : "application/x-www-form-urlencoded";
      const method = index === 0 ? "post" : "put";
      const url =
          index === 0
          ? `api/portfolio/skills/`
          : `api/portfolio/skills/${skill.id}`;
      const formData = new FormData();
      formData.append("long_name", e.target["long_name"].value);
      formData.append("short_name", e.target["short_name"].value);
      formData.append("proficiency", e.target["proficiency"].value);
      if (skillForm.local[index].logo !== skillForm.saved[index].logo) {
          formData.append("logo", e.target["logo"].files[0]);
      }
      axiosWithAuth({
          method,
          headers: {
          "Content-Type": contentTypeHeader,
          },
          url,
          data: formData,
      }).then((r) => {
          axiosResponseHandler(r,method);
      });
    };
    const deleteHandler = (e) => {
        axiosWithAuth.delete(`/api/portfolio/skills/${skill.id}`, { data: 'asdf' }).then(r => {
            if (r.status === 200) {
                axiosResponseHandler(r,"delete");
            }
            else {
                console.log("server error")
            }
        }).catch(e => console.log(e));
    };
  return (
    <form
      key={`skill-${skill.id}`}
      className="skillForm"
      onSubmit={(e) => {
        e.preventDefault();
        e.persist();
        submitHandler(e);
      }}
    >
      <label htmlFor={`skill-${skill.id}-long_name`}>
        <p>long name*:</p>
        <input
          type="text"
          value={skillForm.local[index].long_name}
          id={`skill-${skill.id}-long_name`}
          name="long_name"
          className={
            skillForm.local[index].long_name ===
            skillForm.saved[index].long_name
              ? "unchanged"
              : "changed"
          }
          onChange={(e) => {
              e.persist();
              e.preventDefault();
            changeHandler(e);
          }}
        />
      </label>
      <label htmlFor={`skill-${skill.id}-short_name`}>
        <p>short name:</p>
        <input
          type="text"
          value={skillForm.local[index].short_name}
          id={`skill-${skill.id}-short_name`}
          name="short_name"
          className={
            skillForm.local[index].short_name ===
            skillForm.saved[index].short_name
              ? "unchanged"
              : "changed"
          }
          onChange={(e) => {
            e.persist();
            e.preventDefault();
            changeHandler(e);
          }}
        />
      </label>

      <label htmlFor={`skill-${skill.id}-logo`} style={{flex:0}}>
        <p>logo:</p>
        <img
          src={skillForm.local[index].localLogo}
          alt={`${skillForm.local[index].long_name}-logo`}
          className="logo"
        />
        <input
          id={`skill-${skill.id}-logo`}
          name="logo"
          type="file"
          onChange={(e) => {
            e.persist();
            changeHandler(e);
          }}
        />
      </label>

      <label htmlFor={`skill-${skill.id}-proficiency`}>
        <p>proficiency:</p>
        <select
          value={skillForm.local[index].proficiency}
          id={`skill-${skill.id}-proficiency`}
          name="proficiency"
          className={
            skillForm.local[index].proficiency ===
            skillForm.saved[index].proficiency
              ? "unchanged"
              : "changed"
          }
          onChange={(e) => {
            e.persist();
            changeHandler(e);
          }}
        >
          <option value={1}>beginner</option>
          <option value={2}>intermediate</option>
          <option value={3}>advanced</option>
          <option value={4}>expert</option>
        </select>
      </label>
      <span className="form-buttons">
        <button
          type="submit"
          className="apply"
          disabled={buttons.apply}
        >
          {skill.id === "new" ? `add` : `apply`}
        </button>
        <button
          disabled={buttons.revert}
          className="revert"
          onClick={(e) => {
              e.preventDefault();
            e.persist();
            revertHandler(e);
          }}
        >
                  revert
        </button>
        {index !== 0 &&
            <button
                className="delete"
                onClick={(e) => {
                    e.preventDefault();
                    e.persist();
                    deleteHandler(e);
                }}
            >
            delete
            </button>  
        }
      </span>
    </form>
  );
}
