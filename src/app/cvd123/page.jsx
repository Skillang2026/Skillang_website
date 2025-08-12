// Clean & Compact CV Extraction Component - SYNTAX FIXED
"use client";

import React, { useState, useCallback } from "react";
import axios from "axios";

// Configuration
const API_BASE_URL = "https://xtractresume.vercel.app";

const CVExtractionPage = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("upload");
    const [stats, setStats] = useState({
        total_candidates: 0,
        recent_uploads: 0,
    });
    const [connectionStatus, setConnectionStatus] = useState("checking");

    // File upload handlers
    const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(
            (file) =>
                file.type === "application/pdf" ||
                file.name.toLowerCase().endsWith(".docx")
        );

        if (validFiles.length !== selectedFiles.length) {
            alert("Some files were ignored. Only PDF and DOCX files are supported.");
        }

        const oversizedFiles = validFiles.filter(
            (file) => file.size > 10 * 1024 * 1024
        );
        if (oversizedFiles.length > 0) {
            alert(
                `Some files are too large (max 10MB): ${oversizedFiles
                    .map((f) => f.name)
                    .join(", ")}`
            );
            return;
        }

        setFiles((prev) => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const checkConnection = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/health`, {
                timeout: 5000,
            });
            if (response.data.database === "connected") {
                setConnectionStatus("connected");
            } else {
                setConnectionStatus("database_error");
            }
        } catch (error) {
            setConnectionStatus("disconnected");
        }
    };

    const extractCVs = async () => {
        if (files.length === 0) {
            alert("Please select at least one file");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            const response = await axios.post(
                `${API_BASE_URL}/extract-and-store`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                    },
                    timeout: 120000,
                }
            );

            if (response.data.success) {
                setResults(response.data.data);
                setFiles([]);
                alert(`Successfully processed ${response.data.total_processed} CVs!`);
                await fetchCandidates();
                await fetchStats();
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert(
                "Error processing files: " +
                (error.response?.data?.detail || error.message)
            );
        } finally {
            setUploading(false);
        }
    };

    const fetchCandidates = async (search = "") => {
        try {
            const url = search
                ? `${API_BASE_URL}/candidates?search=${encodeURIComponent(
                    search
                )}&limit=100`
                : `${API_BASE_URL}/candidates?limit=100`;

            const response = await axios.get(url, { timeout: 10000 });
            if (response.data.success) {
                setCandidates(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stats`, {
                timeout: 10000,
            });
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
            setStats({ total_candidates: 0, recent_uploads: 0 });
        }
    };

    const deleteCandidate = async (id) => {
        if (!confirm("Are you sure you want to delete this candidate?")) return;

        try {
            await axios.delete(`${API_BASE_URL}/candidates/${id}`, {
                timeout: 10000,
            });
            setCandidates((prev) => prev.filter((c) => c.id !== id));
            await fetchStats();
            alert("Candidate deleted successfully");
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting candidate");
        }
    };

    const searchCandidates = async () => {
        await fetchCandidates(searchTerm);
    };

    const exportToCSV = () => {
        if (candidates.length === 0) {
            alert("No candidates to export");
            return;
        }

        const csvData = [
            [
                "Name",
                "Email",
                "Phone",
                "Age",
                "Skills",
                "Education",
                "Experience",
                "Filename",
                "Date Added",
            ],
            ...candidates.map((candidate) => [
                candidate.name || "",
                candidate.email || "",
                candidate.phone || "",
                candidate.age || "",
                candidate.skills || "",
                candidate.education || "",
                candidate.experience || "",
                candidate.original_filename || "",
                new Date(candidate.created_at).toLocaleDateString(),
            ]),
        ];

        const csvContent = csvData
            .map((row) =>
                row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `skillang_candidates_${new Date().toISOString().split("T")[0]
            }.csv`;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    React.useEffect(() => {
        const initializeData = async () => {
            await checkConnection();
            await fetchCandidates();
            await fetchStats();
        };
        initializeData();
    }, []);

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Clean Header */}
            <div className="bg-white border-bottom">
                <div className="container-fluid" style={{ maxWidth: "1200px" }}>
                    <div className="d-flex align-items-center justify-content-between py-3 px-4">
                        <div>
                            <h1 className="h3 fw-semibold text-dark mb-1">
                                CV Data Extractor
                            </h1>
                            <p className="text-muted small mb-0">
                                Extract and manage candidate information from resumes
                            </p>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                            <div className="d-flex align-items-center gap-2">
                                <div
                                    className={`rounded-circle ${connectionStatus === "connected"
                                        ? "bg-success"
                                        : "bg-danger"
                                        }`}
                                    style={{ width: "8px", height: "8px" }}
                                ></div>
                                <span className="text-muted small">
                                    {connectionStatus === "connected"
                                        ? "Connected"
                                        : "Disconnected"}
                                </span>
                            </div>
                            <div className="text-end">
                                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                                    Total Candidates
                                </div>
                                <div className="h5 fw-semibold text-primary mb-0">
                                    {stats.total_candidates}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Simple Tab Navigation */}
                    <div className="border-bottom mt-3">
                        <ul className="nav nav-tabs border-0">
                            <li className="nav-item">
                                <button
                                    onClick={() => setActiveTab("upload")}
                                    className={`nav-link border-0 ${activeTab === "upload"
                                        ? "active border-bottom border-primary border-2 text-primary"
                                        : "text-muted"
                                        }`}
                                    style={{ borderRadius: "0" }}
                                >
                                    Upload CVs
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={() => setActiveTab("candidates")}
                                    className={`nav-link border-0 ${activeTab === "candidates"
                                        ? "active border-bottom border-primary border-2 text-primary"
                                        : "text-muted"
                                        }`}
                                    style={{ borderRadius: "0" }}
                                >
                                    Manage Candidates ({candidates.length})
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
                {/* Upload Tab */}
                {activeTab === "upload" && (
                    <div className="row g-4">
                        {/* Upload Section */}
                        <div className="col-12">
                            <div className="card border">
                                <div className="card-body p-4">
                                    <h2 className="h5 fw-semibold text-dark mb-3">
                                        Upload Resume Files
                                    </h2>

                                    <div
                                        className="border border-2 border-dashed rounded p-5 text-center"
                                        style={{ borderColor: "#dee2e6" }}
                                    >
                                        <div className="mb-3">
                                            <p className="text-muted small mb-1">
                                                Select CV files to extract data
                                            </p>
                                            <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                Supports PDF and DOCX files (max 20 files, 10MB each)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.docx"
                                            onChange={handleFileSelect}
                                            className="d-none"
                                            id="cv-upload"
                                        />
                                        <label
                                            htmlFor="cv-upload"
                                            className="btn btn-primary d-flex align-items-center justify-content-center"
                                        >
                                            Choose Files
                                        </label>
                                    </div>

                                    {/* Selected Files */}
                                    {files.length > 0 && (
                                        <div className="mt-4">
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <h3 className="h6 fw-medium text-dark mb-0">
                                                    Selected Files ({files.length}/20)
                                                </h3>
                                                <button
                                                    onClick={() => setFiles([])}
                                                    className="btn btn-link text-danger p-0 small"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                            <div
                                                className="overflow-auto"
                                                style={{ maxHeight: "160px" }}
                                            >
                                                {files.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="d-flex align-items-center justify-content-between p-2 bg-light rounded border mb-2"
                                                    >
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-2">📄</span>
                                                            <div>
                                                                <p className="small fw-medium text-dark mb-0">
                                                                    {file.name}
                                                                </p>
                                                                <p
                                                                    className="text-muted mb-0"
                                                                    style={{ fontSize: "0.75rem" }}
                                                                >
                                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFile(index)}
                                                            className="btn btn-link text-danger p-0 small"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Extract Button */}
                                    {files.length > 0 && (
                                        <div className="mt-4">
                                            <button
                                                onClick={extractCVs}
                                                disabled={uploading || connectionStatus !== "connected"}
                                                className="btn btn-success w-100"
                                            >
                                                {uploading ? (
                                                    <span className="d-flex align-items-center justify-content-center">
                                                        <div
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                        >
                                                            <span className="visually-hidden">
                                                                Loading...
                                                            </span>
                                                        </div>
                                                        Processing {files.length} file(s)...
                                                    </span>
                                                ) : (
                                                    `Extract Data from ${files.length} CV(s)`
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Recent Results */}
                        {results.length > 0 && (
                            <div className="col-12">
                                <div className="card border">
                                    <div className="card-header bg-white border-bottom">
                                        <h3 className="h5 fw-semibold text-dark mb-0">
                                            Recently Processed ({results.length})
                                        </h3>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="table-responsive">
                                            <table className="table table-striped mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th className="small text-uppercase fw-medium text-muted">
                                                            Name
                                                        </th>
                                                        <th className="small text-uppercase fw-medium text-muted">
                                                            Email
                                                        </th>
                                                        <th className="small text-uppercase fw-medium text-muted">
                                                            Phone
                                                        </th>
                                                        <th className="small text-uppercase fw-medium text-muted">
                                                            Age
                                                        </th>
                                                        <th className="small text-uppercase fw-medium text-muted">
                                                            Skills
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {results.map((candidate, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-medium text-dark">
                                                                {candidate.name}
                                                            </td>
                                                            <td className="text-muted">
                                                                {candidate.email || "-"}
                                                            </td>
                                                            <td className="text-muted">
                                                                {candidate.phone || "-"}
                                                            </td>
                                                            <td className="text-muted">
                                                                {candidate.age || "-"}
                                                            </td>
                                                            <td
                                                                className="text-muted text-truncate"
                                                                style={{ maxWidth: "200px" }}
                                                            >
                                                                {candidate.skills || "-"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Candidates Tab */}
                {activeTab === "candidates" && (
                    <div className="row g-4">
                        {/* Search and Actions */}
                        <div className="col-12">
                            <div className="card border">
                                <div className="card-body p-4">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search candidates..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    onKeyPress={(e) =>
                                                        e.key === "Enter" && searchCandidates()
                                                    }
                                                />
                                                <button
                                                    onClick={searchCandidates}
                                                    className="btn btn-secondary"
                                                >
                                                    Search
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex gap-2 justify-content-md-end">
                                                <button
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        fetchCandidates("");
                                                    }}
                                                    className="btn btn-primary"
                                                >
                                                    Show All
                                                </button>
                                                <button
                                                    onClick={exportToCSV}
                                                    disabled={candidates.length === 0}
                                                    className="btn btn-success"
                                                >
                                                    Export CSV
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Candidates Table */}
                        <div className="col-12">
                            <div className="card border">
                                {candidates.length === 0 ? (
                                    <div className="card-body text-center py-5">
                                        <div className="text-muted mb-3">
                                            <svg
                                                className="mx-auto"
                                                width="48"
                                                height="48"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="h6 fw-medium text-dark">
                                            No candidates found
                                        </h3>
                                        <p className="text-muted small mb-0">
                                            {searchTerm
                                                ? "Try a different search term"
                                                : "Upload some CVs to get started"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="small text-uppercase fw-medium text-muted">
                                                        Name
                                                    </th>
                                                    <th className="small text-uppercase fw-medium text-muted">
                                                        Contact
                                                    </th>
                                                    <th className="small text-uppercase fw-medium text-muted">
                                                        Skills
                                                    </th>
                                                    <th className="small text-uppercase fw-medium text-muted">
                                                        Education
                                                    </th>
                                                    <th className="small text-uppercase fw-medium text-muted">
                                                        Added
                                                    </th>
                                                    <th className="small text-uppercase fw-medium text-muted">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {candidates.map((candidate) => (
                                                    <tr key={candidate.id}>
                                                        <td>
                                                            <div>
                                                                <div className="fw-medium text-dark">
                                                                    {candidate.name}
                                                                </div>
                                                                <div className="text-muted small">
                                                                    Age: {candidate.age || "N/A"}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="text-dark">
                                                                {candidate.email || "No email"}
                                                            </div>
                                                            <div className="text-muted small">
                                                                {candidate.phone || "No phone"}
                                                            </div>
                                                        </td>
                                                        <td
                                                            className="text-muted text-truncate"
                                                            style={{ maxWidth: "200px" }}
                                                        >
                                                            {candidate.skills || "No skills listed"}
                                                        </td>
                                                        <td
                                                            className="text-muted text-truncate"
                                                            style={{ maxWidth: "200px" }}
                                                        >
                                                            {candidate.education || "No education listed"}
                                                        </td>
                                                        <td className="text-muted small">
                                                            {new Date(
                                                                candidate.created_at
                                                            ).toLocaleDateString()}
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => deleteCandidate(candidate.id)}
                                                                className="btn btn-link text-danger p-0"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVExtractionPage;
