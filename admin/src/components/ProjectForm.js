import { axiosWithAuth } from "../api/axios.js";
import { emptyProject } from "../accessories/emptyProject.js";
export default function ProjectForm(props) {
    const { project, projectForm, setProjectForm, index } = props;
    const identical = !Object.entries(projectForm.local[index])
        .map(entry => {
            return entry[1] === projectForm.saved[index][entry[0]];
        }).some((b => b === false));
    const buttons = {
        apply: (projectForm.local[index].title.length === 0 || projectForm.local[index].url.length === 0) ? true : identical,
        revert: identical
    }
    const changeHandler = (e) => {
        const newProjectForm = { ...projectForm };
        newProjectForm.local[index][e.target.name] = e.target.value;
        if (e.target.name==="image") {
            newProjectForm.local[index].localImage = URL.createObjectURL(e.target.files[0]);
        }
        setProjectForm(newProjectForm);
    }
    const revertHandler = (e) => {
        const newProjectForm = {...projectForm};
        newProjectForm.local[index] = { ...projectForm.saved[index] };
        setProjectForm(newProjectForm);
    }
    const axiosResponseHandler = (r, method) => {
        if (r.status === 200 || r.status === 201) {
            const newProjectForm = { ...projectForm};
            if (r.data?.addedProject) {
                const id = r.data.addedProject[0];
                newProjectForm.local[0] = emptyProject;
                newProjectForm.local.push({...project,id});
                newProjectForm.saved.push({...project,id});
            }
            else if (method === "delete") {
                newProjectForm.local.splice(index,1);
                newProjectForm.saved.splice(index,1);
            }
            else {
                newProjectForm.saved = [
                    ...newProjectForm.local.map((project)=>{
                        return {...project};
                    }),
                ];
            }
            setProjectForm(newProjectForm);
        }
        else {
            console.log("error: unexpected response from server");
        }
    }
    const submitHandler = (e) => {
        const imageChanged = projectForm.local[index].image === projectForm.saved[index].logo;
        const contentTypeHeader = imageChanged
            ? "multipart/form"
            : "application/x-www-form-urlencoded";
        const method = index === 0 ? "post" : "put";
        const url = 
            index === 0
                ? `api/portfolio/projects/`
                : `api/portfolio/projects/${project.id}`;
        const formData = new FormData();
        formData.append("title", e.target["title"].value);
        formData.append("description", e.target["description"].value);
        formData.append("url", e.target["url"].value);
        formData.append("github", e.target["github"].value);
        if (imageChanged) {
            formData.append("image", e.target["image"].files[0]);
        }
        axiosWithAuth({
            method,
            headers: {
                "Content-Type": contentTypeHeader,
            },
            url,
            data: formData,
        }).then((r)=>{
            axiosResponseHandler(r,method);
        });
;    }
    const deleteHandler = (e) => {
        axiosWithAuth.delete(`/api/portfolio/projects/${project.id}`,{data:"asdf"}).then(r=>{
            if (r.status === 200) {
                axiosResponseHandler(r,"delete");
            }
            else {
                console.log('server error');
            }
        }).catch(e=>console.log(e));
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
            <label htmlFor={`project-${project.id}-rank`}>
                <p>rank ({project.rank}):</p>
                <button>promote</button>
            </label>
            </div>
            <div className="form-buttons">
                <button
                    type="submit"
                    className="apply"
                    disabled={buttons.apply}
                >
                    {project.id === "new" ? `add` : `apply`}
                </button>
                <button
                    disabled={buttons.revert}
                    className="revert"
                    onClick={(e)=>{
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
                        onClick={(e)=>{
                            e.preventDefault();
                            e.persist();
                            deleteHandler(e);
                        }}
                >
                        delete
                </button>
                }
            </div>
        </form>
    )
}