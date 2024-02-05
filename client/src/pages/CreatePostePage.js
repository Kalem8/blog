import { useState } from "react";
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router-dom";
import Editor from "../component/Editor";

export default function CreatePostePage() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    function handleChangeTitle(event) {
        setTitle(event.target.value)
    }
    function handleChangeSummary(event) {
        setSummary(event.target.value)

    }

    async function createNewPost(event) {

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        event.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        })
        if (response.ok) {
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={createNewPost} encType="multipart/form-data" >
            <input type="text"
                placeholder={"Title"}
                value={title}
                onChange={handleChangeTitle} />
            <input type="Summary"
                placeholder={"Summary"}
                value={summary}
                onChange={handleChangeSummary} />
            <input type="file"
                onChange={event => setFiles(event.target.files)} />
            <Editor value={content} onChange={setContent} />
            <button className="btn-one" style={{ marginTop: '5px' }}>Créer un article</button>
        </form>
    )

}