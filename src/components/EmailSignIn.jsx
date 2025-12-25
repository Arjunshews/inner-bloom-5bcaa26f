import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmail } from "@/lib/emailjs";
import { toast } from "@/hooks/use-toast";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";

const EmailSignIn = ({ onVerified }) => {
  const [step, setStep] = useState("email"); // 'email' | 'code' | 'verified'
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const newCode = generateCode();
    setGeneratedCode(newCode);

    const result = await sendEmail({
      to_email: email,
      user_email: email,
      verification_code: newCode,
      message: `Your verification code is: ${newCode}`,
    });

    setIsLoading(false);

    if (result.success) {
      setStep("code");
      toast({
        title: "Code sent!",
        description: "Check your email for the verification code.",
      });
    } else {
      toast({
        title: "Failed to send code",
        description: "Please check your EmailJS configuration.",
        variant: "destructive",
      });
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    
    if (code === generatedCode) {
      setStep("verified");
      toast({
        title: "Verified!",
        description: "Your email has been verified successfully.",
      });
      if (onVerified) {
        onVerified(email);
      }
    } else {
      toast({
        title: "Invalid code",
        description: "The code you entered doesn't match.",
        variant: "destructive",
      });
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    const newCode = generateCode();
    setGeneratedCode(newCode);

    const result = await sendEmail({
      to_email: email,
      user_email: email,
      verification_code: newCode,
      message: `Your verification code is: ${newCode}`,
    });

    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Code resent!",
        description: "Check your email for the new verification code.",
      });
    } else {
      toast({
        title: "Failed to resend code",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (step === "verified") {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-card rounded-2xl shadow-soft border border-border">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
            Email Verified
          </h3>
          <p className="text-muted-foreground">
            Welcome! You're signed in as <span className="text-foreground font-medium">{email}</span>
          </p>
        </div>
      </div>
    );
  }

  if (step === "code") {
    return (
      <div className="w-full max-w-md mx-auto p-8 bg-card rounded-2xl shadow-soft border border-border">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
            Check Your Email
          </h3>
          <p className="text-muted-foreground">
            We sent a 6-digit code to <span className="text-foreground font-medium">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="text-center text-2xl tracking-widest font-mono h-14"
              maxLength={6}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={code.length !== 6}>
            Verify Code
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Didn't receive a code? Resend"}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Use a different email
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-2xl shadow-soft border border-border">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
          Sign In with Email
        </h3>
        <p className="text-muted-foreground">
          Enter your email to receive a verification code
        </p>
      </div>

      <form onSubmit={handleSendCode} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12"
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Code
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EmailSignIn;
