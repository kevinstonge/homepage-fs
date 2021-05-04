export default function ProjectForm(props) {
    // title (required), url (required), description, image, github, rank (auto-assigned)
    const { project, projectForm, setProjectForm, index } = props;
    const submitHandler = (e) => {
        const newProjectForm = { ...projectForm };
        setProjectForm(newProjectForm);
    }
    const changeHandler = (e) => {
        const newProjectForm = { ...projectForm };
        newProjectForm.local[index][e.target.name] = e.target.value;
        setProjectForm(newProjectForm);
    }
    return (
        <form
            key={`project-${project.id}`}
            className="projectForm"
            onSubmit={(e) => {
                e.preventDefault();
                e.persist();
                submitHandler(e);
             }}
        >
            <label htmlFor={`project-${project.id}-title`}>
                <p>title:</p>
                <input
                    type="text"
                    value={project.title}
                    name="title"
                    id={`project-${project.id}-title`}
                    onChange={(e) => {
                        e.persist();
                        changeHandler(e);
                    }}
                />
            </label>
        </form>
    )
}