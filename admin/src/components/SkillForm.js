import { axiosWithAuth, axiosWithAuthMulti } from "../api/axios.js";
export default function SkillForm(props) {
    const { skill, index, skillForm, setSkillForm } = props;
    const setButtonsStatus = (data) => {
        const local = data.local[index];
        const saved = data.saved[index];
        const identical = !Object.entries(local).map((entry) => {
            return (entry[1] === saved[entry[0]])
        }).some((b) => b === false);
        data.buttons[index].apply = identical;
        if (data.local[index].long_name.length === 0) {
            data.buttons[index].apply = true;
        }
        data.buttons[index].revert = identical;
        return data;
    }
    const changeHandler = (e) => {
        const newSkillForm = { ...skillForm };
        newSkillForm.local[index][e.target.name] = e.target.value;
        if (parseInt(e.target.value)) {
            newSkillForm.local[index][e.target.name] = parseInt(e.target.value)
        }
        if (e.target.name === "logo") {
            newSkillForm.local[index].localLogo = URL.createObjectURL(e.target.files[0]);
        }
        setSkillForm({ ...setButtonsStatus(newSkillForm) });
    }
    const revertHandler = (e) => {
        const newSkillForm = { ...skillForm }
        newSkillForm.local[index] = { ...skillForm.saved[index] }
        setSkillForm({ ...setButtonsStatus(newSkillForm) });
    }
    const submitHandler = (e) => {
        const submission = { ...skillForm.local[index] }
        if (skillForm.local[index].logo !== skillForm.saved[index].logo) {
            const formData = new FormData();
            formData.append("long_name", e.target["long_name"].value);
            formData.append("short_name", e.target["short_name"].value);
            formData.append("proficiency", e.target["proficiency"].value);
            formData.append("logo", e.target["logo"].files[0]);
            axiosWithAuthMulti.put(`/api/portfolio/skills/${skill.id}`, formData).then(r => console.log(r));
        }
        else {
            delete submission.localLogo;
            delete submission.logo;
            axiosWithAuth.put(`/api/portfolio/skills/${skill.id}`, submission).then(r => {
                console.log(r);
            })
        }
    }
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
                    skillForm.local[index].long_name === skillForm.saved[index].long_name
                    ? "unchanged"
                    : "changed"
                }
                    onChange={(e) => {
                        e.persist();
                        changeHandler(e)
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
                    skillForm.local[index].short_name === skillForm.saved[index].short_name
                    ? "unchanged"
                    : "changed"
                }
                onChange={(e) => {
                    e.persist();
                    changeHandler(e)
                }}
            />
        </label>

        <label htmlFor={`skill-${skill.id}-logo`}>
            <p>logo:</p>
                <img src={skillForm.local[index].localLogo} alt={`${skillForm.local[index].long_name}-logo`} className="logo"/>
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
                    skillForm.local[index].proficiency === skillForm.saved[index].proficiency
                    ? "unchanged"
                    : "changed"
                }
                onChange={(e) => {
                    e.persist();
                    changeHandler(e)
                }}
            >
                    <option value={1}>beginner</option>
                    <option value={2}>intermediate</option>
                    <option value={3}>advanced</option>
                    <option value={4}>expert</option>
            </select>
        </label>
        <span className="button-column">
            <button
                type="submit"
                disabled={skillForm.buttons[index].apply}
            >
                apply
            </button>
            <button
                disabled={skillForm.buttons[index].revert}
                    onClick={(e) => {
                        e.preventDefault();
                    e.persist();
                    revertHandler(e)
            }}>
                revert
            </button>
        </span>

    </form>
    )
}