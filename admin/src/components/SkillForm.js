export default function SkillForm(props) {
    const { skill, index, skillForm, setSkillForm } = props;
    const buttonsDisabled = { apply: true, revert: true };
    const setButtons = () => {
        const local = skillForm.local[index];
        const saved = skillForm.saved[index];
        const identical = !Object.entries(local).map((entry) => {
            return (entry[1] === saved[entry[0]])
        }).some((b) => b === false);
        console.log(identical);
        buttonsDisabled.apply = identical;
    }
    const changeHandler = (e) => {
        const newSkillForm = { ...skillForm };
        newSkillForm.local[index][e.target.name] = e.target.value;
        if (parseInt(e.target.value)) {
            newSkillForm.local[index][e.target.name] = parseInt(e.target.value)
        }
        setSkillForm({ ...newSkillForm });
        setButtons();
    }
    return(
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
                <img src={`${process.env.REACT_APP_API}/images/test.png`} alt={`${skillForm.local[index].long_name}-logo`} className="logo"/>
                <input
                    id={`skill-${skill.id}-logo`}
                    name="logo"
                    type="file"
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
            <button type="submit" disabled={buttonsDisabled.apply}>apply</button>
            <button disabled={buttonsDisabled.revert}>revert</button>
        </span>

    </form>
    )
}