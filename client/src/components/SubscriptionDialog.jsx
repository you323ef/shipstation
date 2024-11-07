import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";
import { Zap, Image, Globe, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const SubscriptionDialog = ({ isOpen, onClose, isSubscribed, user }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handle window resize for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const addRazorpayScript = () => {
      const rzpPaymentForm = document.getElementById("rzp_payment_form");

      if (rzpPaymentForm && !rzpPaymentForm.hasChildNodes()) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.async = true;
        script.dataset.payment_button_id = "pl_PH9UiM0zlSM2Xw";

        // Add click handler to close dialog
        rzpPaymentForm.addEventListener("click", () => {
          setTimeout(() => onClose(false), 100);
        });

        // Check if the button is rendered using MutationObserver
        const observer = new MutationObserver((mutations, obs) => {
          const razorpayButton = document.querySelector(
            ".razorpay-payment-button"
          );
          if (razorpayButton) {
            setIsPaymentLoading(false);
            obs.disconnect(); // Stop observing once button is found
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        rzpPaymentForm.appendChild(script);
      }
    };

    if (isOpen && !isSubscribed) {
      setIsPaymentLoading(true);
      setTimeout(addRazorpayScript, 100);
    }

    // Subscribe to realtime changes using channel
    const channel = supabase
      .channel("user_profiles_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_profiles",
          filter: `id=eq.${user?.id}`,
        },
        (payload) => {
          if (
            payload.new.subscription_status === "active" &&
            payload.old.subscription_status !== "active"
          ) {
            setTimeout(() => {
              setShowConfetti(true);
              toast.success("Welcome to ShipStation Pro! 🚀", {
                description: "Your account has been upgraded successfully!",
                duration: 12000, // Long duration for better visibility
              });

              setTimeout(() => setShowConfetti(false), 3000);
            }, 10000); // Delay to ensure payment modal confirmation and redirection from gateway
          }
        }
      )
      .subscribe();

    // Cleanup function
    return () => {
      setIsPaymentLoading(true);
      supabase.removeChannel(channel);
    };
  }, [isOpen, isSubscribed, onClose, user?.id]);

  const renderPaymentButton = () => {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <form id="rzp_payment_form" className="w-full flex justify-center" />
        {isPaymentLoading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Initializing secure payment options...</span>
          </div>
        )}
      </div>
    );
  };

  const renderSubscriptionContent = () => {
    if (!isSubscribed) {
      return (
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Upgrade to ShipStation Pro
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Unlock powerful features to enhance your portfolio
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 py-4">
            {[
              {
                icon: Zap,
                title: "Unlimited AI Refinements",
                description:
                  "Continuously improve your portfolio with AI assistance",
              },
              {
                icon: Globe,
                title: "Custom Domain",
                description: "Connect your own domain for better branding",
              },
              {
                icon: Image,
                title: "Unlimited Assets",
                description:
                  "Add as many images, videos, and files as you need",
              },
              {
                icon: Crown,
                title: "Premium Support",
                description: "Get priority assistance when you need it",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-slate-800/35 rounded-lg"
              >
                <feature.icon className="w-6 h-6 text-primary" />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="flex items-center sm:justify-center w-full">
            {renderPaymentButton()}
          </DialogFooter>
        </>
      );
    } else {
      return (
        <>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl">Your Subscription</DialogTitle>
            <DialogDescription className="text-gray-500">
              Manage your premium subscription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-foreground">
                Current Plan: Premium
              </h3>
              <p className="text-sm text-muted-foreground">
                Next billing date: June 1, 2023
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Recent Invoices</h4>
              {[
                { date: "May 1, 2023", amount: "$9.99" },
                { date: "April 1, 2023", amount: "$9.99" },
              ].map((invoice, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-secondary rounded-lg"
                >
                  <div className="flex items-center space-x-2 text-foreground">
                    <FileText className="w-4 h-4" />
                    <span>{invoice.date}</span>
                  </div>
                  <span className="text-foreground">{invoice.amount}</span>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex justify-start">
            <Button variant="link">Cancel Subscription</Button>
          </DialogFooter>
        </>
      );
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
          numberOfPieces={500}
          recycle={false}
          gravity={0.2}
        />
      )}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {renderSubscriptionContent()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionDialog;
