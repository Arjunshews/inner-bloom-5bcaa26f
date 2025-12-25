import Navigation from "@/components/Navigation";
import EmailSignIn from "@/components/EmailSignIn";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const handleVerified = (email) => {
    // Store verified email in localStorage for demo purposes
    localStorage.setItem("verifiedEmail", email);
    // Redirect after short delay
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto">
          <EmailSignIn onVerified={handleVerified} />
        </div>
      </main>
    </div>
  );
};

export default SignIn;
