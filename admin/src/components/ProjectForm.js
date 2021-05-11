import { axiosWithAuth } from "../api/axios.js";
import { emptyProject } from "../accessories/emptyProject.js";
export default function ProjectForm(props) {
    const { project, projectForm, setProjectForm, index, skills } = props;
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
            newProjectForm.local[index].localImage = URL.createObjectURL(
                e.target.files[0]
            );
        }
        setProjectForm(newProjectForm);
    }
    const updateSkills = (e) => {
        const v = parseInt(e.target.value);
        const newProjectForm = { ...projectForm };
        const localSkills = [...newProjectForm.local[index].skills];
        if (localSkills.indexOf(v) === -1) {
            localSkills.push(v);
        }
        else {
            localSkills.splice(localSkills.indexOf(v),1);
        }
        newProjectForm.local[index].skills = localSkills;
        setProjectForm(newProjectForm);
    }
    const promoteProject = (e) => {
        const data = new FormData();
        const oldRank = project.rank;
        const newRank = oldRank - 1;
        data.append("rank", newRank);
        axiosWithAuth({
            method: "put",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: `/api/portfolio/projects/${project.id}`,
            data,
        }).then((r)=>{
            const newProjectForm = {...projectForm}
            newProjectForm.local[index].rank=newRank;
            newProjectForm.local.forEach((prj,idx)=>{
                if (prj.id && prj.id !== project.id && prj.id !== "new") {
                    if (prj.rank >= newRank && prj.rank < oldRank) {
                        newProjectForm.local[idx].rank += 1;
                    }
                }
            })
            setProjectForm(newProjectForm);
            axiosResponseHandler(r,"put");
        });
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
        const imageChanged = projectForm.local[index].image === projectForm.saved[index].image;
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
        formData.append("skills", JSON.stringify(projectForm.local[index].skills));
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
            {project.id !== "new" && 
            <label htmlFor={`project-${project.id}-rank`}>
                <p>rank ({project.rank}):</p>
                <button 
                    id={`project=${project.id}-rank`}
                    disabled={project.rank===1}
                    onClick={(e)=>{
                        e.persist();
                        promoteProject(e);
                    }}
                >
                    promote
                </button>
            </label>
            }   
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
            {skills.length > 0 && 
            <fieldset 
                id="form-footer"
            >
                <p>Skills:</p>
                {skills.map(skill=>{
                    const sId=`p${project.id}-s${skill.id}`;
                    return(
                        <label htmlFor={sId} key={sId} className="checkbox-label">
                            <input 
                                type="checkbox"
                                name="skills"
                                id={sId}
                                value={skill.id}
                                checked={projectForm.local[index].skills.includes(skill.id)}
                                onChange={(e)=>{
                                    e.persist();
                                    updateSkills(e);
                                }}
                            />
                            <p>{skill.short_name}</p>
                        </label>
                    )
                })}               
            </fieldset>
            }
        </form>
    )
}