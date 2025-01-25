import { create } from 'zustand';
import { CV, PersonalInfo, Education, Experience, Skill } from '../types/cv';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';

interface CVStore {
  cv: CV;
  setPersonalInfo: (info: PersonalInfo) => void;
  addEducation: (education: Education) => void;
  addExperience: (experience: Experience) => void;
  addSkill: (skill: Skill) => void;
  removeEducation: (id: string) => void;
  removeExperience: (id: string) => void;
  removeSkill: (id: string) => void;
  saveCV: () => Promise<void>;
}

const initialCV: CV = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
};

export const useCVStore = create<CVStore>((set, get) => ({
  cv: initialCV,
  
  setPersonalInfo: (info) => 
    set((state) => ({ cv: { ...state.cv, personalInfo: info } })),
  
  addEducation: (education) =>
    set((state) => ({
      cv: { ...state.cv, education: [...state.cv.education, education] }
    })),
  
  addExperience: (experience) =>
    set((state) => ({
      cv: { ...state.cv, experience: [...state.cv.experience, experience] }
    })),
  
  addSkill: (skill) =>
    set((state) => ({
      cv: { ...state.cv, skills: [...state.cv.skills, skill] }
    })),
  
  removeEducation: (id) =>
    set((state) => ({
      cv: {
        ...state.cv,
        education: state.cv.education.filter((edu) => edu.id !== id)
      }
    })),
  
  removeExperience: (id) =>
    set((state) => ({
      cv: {
        ...state.cv,
        experience: state.cv.experience.filter((exp) => exp.id !== id)
      }
    })),
  
  removeSkill: (id) =>
    set((state) => ({
      cv: {
        ...state.cv,
        skills: state.cv.skills.filter((skill) => skill.id !== id)
      }
    })),
  
  saveCV: async () => {
    if (!isSupabaseConfigured()) {
      throw new Error('Please connect to Supabase using the "Connect to Supabase" button in the top right corner');
    }

    const supabase = getSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const cv = get().cv;
    const { error } = await supabase
      .from('cvs')
      .upsert({
        ...cv,
        userId: user.id,
        updatedAt: new Date().toISOString(),
      });

    if (error) throw error;
  },
}));