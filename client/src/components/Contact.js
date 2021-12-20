import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "../lib/api.js";
import "../style/Contact.scss";

function Contact() {
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const defaultSubmissionError = "sorry, an erorr occurred while attempting to send your message, looks like you won't be hiring me 😭";
  const { handleSubmit, register, formState: { errors } } = useForm()
  const sendMessage = (data) => {
    setSubmissionError(null);
    axios.post(`${api}/contact`, data)
      .then(r => {
        if (r.status === 200) {
          setSuccess(true);
          setSubmissionError(null);
        }
        else { setSubmissionError(defaultSubmissionError) }
      })
      .catch(e => { setSubmissionError(defaultSubmissionError); console.log(e)});
  }
  const onSubmit = (e) => {
    sendMessage(e);
  }
  return (
    <>
      <h2>Contact me!</h2>
      <div className="card">
        {success === false ? 
        <>
        <p>If you need full-stack web development services, I'd be happy to help out! Please complete the form below with a valid email address and a short description of the nature of the work you require. Thank you.</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email"><p>your email address:</p>
            <input
              // type="email"
              id="email"
              name="email"
              autoComplete="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "↑ please enter a valid email address"
                }
              })}
            />
            {errors.email &&
              <p className="error">
                {errors.email.message}
              </p>
            }
          </label>
          <label htmlFor="text"><p>how can I help?</p>
            <textarea
              name="text"
              id="text"
              {...register("text", {
                required: "required",
                minLength: {
                  value: 10,
                  message: "↑ please provide more details about what you need done"
                }
              }
              )}
            />
            {errors.text && 
              <p className="error">{errors.text.message}</p>
            }
          </label>
          <div className="flexR">
            <button type="submit">send</button>
            {submissionError && <p className="error">{submissionError}</p>}
          </div>
        </form>
        </>
        : 
        <>
            <p>Thank you for reaching out, you should hear from me within two business days!</p>
            <p>You can click the button below to review your message or send another message</p>
            <button onClick={()=>setSuccess(false)}>review / resend</button>
        </>
      }
      </div>
    </>
  )
}
export default Contact;