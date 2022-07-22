import "../App.css";

function Note({ note }) {
    return (
        <div className="card">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p className="author">by {note.username}</p>
        </div>
    )
}

export default Note;