import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createLead } from "../../services/leadService";
import { createLeadSchema } from "../../schemas/leadSchemas"
import LeadFormFields from "../../components/leads/LeadFormFields"

const AddLeadPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm ({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      source: ""
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createLead(data);

      toast.success("Lead created successfully.");

      navigate(`/leads/${response.data.lead._id}`);
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Failed to create lead. Please try again.";

      toast.error(message);
    }
  };

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
            Add Lead
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Create a new lead and add it to the CRM.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            <div>
              <h2 className="card-title">
                Lead Information
              </h2>

              <p className="text-sm text-base-content/60 mt-1">
                Enter the contact and company details for this lead.
              </p>
            </div>

            <LeadFormFields 
              register={register}
              errors={errors}
            />

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">

              <Link
                to="/leads"
                className="btn- btn-ghost"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"/>
                    Creating...
                  </>
                ) : (
                  "Create Lead"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default AddLeadPage