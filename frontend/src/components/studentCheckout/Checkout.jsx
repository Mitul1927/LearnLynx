import  { useState ,useEffect} from "react";
import "./Checkout.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/logo-learnlynx.png";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    degreeProgram: "ug",
    address: "",
    Gender:"Male"
  });
  const {id}=useParams();
  const [course, setCourse] = useState({});
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit =async (e) => {
    const ammount=course.discountPrice;
    e.preventDefault();  
    const verify = await axios.get("http://localhost:3000/api/verifyUser", {
            withCredentials: true,
          });
          if (verify.data.success == false) {
            toast.error("Please Login First");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            try {
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
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: `http://localhost:3000/api/paymentverification/${id}?auth=${verify.data.user._id}`,
                prefill: {
                  name: `${verify.data.user.username}`,
                  email: `${verify.data.user.email}`,
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
            } catch (err) {
              console.log(err);
            }
          }

  };
  useEffect(() => {
    fetch(`/api/admin/course/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        return response.json();
      })
      .then((data) => setCourse(data))
      .catch((error) => setError(error.message));
  }, [id]);
  



  return (
    <div className="checkout-container">
    <form onSubmit={handleSubmit}>
      <section className="contact-section">
        <div className="container">
          <div className="grid">
            <div className="image-section">
              <div className="image-container">
                <img
                  src="https://pagedone.io/asset/uploads/1696488602.png"
                  alt="Contact Us"
                  className="contact-image"
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-title">Checkout Page</h2>
              <input
                type="text"
                className="input-field"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                name="name"
                id="name"
                required
              />
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="email"
                required
              />
              <input
                type="tel"
                className="input-field"
                placeholder="Phone"
                min={10}
                max={10}
                value={formData.phone}
                onChange={handleChange}
                name="phone"
                id="phone"
                pattern="\d{10}"
                required
              />
              <input
                type="text"
                className="input-field"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                name="address"
                id="address"
                required
              />
              <div className="communication-method">
                <h4 className="method-title">Degree Program:</h4>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="ug"
                    name="degreeProgram"
                    value="ug"
                    checked={formData.degreeProgram === "ug"}
                    onChange={handleChange}
                  />
                  <label htmlFor="ug" className="radio-label">
                    UG
                  </label>
                  <input
                    type="radio"
                    id="pg"
                    name="degreeProgram"
                    value="pg"
                    checked={formData.degreeProgram === "pg"}
                    onChange={handleChange}
                  />
                  <label htmlFor="pg" className="radio-label">
                    PG
                  </label>

                  <input
                    type="radio"
                    id="employee"
                    name="degreeProgram"
                    value="employee"
                    checked={formData.degreeProgram === "employee"}
                    onChange={handleChange}
                  />
                  <label htmlFor="employee" className="radio-label">
                    Employee
                  </label>
                </div>
              </div>
              <div className="communication-method">
                <h4 className="method-title">Gender</h4>
                <div className="radio-item">
                  <input
                    type="radio"
                    id="Male"
                    name="Gender"
                    value="Male"
                    checked={formData.Gender === "Male"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Male" className="radio-label">
                    Male
                  </label>

                  <input
                    type="radio"
                    id="Female"
                    name="Gender"
                    value="Female"
                    checked={formData.Gender === "Female"}
                    onChange={handleChange}
                  />
                  <label htmlFor="Female" className="radio-label">
                    Female
                  </label>
                </div>
              </div>
              <div className="button-container">
                <button className="submit-button" type="submit">Send</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
    </div>
  );
};

export default Checkout;

