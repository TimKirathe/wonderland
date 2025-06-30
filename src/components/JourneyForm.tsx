"use client";

import { useState } from "react";

interface FormData {
  // Parent Information
  parentName: string;
  email: string;
  phone: string;
  relationship: string;
  
  // Child Information
  childName: string;
  dateOfBirth: string;
  program: string;
  specialNeeds: string;
  previousSchool: string;
  
  // Additional Information
  preferredStartDate: string;
  howHeard: string;
  message: string;
}

interface JourneyFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

export default function JourneyForm({ onSubmit, onClose }: JourneyFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState<FormData>({
    parentName: "",
    email: "",
    phone: "",
    relationship: "",
    childName: "",
    dateOfBirth: "",
    program: "",
    specialNeeds: "",
    previousSchool: "",
    preferredStartDate: "",
    howHeard: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (step === 1) {
      // Validate parent information
      if (!formData.parentName.trim()) {
        newErrors.parentName = "Parent/Guardian name is required";
      }
      
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^[+]?[\d\s()-]+$/.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 10) {
        newErrors.phone = "Please enter a valid phone number (at least 10 digits)";
      }
      
      if (!formData.relationship) {
        newErrors.relationship = "Please select your relationship to the child";
      }
    }
    
    if (step === 2) {
      // Validate child information
      if (!formData.childName.trim()) {
        newErrors.childName = "Child's name is required";
      }
      
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = "Date of birth is required";
      } else {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
        
        if (birthDate > today) {
          newErrors.dateOfBirth = "Date of birth cannot be in the future";
        } else if (actualAge < 2) {
          newErrors.dateOfBirth = "Child must be at least 2 years old";
        } else if (actualAge > 6) {
          newErrors.dateOfBirth = "Our programs are for children aged 2-6 years";
        }
      }
      
      if (!formData.program) {
        newErrors.program = "Please select a program";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let isValid = true;
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        isValid = false;
        if (step < currentStep) {
          setCurrentStep(step);
          break;
        }
      }
    }
    
    if (isValid) {
      onSubmit(formData);
    }
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} years old`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentStep >= step
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-20 h-1 mx-2 transition-colors ${
                  currentStep > step ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Parent Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Parent/Guardian Information</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.parentName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary`}
            />
            {errors.parentName && (
              <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+254 722 546 993"
              className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Relationship to Child *</label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 pr-12 rounded-lg border ${errors.relationship ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2714%27%20height%3D%278%27%20viewBox%3D%270%200%2014%208%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201l6%206%206-6%27%20stroke%3D%27%236B7280%27%20stroke-width%3D%272%27%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%2F%3E%3C%2Fsvg%3E')] bg-[length:14px_8px] bg-[position:right_16px_center] bg-no-repeat`}
            >
              <option value="">Select Relationship</option>
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="guardian">Guardian</option>
              <option value="other">Other</option>
            </select>
            {errors.relationship && (
              <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: Child Information */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Child Information</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Child&apos;s Name *</label>
            <input
              type="text"
              name="childName"
              value={formData.childName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 rounded-lg border ${errors.childName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary`}
            />
            {errors.childName && (
              <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              max={new Date().toISOString().split('T')[0]}
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 6)).toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary`}
            />
            {formData.dateOfBirth && !errors.dateOfBirth && (
              <p className="text-sm text-primary mt-1">{calculateAge(formData.dateOfBirth)}</p>
            )}
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Program Interest *</label>
            <select
              name="program"
              value={formData.program}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 pr-12 rounded-lg border ${errors.program ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-primary appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2714%27%20height%3D%278%27%20viewBox%3D%270%200%2014%208%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201l6%206%206-6%27%20stroke%3D%27%236B7280%27%20stroke-width%3D%272%27%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%2F%3E%3C%2Fsvg%3E')] bg-[length:14px_8px] bg-[position:right_16px_center] bg-no-repeat`}
            >
              <option value="">Select Program</option>
              <option value="nursery">Nursery (Ages 2-3)</option>
              <option value="pre-k">Pre-K (Ages 3-4)</option>
              <option value="kindergarten">Kindergarten (Ages 4-6)</option>
            </select>
            {errors.program && (
              <p className="text-red-500 text-sm mt-1">{errors.program}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Special Needs or Allergies</label>
            <textarea
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              placeholder="Please share any special needs, allergies, or medical conditions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Previous School Experience</label>
            <input
              type="text"
              name="previousSchool"
              value={formData.previousSchool}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              placeholder="Name of previous school (if any)"
            />
          </div>
        </div>
      )}

      {/* Step 3: Additional Information */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
          
          <div>
            <label className="block text-sm font-medium mb-1">Preferred Start Date</label>
            <input
              type="date"
              name="preferredStartDate"
              value={formData.preferredStartDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
            <select
              name="howHeard"
              value={formData.howHeard}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-primary appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2714%27%20height%3D%278%27%20viewBox%3D%270%200%2014%208%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cpath%20d%3D%27M1%201l6%206%206-6%27%20stroke%3D%27%236B7280%27%20stroke-width%3D%272%27%20fill%3D%27none%27%20fill-rule%3D%27evenodd%27%2F%3E%3C%2Fsvg%3E')] bg-[length:14px_8px] bg-[position:right_16px_center] bg-no-repeat"
            >
              <option value="">Select Option</option>
              <option value="google">Google Search</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="friend">Friend/Family</option>
              <option value="drive-by">Drove By</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message or Questions</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              placeholder="Any questions or additional information you&apos;d like to share?"
            />
          </div>

          {/* Summary Review */}
          <div className="bg-primary/5 rounded-lg p-4 mt-6">
            <h4 className="font-semibold mb-2">Review Your Information:</h4>
            <p className="text-sm"><strong>Parent:</strong> {formData.parentName}</p>
            <p className="text-sm"><strong>Email:</strong> {formData.email}</p>
            <p className="text-sm"><strong>Child:</strong> {formData.childName}</p>
            <p className="text-sm"><strong>Program:</strong> {formData.program}</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            Submit Application
          </button>
        )}
      </div>
    </form>
  );
}