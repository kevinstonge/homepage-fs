function Skills() {
  const skills = [
    { name: "HTML5", proficiency: 5 },
    { name: "CSS3", proficiency: 4 },
    { name: "Javascript", proficiency: 4 },
    { name: "ReactJS", proficiency: 4 },
  ];
  const projects = [
    {
      name: "color palette generator",
      url: "http://colors.kevinstonge.com",
      skills: [],
    }, //could do this with a database ... not sure if worth the effort
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
