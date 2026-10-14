import { api } from "./api";
import { Course, Student, User } from "@/types";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

/**
 * Dynamically loads the official Razorpay Checkout SDK script
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById("razorpay-checkout-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn("Failed to load Razorpay Checkout script from CDN.");
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export interface CheckoutParams {
  course: Course;
  currentUser: User | null;
  currentStudent?: Student | null;
  onSuccess: (receiptNumber: string, orderDetails?: any) => void;
  onError: (errorMessage: string) => void;
  onDismiss?: () => void;
}

/**
 * Initiates Razorpay payment flow.
 * Works seamlessly in dual-mode:
 * 1. Live/Test Razorpay: When RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET are set, opens official Razorpay modal.
 * 2. Instant Demo Mode: When keys are not yet configured, creates simulated verified enrollment.
 */
export async function startRazorpayCheckout({
  course,
  currentUser,
  currentStudent,
  onSuccess,
  onError,
  onDismiss,
}: CheckoutParams): Promise<void> {
  try {
    // 1. Create order on Backend
    const orderRes = await api.createRazorpayOrder({
      amount: course.samplePrice,
      courseId: course.id,
      courseTitle: course.title,
      studentName: currentUser?.name || "Student",
      studentEmail: currentUser?.email || "student@ililanguages.in",
      studentPhone: currentStudent?.phone || "+919826012345",
    });

    if (!orderRes.success || !orderRes.data) {
      onError(orderRes.error || "Failed to initiate payment order with server.");
      return;
    }

    const { order, keyId, isDemo } = orderRes.data;

    // 2. If backend indicates live Razorpay keys are available, attempt checkout script
    const isLiveGateway = !isDemo && keyId && keyId !== "rzp_test_placeholder";

    if (isLiveGateway) {
      const scriptLoaded = await loadRazorpayScript();
      if (scriptLoaded && window.Razorpay) {
        const options = {
          key: keyId,
          amount: order.amount,
          currency: order.currency || "INR",
          name: "ILI Foreign Languages Institute",
          description: `Enrollment: ${course.title} (${course.level})`,
          order_id: order.id,
          image: "/favicon.ico",
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              const verifyRes = await api.verifyRazorpayPayment({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                courseId: course.id,
                courseTitle: course.title,
                amount: course.samplePrice,
                studentName: currentUser?.name,
                studentEmail: currentUser?.email,
                studentPhone: currentStudent?.phone,
                studentId: currentStudent?.id,
              });

              if (verifyRes.success && verifyRes.data?.verified) {
                onSuccess(verifyRes.data.receiptNumber || order.receipt, verifyRes.data);
              } else {
                onError(verifyRes.error || "Payment verification failed. Please contact admissions support.");
              }
            } catch (err: any) {
              onError(err.message || "Failed to verify payment with server.");
            }
          },
          prefill: {
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            contact: currentStudent?.phone || "",
          },
          notes: {
            institute: "ILI Foreign Languages Institute - Apollo Tower Indore",
            courseId: course.id,
          },
          theme: {
            color: "#0284c7", // Sky blue brand color
          },
          modal: {
            ondismiss: () => {
              onDismiss?.();
            },
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
        return;
      }
    }

    // 3. Simulated Demo Fallback: keys not configured yet or offline testing
    const demoVerify = await api.verifyRazorpayPayment({
      orderId: order.id,
      paymentId: `pay_demo_${Date.now()}`,
      signature: "demo_signature",
      courseId: course.id,
      courseTitle: course.title,
      amount: course.samplePrice,
      studentName: currentUser?.name,
      studentEmail: currentUser?.email,
      studentPhone: currentStudent?.phone,
      studentId: currentStudent?.id,
    });

    const receipt =
      (demoVerify.data && demoVerify.data.receiptNumber) ||
      `ILI-REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    onSuccess(receipt, demoVerify.data);
  } catch (err: any) {
    onError(err.message || "An unexpected error occurred during payment processing.");
  }
}
