export const emptyProject = {
    id: "new",
    title: "",
    description: "",
    image: null,
    url: "",
    github: "",
    rank: 0,
    localImage: `${process.env.REACT_APP_API}/images/defaultLogo.png`,
    skills: [],
};
// title (required), url (required), description, image, github, rank (auto-assigned)