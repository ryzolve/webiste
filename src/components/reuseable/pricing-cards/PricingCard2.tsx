import React, { FC, useState } from "react";
import Price from "./Price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

// ================================================================
type PricingCard2Props = {
  plan_name: string;
  plan_features: {
    id: string;
    item: string;
  }[];
  yearly_price: number;
  monthly_price: number;
  activeYearly: boolean;
  roundedButton?: boolean;
  Icon: (props: any) => JSX.Element;
};
// ================================================================

const PricingCard2: FC<PricingCard2Props> = (props) => {
  const {
    plan_name,
    plan_features,
    yearly_price,
    monthly_price,
    activeYearly,
    roundedButton,
    Icon,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const requestBody = {
      data: {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        plan: plan_name,
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
    // Add your form submission logic here
    handleClose();
  };

  const yearClasses = activeYearly ? "price-show" : "price-hide price-hidden";
  const monthClasses = !activeYearly ? "price-show" : "price-hide price-hidden";

  return (
    <>
      <div className="pricing card shadow-lg custom-description-text">
        <div className="card-body">
          <Icon />

          <h4 className="card-title">{plan_name}</h4>

          {/* {monthly_price || yearly_price === 0 ? null : (
            <div className="prices">
              <Price
                duration="mo"
                value={monthly_price}
                classes={monthClasses}
              />
              <Price duration="yr" value={yearly_price} classes={yearClasses} />
            </div>
          )} */}
          {(monthly_price !== 0 || yearly_price !== 0) && (
            <div className="prices">
              <Price
                duration="mo"
                value={monthly_price}
                classes={monthClasses}
              />
              <Price duration="yr" value={yearly_price} classes={yearClasses} />
            </div>
          )}

          <ul className="icon-list bullet-bg bullet-soft-primary mt-7 mb-8 text-start">
            {plan_features.map((item, i) => (
              <li key={i}>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  color="#0D5992"
                  style={{
                    height: 18,
                    marginRight: 20,
                    marginLeft: -32,
                  }}
                />
                <span>
                  <strong>{item.item.split(" ")[0]}</strong>{" "}
                  {item.item.split(" ").slice(1).join(" ")}
                </span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleShow}
            className={`btn btn-secondary ${
              roundedButton ? "rounded" : "rounded-pill"
            }`}
          >
            Choose Plan
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Choose {plan_name} Plan</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <p>{plan_name}</p>
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

export default PricingCard2;
