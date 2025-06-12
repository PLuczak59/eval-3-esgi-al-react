import "./UserList.css";
import { UserCard } from "../../Component/components";
import { useEffect, useState } from "react";


export default function UserList(){
    const [listUser, setListUser] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    
    useEffect(() => {
        fetch(`http://localhost:3000/user/${pageCount}`,{
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                setListUser(data.data)
            })
            .catch(error => console.log(error));

    }, [pageCount]);

    function loadUsers(pageCount){
        fetch(`http://localhost:3000/user/${pageCount}`,{
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setListUser(data.data)
            })
            .catch(error => console.log(error));
    }




    return (
        <div className="container">
            <div className="user-list">
                {
                    listUser.map((user, index) => (
                        <UserCard user={user} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}