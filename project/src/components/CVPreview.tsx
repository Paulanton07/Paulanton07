import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCVStore } from '../store/cvStore';
import { Printer } from 'lucide-react';

export function CVPreview() {
  const { cv } = useCVStore();
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print CV
        </button>
      </div>

      <div ref={componentRef} className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900">{cv.personalInfo.fullName}</h1>
            <div className="mt-2 text-gray-600">
              <p>{cv.personalInfo.email} | {cv.personalInfo.phone}</p>
              <p>{cv.personalInfo.location}</p>
            </div>
            <p className="mt-4 text-gray-700">{cv.personalInfo.summary}</p>
          </div>

          {/* Experience */}
          {cv.experience.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Professional Experience</h2>
              {cv.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {cv.education.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
              {cv.education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="text-lg font-medium text-gray-900">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {cv.skills.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="grid grid-cols-2 gap-4">
                {cv.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}