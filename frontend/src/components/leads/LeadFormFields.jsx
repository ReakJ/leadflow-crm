const LeadFormFields = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="label">
          <span className="label-text">
            Name
          </span>
        </label>

        <input
          id="name" 
          type="text"
          placeholder="Enter full name"
          autoComplete="name"
          className="input input-bordered w-full"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-error text-sm mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label">
          <span className="label-text">
            Email
          </span>
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter email address"
          autoComplete="email"
          className="input input-bordered w-full"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-error text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="label">
          <span className="label-text">
            Phone
          </span>
        </label>

        <input
          id="phone"
          type="text"
          placeholder="Enter phone number"
          autoComplete="tel"
          className="input input-bordered w-full"
          {...register("phone")}
        />

        {errors.phone && (
          <p className="text-error text-sm mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="label">
          <span className="label-text">
            Company
          </span>
        </label>

        <input
          id="company"
          type="text"
          placeholder="Enter company name"
          autoComplete="organization"
          className="input input-bordered w-full"
          {...register("company")}
        />

        {errors.company && (
          <p className="text-error text-sm mt-1">
            {errors.company.message}
          </p>
        )}
      </div>

      {/* Source */}
      <div className="md:col-span-2">
        <label htmlFor="source" className="label">
          <span className="label-text">
            Source
          </span>
        </label>

        <select
          id="source"
          className="select select-bordered w-full"
          {...register("source")}
        >
          <option value="" disabled>
            Select lead source
          </option>

          <option value="Website">
            Website
          </option>

          <option value="Referral">
            Referral
          </option>

          <option value="LinkedIn">
            LinkedIn
          </option>

          <option value="Facebook">
            Facebook
          </option>

          <option value="Instagram">
            Instagram
          </option>

          <option value="Cold Call">
            Cold Call
          </option>

          <option value="Email Campaign">
            Email Campaign
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {errors.source && (
          <p className="text-error text-sm mt-1">
            {errors.source.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default LeadFormFields