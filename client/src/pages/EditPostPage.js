import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../component/Editor";


export default function EditPostPage() {
    const { id } = useParams();
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


    async function updatePost(event) {
        event.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        //On note un ? car il est possible qu'il n y'est pas d'image.
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    }, []);

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }


    return (
        <form onSubmit={updatePost} enctype="multipart/form-data" >
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
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: '5px' }}>Editer l'article</button>
        </form>
    )
}