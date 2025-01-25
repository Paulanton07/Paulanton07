import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { EducationForm } from './components/EducationForm';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsForm } from './components/SkillsForm';
import { CVPreview } from './components/CVPreview';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { title: 'Personal Information', component: <PersonalInfoForm /> },
    { title: 'Education', component: <EducationForm /> },
    { title: 'Experience', component: <ExperienceForm /> },
    { title: 'Skills', component: <SkillsForm /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-gray-900">CV Builder</h1>
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Printer className="h-4 w-4 mr-2" />
            Preview & Print
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showPreview ? (
          <CVPreview />
        ) : (
          <div className="space-y-8">
            <nav className="flex justify-center">
              <ol className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex items-center">
                    <button
                      onClick={() => setCurrentStep(index)}
                      className={`${
                        currentStep === index
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-500'
                      } px-4 py-2 rounded-md text-sm font-medium`}
                    >
                      {step.title}
                    </button>
                    {index < steps.length - 1 && (
                      <div className="ml-4 h-0.5 w-4 bg-gray-200" />
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                {steps[currentStep].component}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;