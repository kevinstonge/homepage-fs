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
            <div className="column">
            <label htmlFor={`project-${project.id}-title`}>
                <p>title*:</p>
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
            <label htmlFor={`project-${project.id}-image`}>
                <p>image:</p>
                <img
                src={projectForm.local[index].localImage}
                alt={`${projectForm.local[index].title}`}
                className="project-image"
                />
                <input
                id={`project-${project.id}-image`}
                name="image"
                type="file"
                onChange={(e) => {
                    e.persist();
                    changeHandler(e);
                }}
                />
            </label>
            </div>

            <div className="column">
            <label htmlFor={`project-${project.id}-description`}>
                <p>description:</p>
                <textarea
                    value={project.description}
                    name="description"
                    id={`project-${project.id}-description`}
                    onChange={(e) => {
                        e.persist();
                        changeHandler(e);
                    }}
                />
            </label>
            </div>

            <div className="column">
            <label htmlFor={`project-${project.id}-url`}>
                <p>url:</p>
                <input
                    type="text"
                    value={project.url}
                    name="url"
                    id={`project-${project.id}-url`}
                    onChange={(e) => {
                        e.persist();
                        changeHandler(e);
                    }}
                />
            </label>
            <label htmlFor={`project-${project.id}-github`}>
                <p>github:</p>
                <input
                    type="text"
                    value={project.github}
                    name="github"
                    id={`project-${project.id}-github`}
                    onChange={(e) => {
                        e.persist();
                        changeHandler(e);
                    }}
                />
            </label>

            </div>

        </form>
    )
}