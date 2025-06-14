import "./Home.css";
import { MessageCard, Toolbar, Pagination } from "../../Component/components";
import { useState, useEffect } from "react";
import { useGetRequest } from "../../utils/Hooks/useGetRequest";

export default function Home() {
    const [page, setPage] = useState(parseInt(localStorage.getItem('currentPage')) || 1)
    const [totalPage, setTotalPage] = useState(1)
    const { data, isLoading, error, refetch } = useGetRequest(`/post/page/${page}`);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data) {
            setPosts(data.posts || []);
            setTotalPage(data.totalPages || 1)
        }
    }, [data]);

    function handlePageChange(newPage) {
        setPage(newPage)
        localStorage.setItem('currentPage', newPage)
        refetch()
    }

    const handlePostCreated = (newPost) => {
        newPost = {
            ...newPost,
            user: {
                id: newPost.authorId,
                nickname: JSON.parse(localStorage.getItem('user')).username || "Anonyme",
            }
        }

        setPosts(currentPosts => {
            const updatedPosts = [newPost, ...currentPosts];
            return updatedPosts;
        });

        if (page != 1) {
            setPage(1)
            localStorage.setItem('currentPage', 1)
        }
    };


    if (isLoading) {
        return <div>Chargement des posts...</div>;
    }

    if (error) {
        return <div>Erreur lors du chargement des posts: {error}</div>;
    }


    return (
        <div className="home">
            <Toolbar onAddPost={handlePostCreated} />

            <div>
                <h1>Posts</h1>
                <div className="post-cards">
                    {posts && posts.length > 0 ? (
                        posts.map(post => (
                            <MessageCard key={post.id} post={post} onRefresh={refetch} />
                        ))
                    ) : (
                        <p>Aucun post disponible</p>
                    )}
                </div>

                <Pagination
                    currentPage={page}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}