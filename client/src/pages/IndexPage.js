import { useEffect, useState } from "react";
import Post from "../component/Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    //Effectue cette tâche qu'une seul fois avec useEffect
    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, []);


    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    )
}