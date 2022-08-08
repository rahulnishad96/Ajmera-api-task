import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Profile = (props) => {
    const [profile, setprofile] = useState({});
    const { data, id } = useParams();

    useEffect(() => {
        const fetchFun = async () => {
            const responce = await fetch(`https://swapi.dev/api/${data}/${id}`);
            const responceData = await responce.json();
            setprofile(responceData);
            console.log(responceData);
        };

        fetchFun();
    }, []);

    return (
        <div>
            <h1>Profile pic</h1>
            <h3>Name: {profile.name}</h3>
            <h4>skin_colors : {profile.skin_colors || profile.skin_color}</h4>
        </div>
    )
}

export default Profile;
