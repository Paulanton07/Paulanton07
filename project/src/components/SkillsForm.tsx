import React, { useState } from 'react';
import { useCVStore } from '../store/cvStore';
import type { Skill } from '../types/cv';

export function SkillsForm() {
  const { cv, addSkill, removeSkill } = useCVStore();
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill({ ...formData, id: crypto.randomUUID() });
    setFormData({
      name: '',
      level: 'Intermediate',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Skill Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Proficiency Level
          </label>
          <select
            name="level"
            id="level"
            value={formData.level}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Skill
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Skills List</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cv.skills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div>
                <h4 className="font-medium">{skill.name}</h4>
                <p className="text-sm text-gray-500">{skill.level}</p>
              </div>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}