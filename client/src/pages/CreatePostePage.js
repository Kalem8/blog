import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { Navigate } from "react-router-dom";

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
}
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function CreatePostePage() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState('');

    function handleChangeTitle(event) {
        setTitle(event.target.value)
    }
    function handleChangeSummary(event) {
        setSummary(event.target.value)
    }
    function HandleContent(event) {
        setContent(event)
    }
    async function createNewPost(event) {
        event.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
        })
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={createNewPost} enctype="multipart/form-data" >
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
            <ReactQuill
                value={content}
                onChange={HandleContent}
                modules={modules}
                formats={formats} />
            <button style={{ marginTop: '5px' }}>Créer un article</button>
        </form>
    )
}