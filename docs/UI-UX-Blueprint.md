# **Scalp Micro USA – Casting Landing Page: UI/UX & Component Blueprint**

**System Instruction for AI Developer:** You are an expert front-end engineer and UI/UX designer. Your task is to build a high-converting, premium landing page based on the blueprint below. The code must be clean, semantic, and highly responsive. Focus on a "Premium Editorial" aesthetic—utilizing generous whitespace, crisp typography, and smooth, lightweight animations.

## **1\. Global Design Tokens (The Vibe)**

* **Theme:** Premium, Trustworthy, Cinematic (Dark Mode or High-Contrast Light Mode).  
* **Typography:**  
  * *Headers:* Structural, bold sans-serif (e.g., Inter, Montserrat, or Syne) to convey authority.  Stay away from typical AI built web designs and generic fonts  
  * *Body:* Clean, highly legible sans-serif (e.g., Roboto or Open Sans).  
* **Spacing:** Use modern CSS clamp functions for fluid typography and generous section padding (e.g., padding: clamp(4rem, 8vw, 8rem)) to let elements breathe.  
* **Interactions:** All buttons and form inputs must have smooth ease-in-out hover states (200-300ms). Use subtle fade-ins for text blocks as they scroll into view.

## **2\. Section-by-Section Blueprint**

### **Block 1: The Cinematic Hero**

* **Purpose:** Immediately hook the user and communicate the offer visually.  
* **Layout:** Full-height (100vh) edge-to-edge container.  
* **Elements:**  
  * **Background:** Looping, silent, high-quality B-roll video (consultation, scalp treatment, final reveal). Include a dark scrim/overlay (rgba(0,0,0,0.6)) to ensure text readability.  
  * **Headline (H1):** "Share Your Story. Transform Your Life." (Center aligned, bold, white).  
  * **Sub-headline (H2/p):** "Submit your application for a chance to receive a fully sponsored SMP treatment with Scalp Micro USA."  
  * **Primary CTA Button:** "Apply Now" (Contrasting accent color, anchors smoothly to Block 4).

### **Block 2: The Offer & Pacing**

* **Purpose:** Build prestige and explain the exchange without sounding like a cheap giveaway.  
* **Layout:** Clean, centered text block with subtle background contrast.  
* **Elements:**  
  * **Headline (H2):** "The Documentary Project"  
  * **Body Copy:** "We are looking for real stories. In exchange for documenting your hair loss journey and treatment process on camera, we are fully sponsoring select SMP transformations. We review applications and select new stories to feature every month."  
  * **Visuals:** A subtle 3-column icon grid detailing the exchange: 1\. Apply, 2\. Get Selected, 3\. Film & Transform.

### **Block 3: What is SMP? (Trust & Authority)**

* **Purpose:** Educate warm leads who need a quick primer before committing their personal info.  
* **Layout:** Asymmetrical or Bento-grid style layout.  
* **Elements:**  
  * **Headline (H2):** "The Ultimate Hair Loss Solution"  
  * **Content:** 3 bullet points or short cards explaining Scalp Micropigmentation (Non-surgical, Immediate results, Permanent).  
  * **Gallery:** A sleek grid of 3-4 ultra-high-quality before/after lifestyle images. *Developer Note: Images must have subtle border-radii and lazy-load.*

### **Block 4: The Multi-Step Application Form (The Core Engine)**

* **Purpose:** Capture lead data, stories, and photos without causing form fatigue.  
* **Layout:** A centered, elevated "card" style container overlapping the background slightly.  
* **Elements (Interactive UI):**  
  * **Progress Indicator:** A top visual bar showing steps 1 through 4\.  
  * **Step 1 (Basics):** Standard inputs (First Name, Last Name, Email, Phone, City/State).  
  * **Step 2 (The Journey):** Two large text-areas: "Tell us about your hair loss journey" and "Why are you the perfect candidate?"  
  * **Step 3 (Photos):** File upload dropzones for Front, Top, Back, and Side profiles. *Developer Note: Must accept standard image formats and indicate upload progress.*  
  * **Step 4 (Consent & Submit):** Checkbox: *"I understand and agree that if selected, my treatment will be filmed and photographed for Scalp Micro USA's marketing and social media channels."*  
  * **Form Actions:** "Next", "Back", and "Submit Application" buttons.

### **Block 5: Footer & Legal**

* **Purpose:** Trust, compliance, and secondary navigation.  
* **Layout:** Minimalist bottom bar.  
* **Elements:**  
  * Scalp Micro USA logo.  
  * Links: Main Website, Privacy Policy, Media Terms & Conditions.  
  * Copyright text.

## **3\. Critical Development Thoughts (Guiderails for AI)**

1. **Mobile-First Execution:** This page will receive massive traffic from TikTok and Instagram. The mobile layout cannot be an afterthought. The multi-step form must fit perfectly on mobile screens without awkward zooming or scrolling cut-offs.  
2. **Asset Optimization:** The hero video and gallery images must be compressed and optimized for web to ensure the page hits a 90+ Google Lighthouse performance score.  
3. **Form State Management:** Ensure the form retains data if the user hits "Back" between steps 1-4. The user should not have to retype their emotional story if they forgot a photo on the next step.  
4. **Use up-to-date and UI elements and graphics** 