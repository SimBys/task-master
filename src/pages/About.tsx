import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Box} from "@mui/material";

export default function About() {
    const [readmeContent, setReadmeContent] = useState("");

    useEffect(() => {
        const repoUrl = 'https://api.github.com/repos/SimBys/task-master/contents/README.md';

        // Make a GET request to the GitHub API
        fetch(repoUrl)
            .then(response => response.json())
            .then(data => setReadmeContent(atob(data.content)))
            .catch(error => console.error('Error fetching README:', error));
    }, []);

    return (
        <Box p={4}>
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
        </Box>
    );
}
