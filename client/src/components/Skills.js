function Skills() {
  const skills = [
    { name: "Javascript", proficiency: 4 },
    { name: "ReactJS", proficiency: 4 },
  ];
  return (
    <>
      <h2>Skills</h2>
      {skills.map((skill, id) => (
        <p key={`${skill.name}-${id}`}>{skill.name}</p>
      ))}
    </>
  );
}
export default Skills;
