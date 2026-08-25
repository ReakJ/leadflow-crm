import { useState, useEffect } from "react";
import { Link,  useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getLeadById, addLeadNote } from "../../services/leadService";

const LeadNotesPage = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);

        const response = await getLeadById(id);

        setLead(response.data.lead);
      } catch (error) {
        console.error(error);

        const message =
          error.response?.data?.message ||
          "Failed to load lead notes.";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleAddNote = async (event) => {
    event.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      toast.error("Note text is required.")
      return;
    }

    try {
      setAddingNote(true);

      await addLeadNote(id, trimmedText);

      const response = await getLeadById(id);

      setLead(response.data.lead);
      setText("");

      toast.success("Note added successfully.");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Failed to add note. Please try again.";

      toast.error(message);
    } finally {
      setAddingNote(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-96">
        <span className="loading loading-spinner loading-xl text-primary"/>
      </div>
    );
  }

  if (!lead) {
    return null;
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to={`/leads/${lead._id}`}
          className="btn btn-ghost btn-sm"
        >
          ←
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Notes
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Notes for {lead.name}.
          </p>
        </div>
      </div>

      {/* Add Note */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          
          <h2 className="card-title">
            Add a Note
          </h2>

          <form
            onSubmit={handleAddNote}
            className="mt-2"
          >
            <textarea 
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Write a note about this lead..."
              maxLength={1000}
              rows={5}
              className="textarea textarea-bordered w-full"
              disabled={addingNote}
            />

            <div className="flex items-center justify-between gap-4 mt-3">

              <span className="text-xs text-base-content/50">
                {text.length} / 1000
              </span>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={addingNote || !text.trim()}
              >
                {addingNote ? (
                  <>
                    <span className="loading loading-spinner loading-sm"/>
                    Adding...
                  </>
                ) : (
                  "Add Note"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notes Rendering */}
      <div className="space-y-4">
        
        <div>
          <h2 className="text-lg font-semibold">
            Notes
          </h2>
          <p className="text-sm text-base-content/60 mt-1">
            {lead.notes?.length || 0}{" "}
            {lead.notes?.length === 1 ? "note" : "notes"}
          </p>
        </div>

        {lead.notes?.length === 0 ? (
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body py-12 text-center">

              <p className="font-medium">
                No notes yet
              </p>

              <p className="text-sm text-base-content/60 -mt-0.5">
                Add the first note for this lead above.
              </p>

            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {[...lead.notes]
            .reverse()
            .map((note) => (
              <div
                key={note._id}
                className="card bg-base-100 border border-base-300"
              >
                <div className="card-body">

                  {/* Author */}
                  <div className="flex items-center gap-3">

                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content w-10 h-10 rounded-full flex items-center justify-center">
                        <span>
                          {note.addedBy?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">
                        {note.addedBy?.name || "Unknown User"}
                      </p>

                      <p className="text-xs text-base-content/50">
                        {note.addedBy?.email || "—"}
                        {note.addedBy?.role && (
                          <> · {note.addedBy.role}</>
                        )}
                      </p>
                    </div>

                  </div>

                  {/* Note */}
                  <p className="whitespace-pre-wrap text-sm mt-3">
                    {note.text}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-base-content/50 mt-2">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadNotesPage