"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
  Table,
  InputGroup,
  Tabs,
  Tab,
  Badge,
} from "react-bootstrap";
import Papa from "papaparse";

const Mailer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [senderEmailPrefix, setSenderEmailPrefix] = useState("");
  const [templateKey, setTemplateKey] = useState("");
  const [templates, setTemplates] = useState([]);
  const [file, setFile] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [scheduleEmail, setScheduleEmail] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [editingRecipient, setEditingRecipient] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editUsername, setEditUsername] = useState("");

  // State for scheduled emails tab
  const [activeTab, setActiveTab] = useState("composer");
  const [scheduledEmails, setScheduledEmails] = useState([]);
  const [loadingScheduled, setLoadingScheduled] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  // New state variables for pagination and filtering
  const [displayCount, setDisplayCount] = useState(5); // Initially show 5 emails
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'pending', 'sent', 'failed', 'cancelled'

  const fileInputRef = useRef(null);
  const successAlertTimeout = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchTemplates = async () => {
      setTemplatesLoading(true);
      try {
        const response = await axios.get(
          "https://cms.skillang.com/api/mail-templates"
        );
        const formatted = response.data.data.map((item) => ({
          name: item.Template_Name,
          key: item.key,
        }));
        setTemplates(formatted);
      } catch (err) {
        console.error("Failed to fetch templates:", err);
        setError("Failed to load email templates from CMS.");
      } finally {
        setTemplatesLoading(false);
      }
    };
    fetchTemplates();
  }, [isAuthenticated]);

  // Auto-dismiss success messages after 30 seconds
  useEffect(() => {
    if (success) {
      if (successAlertTimeout.current) {
        clearTimeout(successAlertTimeout.current);
      }
      successAlertTimeout.current = setTimeout(() => {
        setSuccess("");
      }, 30000);
    }
    return () => {
      if (successAlertTimeout.current) {
        clearTimeout(successAlertTimeout.current);
      }
    };
  }, [success]);

  // Fetch scheduled emails when switching to the scheduled tab
  useEffect(() => {
    if (isAuthenticated && activeTab === "scheduled") {
      fetchScheduledEmails();
    }
  }, [isAuthenticated, activeTab]);

  // Reset display count when switching tabs or changing filters
  useEffect(() => {
    setDisplayCount(5);
  }, [activeTab, statusFilter]);

  const fetchScheduledEmails = async () => {
    if (!isAuthenticated) return;

    setLoadingScheduled(true);
    try {
      const response = await axios.get(
        "https://www.skillang.com/api/api/scheduled-emails"
      ); //http://localhost:3001/api/scheduled-emails
      setScheduledEmails(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch scheduled emails:", err);
      setError("Failed to load scheduled emails.");
    } finally {
      setLoadingScheduled(false);
    }
  };

  const handleLogin = () => {
    if (username === "mailagent1" && password === "lokskill123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid login credentials.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError("");
    setSuccess("");

    if (!selectedFile) return;

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const firstRow = result.data[0] || {};
        if (!firstRow.email || !firstRow.username) {
          setError("CSV must have 'email' and 'username' columns.");
          return;
        }

        const newRecipients = result.data
          .filter((row) => row.email && row.email.trim() !== "")
          .map(({ email, username }) => ({
            email: email.trim(),
            username: username?.trim() || "",
          }));

        if (newRecipients.length === 0) {
          setError("No valid emails found in CSV.");
          return;
        }

        setRecipients((prevRecipients) => [
          ...prevRecipients,
          ...newRecipients,
        ]);
        setSuccess(`Added ${newRecipients.length} recipients from CSV.`);
      },
      error: (err) => {
        console.error("CSV parse error:", err.message);
        setError("Failed to parse CSV.");
      },
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteRecipient = (index) => {
    setRecipients((prevRecipients) =>
      prevRecipients.filter((_, i) => i !== index)
    );
  };

  const handleEditRecipient = (index) => {
    const recipient = recipients[index];
    setEditingRecipient(index);
    setEditEmail(recipient.email);
    setEditUsername(recipient.username);
  };

  const handleSaveEdit = () => {
    if (!editEmail || editEmail.trim() === "") {
      setError("Email cannot be empty.");
      return;
    }

    setRecipients((prevRecipients) =>
      prevRecipients.map((recipient, index) =>
        index === editingRecipient
          ? { email: editEmail.trim(), username: editUsername.trim() }
          : recipient
      )
    );

    setEditingRecipient(null);
    setEditEmail("");
    setEditUsername("");
  };

  const isFutureDate = (dateString) => {
    const now = new Date();
    const selected = new Date(dateString);
    return selected > now;
  };

  const handleSend = async () => {
    const fullSenderEmail = `${senderEmailPrefix}@skillang.com`;

    if (!senderEmailPrefix) return setError("Sender email prefix is required.");
    if (!templateKey) return setError("Please select an email template.");
    if (recipients.length === 0) return setError("Please add recipients.");

    if (scheduleEmail && (!scheduledTime || !isFutureDate(scheduledTime))) {
      return setError("Please select a valid future date and time.");
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        senderEmail: fullSenderEmail,
        templateKey,
        recipients,
        ...(scheduleEmail && { scheduledTime }),
      };

      const response = await axios.post(
        "https://www.skillang.com/api/api/send-template",
        payload
      );

      setSuccess(
        response.data.message ||
          (scheduleEmail ? "Emails scheduled!" : "Emails sent!")
      );

      // Reset form after successful submission
      setSenderEmailPrefix("");
      setTemplateKey("");
      setFile(null);
      setRecipients([]);
      setScheduledTime("");
      setScheduleEmail(false);

      // If it was a scheduled email, switch to the scheduled tab
      if (scheduleEmail) {
        setActiveTab("scheduled");
        // Wait a moment for the server to process before fetching
        setTimeout(fetchScheduledEmails, 1000);
      }
    } catch (err) {
      console.error("Error sending:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancelling a scheduled email
  const handleCancelScheduledEmail = async (id) => {
    try {
      setCancellingId(id);
      const response = await axios.delete(
        `https://www.skillang.com/api/api/scheduled-emails/${id}`
      );

      if (response.data.success) {
        setSuccess("Email schedule cancelled successfully");
        // Update the local state to reflect cancellation
        setScheduledEmails((prevEmails) =>
          prevEmails.map((email) =>
            email._id === id
              ? { ...email, status: "cancelled", cancelledAt: new Date() }
              : email
          )
        );
      } else {
        setError("Failed to cancel scheduled email");
      }
    } catch (err) {
      console.error("Error cancelling scheduled email:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  // Format date for display
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "sent":
        return "success";
      case "failed":
        return "danger";
      case "cancelled":
        return "secondary";
      default:
        return "info";
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-md-center">
        <Col md={10}>
          <Card>
            <Card.Header as="h5">
              {isAuthenticated
                ? "Email Campaign Manager"
                : "Login to Access Mailer"}
            </Card.Header>
            <Card.Body>
              {!isAuthenticated ? (
                <Form>
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </Form>
              ) : (
                <>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">{success}</Alert>}

                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3"
                  >
                    <Tab eventKey="composer" title="Email Composer">
                      <Form>
                        <Form.Group
                          controlId="formSenderEmail"
                          className="mb-3"
                        >
                          <Form.Label>Sender Email</Form.Label>
                          <InputGroup>
                            <Form.Control
                              type="text"
                              value={senderEmailPrefix}
                              onChange={(e) => {
                                setSenderEmailPrefix(e.target.value);
                                setError("");
                              }}
                              placeholder="info, noreply, etc."
                            />
                            <InputGroup.Text>@skillang.com</InputGroup.Text>
                          </InputGroup>
                        </Form.Group>

                        <Form.Group controlId="formTemplate" className="mb-3">
                          <Form.Label>Select Email Template</Form.Label>
                          <Form.Select
                            value={templateKey}
                            onChange={(e) => {
                              setTemplateKey(e.target.value);
                              setError("");
                            }}
                            disabled={templatesLoading}
                          >
                            <option value="">-- Choose a template --</option>
                            {templates.map((tpl) => (
                              <option key={tpl.key} value={tpl.key}>
                                {tpl.name}
                              </option>
                            ))}
                          </Form.Select>
                          {templatesLoading && (
                            <div className="text-center mt-2">
                              <Spinner animation="border" size="sm" /> Loading
                              templates...
                            </div>
                          )}
                        </Form.Group>

                        <Form.Group
                          controlId="formScheduleToggle"
                          className="mb-3"
                        >
                          <Form.Check
                            type="switch"
                            label="Schedule Email?"
                            checked={scheduleEmail}
                            onChange={() => {
                              setScheduleEmail(!scheduleEmail);
                              setScheduledTime("");
                              setError("");
                            }}
                          />
                        </Form.Group>

                        {scheduleEmail && (
                          <Form.Group
                            controlId="formScheduleTime"
                            className="mb-3"
                          >
                            <Form.Label>Schedule Date & Time</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              min={new Date().toISOString().slice(0, 16)}
                            />
                            <Form.Text className="text-muted">
                              Time must be in the future. Current server time
                              zone is IST (Indian Standard Time).
                            </Form.Text>
                          </Form.Group>
                        )}

                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>Add Recipients CSV</Form.Label>
                          <Form.Control
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                          />
                          <Form.Text className="text-muted">
                            CSV must have 'email' and 'username' columns.
                            Recipients will be added to the existing list.
                          </Form.Text>
                        </Form.Group>

                        {recipients.length > 0 && (
                          <div className="mt-4">
                            <h6>Recipients ({recipients.length} total):</h6>
                            <div
                              style={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                              <Table striped bordered hover size="sm">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {recipients.map((row, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {editingRecipient === index ? (
                                          <Form.Control
                                            type="email"
                                            value={editEmail}
                                            onChange={(e) =>
                                              setEditEmail(e.target.value)
                                            }
                                            size="sm"
                                          />
                                        ) : (
                                          row.email
                                        )}
                                      </td>
                                      <td>
                                        {editingRecipient === index ? (
                                          <Form.Control
                                            type="text"
                                            value={editUsername}
                                            onChange={(e) =>
                                              setEditUsername(e.target.value)
                                            }
                                            size="sm"
                                          />
                                        ) : (
                                          row.username
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {editingRecipient === index ? (
                                          <>
                                            <Button
                                              variant="success"
                                              size="sm"
                                              onClick={handleSaveEdit}
                                              title="Save"
                                            >
                                              Save
                                            </Button>{" "}
                                            <Button
                                              variant="secondary"
                                              size="sm"
                                              onClick={() =>
                                                setEditingRecipient(null)
                                              }
                                              title="Cancel"
                                            >
                                              Cancel
                                            </Button>
                                          </>
                                        ) : (
                                          <>
                                            <Button
                                              variant="outline-primary"
                                              size="sm"
                                              onClick={() =>
                                                handleEditRecipient(index)
                                              }
                                              title="Edit"
                                            >
                                              Edit
                                            </Button>{" "}
                                            <Button
                                              variant="outline-danger"
                                              size="sm"
                                              onClick={() =>
                                                handleDeleteRecipient(index)
                                              }
                                              title="Delete"
                                            >
                                              Delete
                                            </Button>
                                          </>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                            <div className="d-flex justify-content-end mt-2">
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => setRecipients([])}
                                disabled={recipients.length === 0}
                              >
                                Clear All Recipients
                              </Button>
                            </div>
                          </div>
                        )}

                        <Button
                          className="mt-4 w-100"
                          variant="primary"
                          onClick={handleSend}
                          disabled={
                            loading ||
                            recipients.length === 0 ||
                            !senderEmailPrefix ||
                            !templateKey ||
                            (scheduleEmail &&
                              (!scheduledTime || !isFutureDate(scheduledTime)))
                          }
                        >
                          {loading ? (
                            <>
                              <Spinner animation="border" size="sm" />{" "}
                              {scheduleEmail ? "Scheduling..." : "Sending..."}
                            </>
                          ) : (
                            `${scheduleEmail ? "Schedule" : "Send"} ${
                              recipients.length
                            } Email${recipients.length > 1 ? "s" : ""}`
                          )}
                        </Button>
                      </Form>
                    </Tab>

                    <Tab eventKey="scheduled" title="Scheduled Emails">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={fetchScheduledEmails}
                          disabled={loadingScheduled}
                        >
                          {loadingScheduled ? (
                            <>
                              <Spinner animation="border" size="sm" />{" "}
                              Refreshing...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-sync-alt"></i> Refresh
                            </>
                          )}
                        </Button>

                        {/* Custom Nav Tabs for filters */}
                        <ul className="nav nav-tabs w-100">
                          <li className="nav-item" style={{ width: "20%" }}>
                            <a
                              className={`nav-link text-center ${
                                statusFilter === "all"
                                  ? "active bg-primary text-white"
                                  : ""
                              }`}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setStatusFilter("all");
                              }}
                              style={{ padding: "0.375rem 0.5rem" }}
                            >
                              All
                            </a>
                          </li>
                          <li className="nav-item" style={{ width: "20%" }}>
                            <a
                              className={`nav-link text-center ${
                                statusFilter === "pending"
                                  ? "active bg-warning text-dark"
                                  : ""
                              }`}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setStatusFilter("pending");
                              }}
                              style={{ padding: "0.375rem 0.5rem" }}
                            >
                              Pending
                            </a>
                          </li>
                          <li className="nav-item" style={{ width: "20%" }}>
                            <a
                              className={`nav-link text-center ${
                                statusFilter === "sent"
                                  ? "active bg-success text-white"
                                  : ""
                              }`}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setStatusFilter("sent");
                              }}
                              style={{ padding: "0.375rem 0.5rem" }}
                            >
                              Sent
                            </a>
                          </li>
                          <li className="nav-item" style={{ width: "20%" }}>
                            <a
                              className={`nav-link text-center ${
                                statusFilter === "failed"
                                  ? "active bg-danger text-white"
                                  : ""
                              }`}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setStatusFilter("failed");
                              }}
                              style={{ padding: "0.375rem 0.5rem" }}
                            >
                              Failed
                            </a>
                          </li>
                          <li className="nav-item" style={{ width: "20%" }}>
                            <a
                              className={`nav-link text-center ${
                                statusFilter === "cancelled"
                                  ? "active bg-secondary text-white"
                                  : ""
                              }`}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setStatusFilter("cancelled");
                              }}
                              style={{ padding: "0.375rem 0.5rem" }}
                            >
                              Cancelled
                            </a>
                          </li>
                        </ul>
                      </div>

                      {loadingScheduled ? (
                        <div className="text-center py-4">
                          <Spinner animation="border" />
                          <p className="mt-2">Loading scheduled emails...</p>
                        </div>
                      ) : scheduledEmails.length === 0 ? (
                        <Alert variant="info">
                          No scheduled emails found. Use the Email Composer tab
                          to schedule emails.
                        </Alert>
                      ) : (
                        <>
                          <div
                            style={{ maxHeight: "500px", overflowY: "auto" }}
                          >
                            <Table striped bordered hover responsive size="sm">
                              <thead>
                                <tr>
                                  <th>Template</th>
                                  <th>From</th>
                                  <th>To</th>
                                  <th>Scheduled For</th>
                                  <th>Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {scheduledEmails
                                  .filter(
                                    (email) =>
                                      statusFilter === "all" ||
                                      email.status === statusFilter
                                  )
                                  .slice(0, displayCount)
                                  .map((email) => (
                                    <tr key={email._id}>
                                      <td title={email.templateKey}>
                                        {email.templateKey.substring(0, 15)}...
                                      </td>
                                      <td>{email.senderEmail}</td>
                                      <td>
                                        {email.recipients.length} recipient(s)
                                      </td>
                                      <td>
                                        {formatDateTime(email.scheduledTime)}
                                      </td>
                                      <td>
                                        <Badge
                                          bg={getStatusBadgeVariant(
                                            email.status
                                          )}
                                        >
                                          {email.status}
                                        </Badge>
                                      </td>
                                      <td>
                                        {email.status === "pending" && (
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() =>
                                              handleCancelScheduledEmail(
                                                email._id
                                              )
                                            }
                                            disabled={
                                              cancellingId === email._id
                                            }
                                          >
                                            {cancellingId === email._id ? (
                                              <Spinner
                                                animation="border"
                                                size="sm"
                                              />
                                            ) : (
                                              "Cancel"
                                            )}
                                          </Button>
                                        )}

                                        {email.status === "failed" && (
                                          <span
                                            className="text-danger small"
                                            title={email.error}
                                          >
                                            Error:{" "}
                                            {email.error
                                              ? email.error.substring(0, 20) +
                                                "..."
                                              : "Unknown"}
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </Table>
                          </div>

                          {/* See More button */}
                          {displayCount <
                            scheduledEmails.filter(
                              (email) =>
                                statusFilter === "all" ||
                                email.status === statusFilter
                            ).length && (
                            <div className="text-center mt-3">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() =>
                                  setDisplayCount((prev) => prev + 10)
                                }
                              >
                                See More
                              </Button>
                            </div>
                          )}

                          {/* Summary statistics */}
                          <div className="mt-3 small text-muted">
                            Showing{" "}
                            {Math.min(
                              displayCount,
                              scheduledEmails.filter(
                                (email) =>
                                  statusFilter === "all" ||
                                  email.status === statusFilter
                              ).length
                            )}{" "}
                            of{" "}
                            {
                              scheduledEmails.filter(
                                (email) =>
                                  statusFilter === "all" ||
                                  email.status === statusFilter
                              ).length
                            }{" "}
                            emails
                            {statusFilter !== "all" &&
                              ` (filtered by: ${statusFilter})`}
                          </div>
                        </>
                      )}
                    </Tab>
                  </Tabs>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Mailer;
