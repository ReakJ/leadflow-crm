import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

import { useAuth } from "../../context/useAuth";
import LeadProgress from "../../components/leads/LeadProgress";
import LeadInformation from "../../components/leads/LeadInformation";

import { updateLeadSchema } from "../../schemas/leadSchemas";

import { getLeadById, changeLeadStatus, updateLead, assignLead, deleteLead } from "../../services/leadService";
import { getUsers } from "../../services/userService"
import ConfirmDialog from "../../components/common/ConfirmDialog";

const ManageLeadPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isMember = user?.role === "member";

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(null);

  const [editing, setEditing] = useState(false);
  
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [users, setUsers] = useState([]);
  const [assigning, seAssigning] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm({
    resolver: zodResolver(updateLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      source: "",
    },
  });


  const handleUpdate = async (data) => {
    try {
      await updateLead(lead._id, data);

      const response = await getLeadById(lead._id);

      setLead(response.data.lead);

      setEditing(false);

      toast.success("Lead updated successfully.");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Failed to update lead. Please try again.";

      toast.error(message);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdatingStatus(true);

      const response = await changeLeadStatus(id, newStatus);

      setLead((previous) => ({
        ...previous,
        status: response.data.lead.status,
      }));

    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus(false);
    }
  }

  const handleAssignee = async (assignedTo) => {
    if (!assignedTo) {
      toast.error("Please select an assignee.");
      return;
    }

    try {
      seAssigning(true);

      await assignLead(id, assignedTo);

      const response = await getLeadById(id);

      setLead(response.data.lead);

      toast.success("Lead assigned successfully.");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Failed to assign lead. Please try again.";

      toast.error(message);
    } finally {
      seAssigning(false);
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await deleteLead(id);

      toast.success("Lead deleted successfully.");

      navigate("/leads");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Failed to delete lead. Please try again.";  
      
      toast.error(message);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);

        const response = await getLeadById(id);

        setLead(response.data.lead);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    };
    
    fetchLead();
  }, [id])

  useEffect(() => {
    const fetchAssignableUsers = async () => {
      try {
        const response = await getUsers({
          active: "true",
          deleted: "false",
          limit: 100,
        });

        setUsers(response.users);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isMember) {
      fetchAssignableUsers();
    }
  }, [isMember]);

  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        source: lead.source || "",
      });
    }
  }, [lead, reset]);

  if (loading) {
    return (
      <div className="flex min-h-212.5 items-center justify-center">
        <span className="loading loading-spinner loading-xl text-primary"/>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="py-12 text-center">
        <p className="font-medium">
          Lead not found
        </p>

        <Link
          to="/leads"
          className="btn btn-primary btn-sm mt-4"
        >
          Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/leads"
          className="btn btn-ghost btn-sm"
        >
          ←
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Manage Lead
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Manage this lead's information and sales progress.
          </p>
        </div>
      </div>

      {/* Lead Overview */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-6">

          <div className="flex items-center gap-5">

            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content w-16 h-16 rounded-full text-xl flex items-center justify-center">
                <span>
                  {lead.name?.charAt(0)?.toUpperCase() || "L"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {lead.name}
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                {lead.email}
              </p>

              {lead.company && (
                <p className="text-sm text-base-content/60 mt-1">
                  {lead.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Progress */}
      <LeadProgress 
        status={lead.status}
        onStatusChange={handleStatusChange}
        updating={updatingStatus}
      />

      {/* Lead Information */}
      <LeadInformation 
        lead={lead}
        users={users}
        isMember={isMember}
        editing={editing}
        setEditing={setEditing}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        reset={reset}
        isSubmitting={isSubmitting}
        onUpdate={handleUpdate}
        onAssign={handleAssignee}
        assigning={assigning}
      />
      

      {/* Danger Zone */}
      {!isMember && (
        <div className="card bg-base-100 border border-error/30">
          <div className="card-body">

            <h2 className="card-title text-error">
              Danger Zone
            </h2>

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="font-medium">
                  Delete this lead
                </p>

                <p className="text-sm text-base-content/60">
                  This will remove the lead from the current lead list.
                </p>
              </div>

              <button
                type="button"
                className="btn btn-error btn-outline"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Lead
              </button>

            </div>

          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <ConfirmDialog 
          title="Delete Lead?"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                {lead.name}
              </span>
              ?
              <span className="block text-sm text-base-content/60 mt-2">
                This lead will be moved to the deleted leads list and can be restored later.
              </span>
            </>
          }
          confirmText="Delete Lead"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          loading={deleting}
        />
      )}
    </div>
  )
}

export default ManageLeadPage;