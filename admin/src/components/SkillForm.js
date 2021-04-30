export default function SkillForm(props) {
    const { skill, index, skillForm, setSkillForm } = props;
    const changeHandler = async (e) => {
        const newSkillForm = { ...skillForm };
        newSkillForm.local[index][e.target.name] = e.target.value;
        if (parseInt(e.target.value)) {
            newSkillForm.local[index][e.target.name] = parseInt(e.target.value)
        }

        if (e.target.name === "logo") {
            console.log('logo change');
            newSkillForm.local[index].localLogo = await URL.createObjectURL(e.target.files[0]);
        }

        const local = newSkillForm.local[index];
        const saved = newSkillForm.saved[index];
        const identical = !Object.entries(local).map((entry) => {
            return (entry[1] === saved[entry[0]])
        }).some((b) => b === false);
        newSkillForm.buttons[index].apply = identical;
        if (newSkillForm.local[index].long_name.length === 0) {
            newSkillForm.buttons[index].apply = true;
        }
        newSkillForm.buttons[index].revert = identical;
        console.log(newSkillForm.local[index]);
        setSkillForm({ ...newSkillForm });
    }
    return (
        <form key={`skill-${skill.id}`} className="skillForm">
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
            <button type="submit" disabled={skillForm.buttons[index].apply}>apply</button>
            <button disabled={skillForm.buttons[index].revert}>revert</button>
        </span>

    </form>
    )
}