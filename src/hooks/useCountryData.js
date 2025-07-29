// hooks/useCountryData.js - Updated Hook
import { useState, useEffect, useCallback } from "react";
import countryService from "../services/countryService";

export const useCountryData = (initialCountrySlug = null) => {
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch specific country data
  const fetchCountryData = useCallback(async (slug) => {
    if (!slug) {
      console.warn("No slug provided to fetchCountryData");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await countryService.getCountryBySlug(slug);
      setCountryData(data);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch country data";
      console.error("Error in fetchCountryData:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all countries
  const fetchAllCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await countryService.getAllCountries();
      setAllCountries(data.data || []);
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch countries";
      console.error("Error in fetchAllCountries:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when initialCountrySlug changes
  useEffect(() => {
    if (initialCountrySlug) {
      fetchCountryData(initialCountrySlug);
    }
  }, [initialCountrySlug, fetchCountryData]);

  // Refetch function
  const refetch = useCallback(() => {
    if (initialCountrySlug) {
      fetchCountryData(initialCountrySlug);
    } else {
      fetchAllCountries();
    }
  }, [initialCountrySlug, fetchCountryData, fetchAllCountries]);

  // Clear data function
  const clearData = useCallback(() => {
    setCountryData(null);
    setAllCountries([]);
    setError(null);
  }, []);

  // Get country by slug from already loaded data
  const getCountryFromCache = useCallback(
    (slug) => {
      if (!slug || !allCountries.length) return null;
      return allCountries.find((country) => country.slug === slug);
    },
    [allCountries]
  );

  return {
    // Data
    countryData,
    allCountries,
    loading,
    error,

    // Actions
    fetchCountryData,
    fetchAllCountries,
    refetch,
    clearData,
    getCountryFromCache,

    // Computed values
    hasCountryData: !!countryData,
    hasAllCountries: allCountries.length > 0,
    isInitialLoading: loading && !countryData && !allCountries.length,
  };
};

export default useCountryData;
