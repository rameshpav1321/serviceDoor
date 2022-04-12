import { useEffect, useState } from "react";

const APIKEY = "IZKyQA1tTfg9Kd9ckNNU-A";

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifurl ] = useState("");

    const fetchGifs = async () => {
        try {
            fetch(`https://randomuser.me/api/`)
            .then(response => response.json())
            .then(data=> console.log("Here", data));
            setGifurl(data[0]?.images?.downsized_medium.url);
        }catch(error){
            console.log("Error setting gif: ", error)
            setGifurl(`https://api.giphy.com/v1/gifs/random?api_key=${APIKEY}`);
        }
    };

    useEffect(()=>{
        fetchGifs();
    }, []);

    return gifUrl;
};

export default useFetch;