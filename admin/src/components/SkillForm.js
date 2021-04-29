export default function SkillForm(props) {
    const { skill, index, skillForm, setSkillForm } = props;
    return(
        <form key={`skill-${skill.id}`} className="skillForm">
        <label htmlFor={`skill-${skill.id}-long_name`}>
            <p>long name*:</p>
            <input
                type="text"
                value={skillForm.local[index].long_name}
                id={`skill-${skill.id}-long_name`}
                className={
                    skillForm.local[index].long_name === skillForm.saved[index].long_name
                    ? "unchanged"
                    : "changed"
                }
                onChange={(e) => {
                    const newSkillForm = { ...skillForm };
                    newSkillForm.local[index].long_name = e.target.value;
                    setSkillForm({ ...newSkillForm });
                }}
            />
        </label>
        <label htmlFor={`skill-${skill.id}-short_name`}>
            <p>short name:</p>
            <input
                type="text"
                value={skillForm.local[index].short_name}
                id={`skill-${skill.id}-short_name`}
                className={
                    skillForm.local[index].short_name === skillForm.saved[index].short_name
                    ? "unchanged"
                    : "changed"
                }
                onChange={(e) => {
                    const newSkillForm = { ...skillForm };
                    newSkillForm.local[index].short_name = e.target.value;
                    setSkillForm({ ...newSkillForm });
                }}
            />
        </label>

        <label htmlFor={`skill-${skill.id}-logo`}>
            <p>logo:</p>
                <img src={`${process.env.REACT_APP_API}/images/test.png`} alt={`${skillForm.local[index].long_name}-logo`} className="logo"/>
                <input
                    id={`skill-${skill.id}-logo`}
                    type="file"
                />
        </label>
            

        <label htmlFor={`skill-${skill.id}-proficiency`}>
            <p>proficiency:</p>
            <select
                value={skillForm.local[index].proficiency}
                id={`skill-${skill.id}-proficiency`}
                className={
                    skillForm.local[index].proficiency === skillForm.saved[index].proficiency
                    ? "unchanged"
                    : "changed"
                }
                onChange={(e) => {
                    const newSkillForm = { ...skillForm };
                    newSkillForm.local[index].proficiency = parseInt(e.target.value);
                    setSkillForm({ ...newSkillForm });
                }}
            >
                    <option value={1}>beginner</option>
                    <option value={2}>intermediate</option>
                    <option value={3}>advanced</option>
                    <option value={4}>expert</option>
            </select>
        </label>


    </form>
    )
}