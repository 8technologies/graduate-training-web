import React, { useState } from 'react';
// If you are using something like react-modal, import it here, e.g.:
// import Modal from 'react-modal';

const AddSupervisorModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    telephone: '',
    course_id: '',
    university_id: '',
    role_id: ''
  });

  // Handle changes for each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Optionally reset or close the modal
    // setFormData({ ... });
    // onClose();
  };

  // If isOpen is false, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Add a New Supervisor</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Telephone */}
          <div>
            <label className="block text-sm font-medium mb-1">Telephone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Course ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Course ID</label>
            <input
              type="number"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* University ID */}
          <div>
            <label className="block text-sm font-medium mb-1">University ID</label>
            <input
              type="number"
              name="university_id"
              value={formData.university_id}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Role ID */}
          <div>
            <label className="block text-sm font-medium mb-1">Role ID</label>
            <input
              type="number"
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Supervisor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupervisorModal;
