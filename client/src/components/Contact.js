import "../style/Contact.scss";
function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }
  return (
    <>
      <h2>Contact me!</h2>
      <div className="card">
        <p>If you need full-stack web development services, I'd be happy to help out! Please complete the form below with a valid email address and a short description of the nature of the work you require. Thank you.</p>
        <form>
          <label htmlFor="email"><p>your email address:</p>
            <input type="email" id="email" name="email" autoComplete="email"/>
          </label>
          <label htmlFor="text"><p>how can I help?</p>
            <textarea name="text" id="text" />
          </label>
          <div className="flexR">
            <button type="submit" onClick={handleSubmit}>send</button>
            <p className="error">test</p>
          </div>
        </form>
      </div>
    </>
  )
}
export default Contact;