import "./PlanPricing.css";
import logo from "../../assets/logo-learnlynx.png";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlanPricing = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const isTeacher = localStorage.getItem("Teacher") === "true"; // Check for teacher status
  console.log("Is Teacher: ", isTeacher); // Debugging the value of isTeacher

  const checkOutHandler = async (ammount) => {
    try {
      if (!localStorage.getItem("id")) {
        toast.error("Please Login First!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        const {
          data: { order },
        } = await axios.post("http://localhost:3000/api/checkout", {
          ammount,
        });
        const {
          data: { key },
        } = await axios.get("http://localhost:3000/api/getkey");

        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: "LearnLynx",
          description: "Testing Razorpay",
          image: `${logo}`,
          order_id: order.id,
          handler: async function (response) {
            try {
              const savePaymentData = await axios.post(
                `http://localhost:3000/api/teacherVerification/?auth=${localStorage.getItem(
                  "id"
                )}`,
                response,
                {
                  withCredentials: true,
                }
              );
              console.log(savePaymentData);

              if (savePaymentData.status == 200) {
                window.location.href = `http://localhost:3001/admin/${id}/dashboard`;
              }
            } catch (error) {
              console.log(error);
              toast.error("Error in Payment Verification!");
            }
          },
          prefill: {
            name: `${localStorage.getItem("username")}`,
            email: `${localStorage.getItem("email")}`,
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#f9c365",
          },
        };

        var rzp1 = window.Razorpay(options);
        rzp1.open();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="pricing-container">
        <div className="pricing-content">
          <div className="pricing-details">
            <h1>Plans & Pricing</h1>
            <p>
              LearnLynx offers flexible subscription plans for instructors,
              enabling you to share knowledge effortlessly. Choose the plan that
              best fits your teaching needs and start reaching your students in
              no time.
            </p>
            <ul className="pricing-features">
              <li>Unlimited course creation</li>
              <li>Advanced analytics to track student progress</li>
              <li>Custom branding for your courses</li>
              <li>Priority support from our team</li>
              <li>Secure payment gateway integration</li>
            </ul>
          </div>
          <div className="pricing-card-container">
            <div className="pricing-card">
              <h2>Instructor Plan</h2>
              <p className="plan-price">₹1499/month</p>
              <ul className="plan-features">
                <li>Unlimited course access</li>
                <li>Unlimited student enrollments</li>
                <li>Dedicated support</li>
                <li>Custom course branding</li>
                <li>Advanced analytics & reporting</li>
              </ul>
              <button
                className={`checkout-btn ${isTeacher ? "disabled" : ""}`} // Apply "disabled" class when isTeacher is true
                onClick={() => {
                  checkOutHandler(1499);
                }}
                disabled={isTeacher} // Disable button if teacher is true
              >
                {isTeacher ? "Enrolled" : "Checkout"} {/* Change text based on isTeacher */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000} // Close after 3 seconds
        hideProgressBar={false}
      />
    </>
  );
};

export default PlanPricing;
