// models/Country.js - Cleaned Country Models (No Broken References)

/**
 * Raw API Country Model (what comes from Strapi)
 */
export const ApiCountryModel = {
  id: 0,
  documentId: "",
  shortForm: "",
  fullForm: "",
  description: "",
  slug: "",
  isActive: true,
  displayOrder: 0,
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  headerImage: null,
  countryFlag: null,
  overviewFactItem: [],
  educationUniversityRanking: [],
  partnerUniversity: [],
  studyProgram: [],
  entranceExam: [],
  scholarshipDetails: [],
  costOfLiving: [],
  visaRoute: null,
  industryTopCompanies: [],
  overviewBasicInfo: [],
};

/**
 * Frontend Country Model (after transformation)
 */
export const FrontendCountryModel = {
  shortForm: "",
  fullForm: "",
  title: "",
  description: "",
  headerImage: "",
  countryFlag: "",
  overview: {
    description: "",
    reasons: [],
    facts: [],
  },
  education: {
    universityRankings: [],
    partnerUniversities: [],
    topPrograms: [],
    programTypes: [],
  },
  admission: {
    requirementsData: [],
    entranceExamData: [],
  },
  workAbroadOpps: {
    visaRoutes: [],
    topCompaniesData: [],
  },
  scholarships: [],
  costOfLiving: [],
};

/**
 * Validation Functions
 */
export const validateCountryData = (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid country data: must be an object");
  }

  const required = ["id", "slug", "shortForm", "fullForm", "description"];
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  return true;
};

export const validateApiResponse = (response) => {
  if (!response || !response.data) {
    throw new Error("Invalid API response: missing data");
  }

  if (!Array.isArray(response.data.data)) {
    throw new Error("Invalid API response: data.data must be an array");
  }

  return true;
};

/**
 * Type Definitions for better IDE support
 */
export const CountryFactType = {
  key: "",
  label: "",
  value: "",
  icon: "",
  hasSplit: false,
  splitChar: "",
};

export const UniversityRankingType = {
  rank: 0,
  name: "",
  score: 0,
  category: "",
};

export const PartnerUniversityType = {
  id: 0,
  name: "",
  logo: "",
  location: "",
  programs: [],
};

export const StudyProgramType = {
  id: 0,
  name: "",
  duration: "",
  level: "",
  requirements: "",
};

export const AdmissionRequirementType = {
  id: 0,
  icon: "",
  title: "",
  description: "",
};

export const EntranceExamType = {
  id: 0,
  exam: "",
  fullName: "",
  criteria: [],
  requiredFor: "",
};

export const VisaRouteType = {
  id: 0,
  route: "",
  icon: "",
  color: "",
  requirements: [],
};

export const ScholarshipType = {
  name: "",
  amount: "",
  eligibility: [],
  deadline: "",
};

export const CostOfLivingType = {
  category: "",
  amount: "",
  description: "",
};

/**
 * Helper Functions
 */
export const createEmptyCountryData = (slug) => ({
  [slug]: {
    ...FrontendCountryModel,
    title: `Study in ${slug}`,
  },
});

export const isValidCountrySlug = (slug) => {
  return typeof slug === "string" && slug.length > 0 && /^[a-z0-9-]+$/.test(slug);
};

export const formatCountryTitle = (fullForm) => {
  return `Study in ${fullForm}`;
};

export const getCountryImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return imagePath.startsWith("http") ? imagePath : `https://cms.skillang.com${imagePath}`;
};