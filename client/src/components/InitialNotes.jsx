import { gql, useQuery } from "@apollo/client";
import Note from "./Note";

const ALL_NOTES = gql`
    query {
        notes {
            id
            title
            content
            username
        }
    }
`;

function InitialNotes() {
    const { data, loading, error } = useQuery(ALL_NOTES);

    if (loading) return <div>Loading...</div>

    if (error) return <div>Error occured...</div>

    const notes = data.notes;

    return (
        <div>
            { notes.map((note) => (
                <Note key={note.id} note={note} />
            )) }
        </div>
    )
}

export default InitialNotes;