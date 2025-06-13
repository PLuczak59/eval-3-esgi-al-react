import "./Home.css";
import MessageCard from "../../Component/MessageCard/MessageCard";
import { useGetRequest } from "../../utils/Hooks/useGetRequest";

export default function Home() {
    const { data: posts, isLoading, error, refetch } = useGetRequest('/post');

    if (isLoading) {
        return <div>Chargement des posts...</div>;
    }

    if (error) {
        return <div>Erreur lors du chargement des posts: {error}</div>;
    }

    return (
        <div className="home">
            <h1>Posts</h1>
            {posts && posts.length > 0 ? (
                posts.map(post => (
                    <MessageCard key={post.id} post={post} onRefresh={refetch} />
                ))
            ) : (
                <p>Aucun post disponible</p>
            )}
        </div>
    );
}