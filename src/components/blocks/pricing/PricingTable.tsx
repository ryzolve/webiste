"use client";

import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "components/reuseable/Switch";
import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

type Pricing2Props = {
  className?: string;
  enable_pricing?: boolean;
  planData?: {
    id: string;
    monthly_price: number;
    yearly_price: number;
    plan_name: string;
    suggested_for: string;
    support: string;
    plan_features: {
      id: string;
      item: string;
    }[];
    custom_pricing: boolean;
  }[];
};

const PricingTable: FC<Pricing2Props> = ({
  className,
  planData,
  enable_pricing = [],
}) => {
  const [activeYearly, setActiveYearly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = (planName: string) => {
    setSelectedPlan(planName);
    setShowModal(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setLoading(true);
    const requestBody = {
      data: {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        plan: selectedPlan,
      },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/business-prospect-customers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      setLoading(false);
      toast("Email sent successfully", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }

    setFormData({ name: "", email: "", message: "" });
    setSelectedPlan(null);
    handleClose();
  };

  const checkIcon = (
    <FontAwesomeIcon
      icon={faCircleCheck}
      color={"#0D5992"}
      style={{ height: 18, marginRight: 20 }}
    />
  );

  const crossIcon = (
    <FontAwesomeIcon
      icon={faCircleXmark}
      color={"#ff4d4f"}
      style={{ height: 18, marginRight: 20 }}
    />
  );

  const featureMap = new Map<string, string>();
  planData?.forEach((plan) => {
    plan.plan_features.forEach((f) => {
      const key = f.item.toLowerCase();
      if (!featureMap.has(key)) featureMap.set(key, f.item);
    });
  });
  const allFeatures = Array.from(featureMap.keys());
  return (
    <>
      <div
        className={`pricing-wrapper position-relative ${
          className || "mt-n22 mt-md-n24"
        }`}
      >
        <div
          className="shape bg-dot primary rellax h-18 w-16"
          style={{ top: "2rem", right: "-2.4rem" }}
        />
        <div
          className="shape rounded-circle bg-line red rellax w-18 h-18 d-none d-lg-block"
          style={{ bottom: "0.5rem", left: "-2.5rem" }}
        />

        {enable_pricing && (
          <div className="pricing-switcher-wrapper switcher custom-description-text">
            <p className="mb-0 pe-3">Monthly</p>
            <Switch value={activeYearly} onChange={setActiveYearly} />
            <p className="mb-0 ps-3">Yearly</p>
          </div>
        )}

        <div className="pricing-table-wrapper">
          <table className="pricing-table">
            <thead>
              <tr>
                <th className="custom-card-text">Features</th>
                {planData?.map((plan) => (
                  <th key={plan.id} className="custom-card-text feature-value">
                    {plan.plan_name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* ✅ Pricing Row */}
              {enable_pricing && (
                <tr>
                  <td className="custom-card-description-text">
                    {activeYearly ? "Yearly" : "Monthly"}
                  </td>
                  {planData?.map((plan) => (
                    <td
                      key={plan.id + "-pricing"}
                      className="custom-card-description-text feature-value"
                    >
                      {enable_pricing
                        ? plan.custom_pricing
                          ? "Custom"
                          : `$${
                              activeYearly
                                ? plan.yearly_price
                                : plan.monthly_price
                            }`
                        : "-"}
                    </td>
                  ))}
                </tr>
              )}

              {/* Suggested For Row */}
              <tr>
                <td className="custom-card-description-text">Suggested For</td>
                {planData?.map((plan) => (
                  <td
                    key={plan.id + "-suggested"}
                    className="custom-card-description-text feature-value"
                  >
                    {plan.suggested_for}
                  </td>
                ))}
              </tr>

              {/* Plan Features */}
              {allFeatures.map((featureKey, idx) => (
                <tr key={idx}>
                  <td className="custom-card-description-text">
                    {featureMap.get(featureKey)}
                  </td>
                  {planData?.map((plan) => {
                    const hasFeature = plan.plan_features.some(
                      (f) => f.item.toLowerCase() === featureKey
                    );
                    return (
                      <td key={plan.id + featureKey} className="feature-value">
                        {hasFeature ? checkIcon : crossIcon}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Support Row */}
              <tr>
                <td className="custom-card-description-text">Support</td>
                {planData?.map((plan) => (
                  <td
                    key={plan.id + "-support"}
                    className="custom-card-description-text feature-value"
                  >
                    {plan.support}
                  </td>
                ))}
              </tr>

              {/* Choose Plan Buttons */}
              <tr>
                <td></td>
                {planData?.map((plan) => (
                  <td key={plan.id + "-btn"} className="feature-value">
                    <button
                      className="btn btn-secondary rounded"
                      onClick={() => handleShow(plan.plan_name)}
                    >
                      Choose Plan
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <p>{selectedPlan}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PricingTable;
