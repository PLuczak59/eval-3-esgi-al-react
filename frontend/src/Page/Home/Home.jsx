import "./Home.css";
import MessageCard from "../../Component/MessageCard/MessageCard";
import { useState, useEffect } from "react";

function PostsList() {
    return (
        <div>
            {posts.map(post => (
                <MessageCard key={post.id} post={post} />
            ))}
        </div>
    );
}

export default PostsList;