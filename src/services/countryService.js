// services/countryService.js - Complete Consolidated Service
import axios from "axios";

const API_BASE_URL = "https://cms.skillang.com/api";

// Create single axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

class CountryService {
  /**
   * Get all countries from CMS (from original countryCMS.js)
   */
  async getAllCountries() {
    try {
      const response = await api.get("/countries", {
        params: {
          "filters[isActive]": true,
          "sort[0]": "displayOrder:asc",
        },
      });

      // Handle different response structures (original logic)
      if (response.data && Array.isArray(response.data)) {
        return { data: response.data };
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data;
      } else if (response.data && typeof response.data === "object") {
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            return { data: response.data[key] };
          }
        }
      }

      return { data: [] };
    } catch (error) {
      console.error("Error fetching countries:", error);
      return { data: [] };
    }
  }

  /**
   * Get specific country by slug (from original countryService.js)
   */
  async getCountryBySlug(slug) {
    try {
      if (!slug) {
        throw new Error("Country slug is required");
      }

      const response = await api.get("/countries", {
        params: {
          "filters[slug][$eq]": slug,
          "populate[headerImage]": true,
          "populate[countryFlag]": true,
          "populate[overviewFactItem]": true,
          "populate[educationUniversityRanking]": true,
          "populate[partnerUniversity][populate]": "image",
          "populate[studyProgram]": true,
          "populate[entranceExam]": true,
          "populate[scholarshipDetails]": true,
          "populate[costOfLiving]": true,
          "populate[visaRoute]": true,
          "populate[industryTopCompanies]": true,
          "populate[overviewBasicInfo]": true,
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error("Invalid API response structure");
      }

      const countryArray = response.data.data;
      const countryData = countryArray[0];

      if (!countryData) {
        throw new Error(`Country with slug '${slug}' not found`);
      }

      return this.transformApiDataToFrontendFormat(countryData);
    } catch (error) {
      console.error(`Error fetching country ${slug}:`, error);
      throw new Error(
        `Failed to fetch country data for '${slug}': ${error.message}`
      );
    }
  }

  /**
   * Transform API data to frontend format (ORIGINAL LOGIC from countryWiseData.js)
   */
  transformApiDataToFrontendFormat(apiData) {
    try {
      const {
        shortForm = "",
        fullForm = "",
        description = "",
        slug = "",
        headerImage = null,
        countryFlag = null,
        overviewFactItem = [],
        educationUniversityRanking = [],
        partnerUniversity = [],
        studyProgram = [],
        entranceExam = [],
        scholarshipDetails = [],
        costOfLiving = [],
        visaRoute = null,
        industryTopCompanies = [],
        overviewBasicInfo = [],
      } = apiData;

      // Get header image URL
      const headerImageUrl = headerImage?.url
        ? `https://cms.skillang.com${headerImage.url}`
        : "";

      const overviewInfo = overviewBasicInfo[0] || {};
      const overviewDescription = overviewInfo.description || description;

      // Parse reasons to study from API
      let studyReasons = [];
      if (overviewInfo.reasonsToStudy) {
        // Split by line breaks and clean up
        studyReasons = overviewInfo.reasonsToStudy
          .split("\n")
          .map((reason) => reason.trim().replace(/^[-•]\s*/, ""))
          .filter((reason) => reason.length > 0);
      }

      // Transform facts with proper icon handling
      const transformedFacts = overviewFactItem.map((fact) => ({
        key: fact.key,
        label: fact.label,
        value: fact.value,
        icon: this.getLocalFactIcon(fact.key, fact, apiData),
        hasSplit: fact.hasSplit,
        splitChar: fact.hasSplit ? this.getSplitChar(fact.value) : undefined,
      }));
      console.log("🏳️ Country flag data:", countryFlag);
      return {
        [slug]: {
          shortForm,
          fullForm,
          title: `Study in ${fullForm}`,
          description,
          headerImage: headerImageUrl,
          countryFlag: countryFlag?.url
            ? `https://cms.skillang.com${countryFlag.url}`
            : "",

          overview: {
            description: overviewDescription,
            reasons: studyReasons,
            facts: transformedFacts,
          },

          education: {
            universityRankings: educationUniversityRanking.map((uni) => ({
              name: uni.name,
              ranking2025: uni.ranking2025,
              change: uni.ranking2025 - uni.ranking2024,
              ranking2024: uni.ranking2024,
            })),

            partnerUniversities: partnerUniversity.map((uni, index) => ({
              id: uni.id || index + 1,
              name: uni.name,
              location: uni.location,
              image: uni.image?.url
                ? `https://cms.skillang.com${uni.image.url}`
                : this.getLocalPartnerUniImage(index),
              qsRank: uni.qsRank,
            })),

            topPrograms: studyProgram.map((program, index) => ({
              id: program.id || index + 1,
              title: program.programTitle,
              degree: program.degree,
              duration: program.duration,
              university: program.universityName,
              salary: program.avgSalaryRange,
              type: program.degreeType,
            })),

            programTypes: ["all", "bachelors", "masters", "phd"],
          },

          admission: {
            requirementsData: [
              {
                id: 1,
                icon: this.getLocalRequirementIcon("academic"),
                title: "Academic Qualifications",
                description:
                  "Hold a recognized secondary school certificate (for undergraduates) or a relevant bachelor's degree (for postgraduates) with satisfactory grades, along with any subject-specific prerequisites.",
              },
              {
                id: 2,
                icon: this.getLocalRequirementIcon("language"),
                title: "English Language Proficiency",
                description:
                  "Achieve the required scores in tests like IELTS or TOEFL (typically an overall IELTS band of 6.0-7.0) to demonstrate adequate English skills.",
              },
              {
                id: 3,
                icon: this.getLocalRequirementIcon("sop"),
                title: "SOP",
                description:
                  "Submit a compelling essay outlining your academic goals, motivations, and reasons for choosing the country.",
              },
              {
                id: 4,
                icon: this.getLocalRequirementIcon("recommendation"),
                title: "Letters of Recommendation",
                description:
                  "Provide one or more academic references from teachers or previous academic supervisors to support your application.",
              },
              {
                id: 5,
                icon: this.getLocalRequirementIcon("additional"),
                title: "Additional Requirements",
                description:
                  "Additional documentation may be required based on specific program requirements.",
              },
              {
                id: 6,
                icon: this.getLocalRequirementIcon("financial"),
                title: "Financial Proof",
                description:
                  "Show evidence of sufficient funds to cover tuition fees and living expenses, as required by visa regulations.",
              },
            ],
            entranceExamData: entranceExam.map((exam, index) => ({
              id: exam.id || index + 1,
              exam: exam.examShortName,
              fullName: exam.examFullname,
              criteria: Array.isArray(exam.ReqCriteria)
                ? exam.ReqCriteria
                : [exam.ReqCriteria || ""],
              requiredFor: exam.requiredFor || "",
            })),
          },

          workAbroadOpps: {
            visaRoutes: this.transformVisaRoutes(visaRoute),
            topCompaniesData: this.transformCompaniesData(industryTopCompanies),
          },

          scholarships: scholarshipDetails.map((scholarship, index) => ({
            id: scholarship.id || index + 1,
            name: scholarship.scholarshipName,
            benefits: scholarship.scholarshipBenefits,
            deadline: scholarship.WhentoApplyDeadline,
            applyLink: scholarship.scholarshipDirectLink,
            link: `/scholarships/${scholarship.id}`,
            image:
              scholarship.scholarshipImage ||
              "/assets/images/study-abroad-county-wise/scholarship1.jpg",
            eligibility: scholarship.ScholarshipEligibilityCriteria
              ? scholarship.ScholarshipEligibilityCriteria.split(
                  /[.\n]/
                ).filter((item) => item.trim())
              : [],
          })),

          costOfLiving: costOfLiving || [],
        },
      };
    } catch (error) {
      console.error("Error transforming data:", error);
      throw error;
    }
  }

  /**
   * Transform visa routes (ORIGINAL LOGIC from countryWiseData.js)
   */
  transformVisaRoutes(visaRoute) {
    if (!visaRoute) return [];

    const routes = [];

    if (visaRoute.graduateRoute) {
      routes.push({
        id: 1,
        route: "Graduate route",
        icon: "🎓",
        color: "#4285F4",
        requirements: visaRoute.graduateRoute
          .split("\n")
          .filter((req) => req.trim()),
      });
    }

    if (visaRoute.SkilledworkerRoute) {
      routes.push({
        id: 2,
        route: "Skilled worker route",
        icon: "💼",
        color: "#F4B400",
        requirements: visaRoute.SkilledworkerRoute.split("\n").filter((req) =>
          req.trim()
        ),
      });
    }

    if (visaRoute.startUpRoute) {
      routes.push({
        id: 3,
        route: "Start-up route",
        icon: "🚀",
        color: "#0F9D58",
        requirements: visaRoute.startUpRoute
          .split("\n")
          .filter((req) => req.trim()),
      });
    }

    if (visaRoute.StudentsUnionSabbaticalOfficers) {
      routes.push({
        id: 4,
        route: "Students' union sabbatical officers",
        icon: "👥",
        color: "#DB4437",
        requirements: visaRoute.StudentsUnionSabbaticalOfficers.split(
          "\n"
        ).filter((req) => req.trim()),
      });
    }

    if (visaRoute.InnovatorFounder) {
      routes.push({
        id: 5,
        route: "Innovator Founder",
        icon: "💡",
        color: "#4B0082",
        requirements: visaRoute.InnovatorFounder.split("\n").filter((req) =>
          req.trim()
        ),
      });
    }

    if (visaRoute.IndiaYoungProfessionalsScheme) {
      routes.push({
        id: 6,
        route: "India Young Professionals Scheme",
        icon: "🇮🇳",
        color: "#00BFFF",
        requirements: visaRoute.IndiaYoungProfessionalsScheme.split(
          "\n"
        ).filter((req) => req.trim()),
      });
    }

    return routes;
  }

  /**
   * Transform companies data (ORIGINAL LOGIC from countryWiseData.js)
   */
  transformCompaniesData(industryTopCompanies) {
    if (!industryTopCompanies || !Array.isArray(industryTopCompanies))
      return [];

    const companiesMap = new Map();

    industryTopCompanies.forEach((company) => {
      if (!companiesMap.has(company.city)) {
        companiesMap.set(company.city, {
          id: companiesMap.size + 1,
          city: company.city,
          industries: [],
        });
      }

      companiesMap.get(company.city).industries.push({
        name: company.category,
        companies: company.companies,
      });
    });

    return Array.from(companiesMap.values());
  }

  // ORIGINAL Helper Methods from countryWiseData.js

  getLocalFactIcon(key, factData, apiData) {
    // Use country flag for population fact
    if (key === "capital" && apiData?.countryFlag?.url) {
      return `https://cms.skillang.com${apiData.countryFlag.url}`;
    }

    // Icon mapping based on actual API keys
    const iconMap = {
      capital: "/assets/icons/study-abroad-country-wise/capital.svg",
      income: "/assets/icons/study-abroad-country-wise/income.svg",
      lang: "/assets/icons/study-abroad-country-wise/lang.svg",
      population: "/assets/icons/study-abroad-country-wise/population.svg", // This will be overridden above
      stuCount: "/assets/icons/study-abroad-country-wise/grad.svg",
      uniCount: "/assets/icons/study-abroad-country-wise/uniCount.svg",
      currency: "/assets/icons/study-abroad-country-wise/currency.svg",
      partTime: "/assets/icons/study-abroad-country-wise/partTime.svg",
      happinesIndex: "/assets/icons/study-abroad-country-wise/fact9.svg",
    };

    return (
      iconMap[key] || "/assets/icons/study-abroad-country-wise/happiness.svg"
    );
  }
  getLocalRequirementIcon(type) {
    const iconMap = {
      academic: "/assets/icons/study-abroad-country-wise/document-text.svg",
      language: "/assets/icons/study-abroad-country-wise/translate.svg",
      sop: "/assets/icons/study-abroad-country-wise/paperclip-2.svg",
      recommendation:
        "/assets/icons/study-abroad-country-wise/document-like.svg",
      additional: "/assets/icons/study-abroad-country-wise/document.svg",
      financial: "/assets/icons/study-abroad-country-wise/wallet-search.svg",
    };
    return (
      iconMap[type] || "/assets/icons/study-abroad-country-wise/document.svg"
    );
  }

  getLocalPartnerUniImage(index) {
    const images = [
      "/images/study-abroad-county-wise/ourPartnerUni1.jpg",
      "/images/study-abroad-county-wise/ourPartnerUni2.jpg",
      "/images/study-abroad-county-wise/ourPartnerUni3.jpg",
      "/images/study-abroad-county-wise/ourPartnerUni14.jpg",
      "/images/study-abroad-county-wise/ourPartnerUni5.jpg",
    ];
    return images[index % images.length];
  }

  getLocalLandmarkImage(index) {
    const landmarks = [
      "/images/study-abroad-county-wise/keyDestiLand1.jpg",
      "/images/study-abroad-county-wise/keyDestiLand2.jpg",
    ];
    return landmarks[index % landmarks.length];
  }

  getSplitChar(value) {
    if (value.includes(",")) return ",";
    if (value.includes("|")) return "|";
    if (value.includes(";")) return ";";
    return ",";
  }

  parseRequirements(requirementsString) {
    if (!requirementsString) return ["Requirements not specified"];

    if (Array.isArray(requirementsString)) {
      return requirementsString.filter((req) => req && req.length > 0);
    }

    const cleaned = requirementsString
      .replace(/[^\w\s\.,;:\-()%]/g, " ")
      .trim();

    const requirements = cleaned
      .split(/(?:\d+\.\s+|\n|•\s*|:\.\s+[A-Z]|\|\s*)/)
      .map((req) => req.trim())
      .filter((req) => req.length > 3)
      .map((req) => req.replace(/^[•\-\*]\s*/, "").trim())
      .filter((req) => req.length > 0);

    return requirements.length > 0
      ? requirements
      : [cleaned || "Requirements not specified"];
  }
}

// Export singleton instance
const countryService = new CountryService();
export default countryService;
