# **Product Requirements Document (PRD) & Scope of Work**

**Project:** Scalp Micro USA – Evergreen Casting & Story Funnel  
**Platform Strategy:** V1 Standalone Ecosystem (Webflow \+ Airtable) → V2 CRM Integration (Salesforce)

## **1\. Executive Summary**

This project outlines the development of an evergreen, high-conversion landing page designed to recruit treatment models for Scalp Micro USA. By offering a complimentary SMP treatment with Matt Iulo in exchange for comprehensive media participation, the platform will generate a continuous, predictable pipeline of participants. This ensures a steady flow of high-quality, authentic before-and-after stories tailored for TikTok, Instagram, and long-form documentary content.

## **2\. Project Goals**

* **Content Pipeline:** Eliminate the "shy client" bottleneck by securing upfront, legally binding consent for heavy media participation.  
* **Lead Generation:** Capture high-intent leads who are interested in SMP but are not selected for the free treatment, creating a warm pool for future marketing.  
* **Brand Authority:** Position the free treatment as an exclusive, rolling monthly selection rather than a standard sweepstakes, elevating the Scalp Micro USA brand.  
* **Scalability:** Build a lightweight V1 infrastructure that securely stores media and stories, with an architecture explicitly prepared for a V2 Salesforce integration.

## **3\. User Experience (UX) & Design Architecture**

The page will be sleek, modern, and highly focused on the emotional transformation of SMP.

### **Landing Page Sections**

* **The Hero (Dynamic):** A silent, high-quality looping background video of a consultation, the treatment process, and a final reveal.  
  * *Headline:* "Share Your Story. Transform Your Life."  
  * *Sub-headline:* "Submit your application for a chance to receive a fully sponsored SMP transformation and share your hair loss journey."  
  * *Call-to-Action (CTA):* "Apply Now" (Anchors to the multi-step form).  
* **The Offer & Pacing:** A brief, clean section explaining the exchange. Crucially, this section will state: *"We review applications and select new stories to feature every month."*  
* **What is SMP? (Brief):** A concise, 3-point visual breakdown of the Scalp Micropigmentation process for those who need a quick primer.  
* **The Submission Form (Multi-Step):** The core interactive element of the page.

### **The Multi-Step Application Flow**

To prevent form abandonment, the submission process will be chunked into a frictionless, progressive UI.

| Step | Focus | Required Data Fields   |
| :---- | :---- | :---- |
| **Step 1** | **Basics** | First Name, Last Name, Email, Phone Number, Age, City/State. |
| **Step 2** | **The Journey** | "Tell us about your hair loss journey" (Text area), "Why are you the perfect candidate for this?" (Text area). |
| **Step 3** | **Photos** | Upload Front, Top, Back, and Side profile photos. |
| **Step 4** | **Consent & Submission** | Checkbox for airtight perpetual media release (covers all social platforms). Submit button. |

## **4\. Technical Stack & Infrastructure (Phase 1\)**

To keep development agile while preparing for future expansions (like the Salesforce V2 integration), we will utilize a modern "low-code" architecture.

* **Frontend / UI:** Webflow (Allows for premium animations, video hosting, and incredibly fast load times). \*\*For AI coding Agent: Feel free to recommend other outlets or options for front end design  we will also be utilizing claude front end design skills.  
* **Form Handling & Logic:** Make.com or Zapier (Acts as the traffic controller, routing form submissions to the database and photos to cloud storage).  
* **Database:** Airtable (Serves as the standalone V1 backend. It provides a visual dashboard for the team to review applicants, read their stories, and click links to view their photos).  
* **Media Storage:** Amazon S3 or Google Cloud Storage (High-res applicant photos are routed directly here. The file URLs are then pushed to the Airtable record so the database remains lightweight).  \*\*For AI coding agent: feel free to offer alternate options

**Future-Proofing (V2 & Beyond):**  
The webhook-based logic layer ensures easy data routing later on. This means mapping the applicant pool directly into Salesforce for V2 will be seamless. Additionally, having the data structured this way allows the database to be securely connected to any custom AI assistants to auto-summarize long-winded applicant stories or tag submissions based on emotional keywords.

## **5\. Scope of Work & Milestones**

* **Phase 1: Discovery & Asset Collection**  
  * Finalize copywriting for the landing page.  
  * Scalp Micro USA to provide high-quality B-roll for the Hero video loop.  
  * Drafting and legal review of the Media Release / Terms & Conditions for the form.  
* **Phase 2: UX/UI Design & Prototyping**  
  * Wireframing the landing page layout.  
  * Designing the interactive multi-step form UI.  
  * Client review and approval of the visual design.  
* **Phase 3: Development & Backend Setup**  
  * Building the responsive frontend in Webflow (or locally with AI).  
  * Configuring the cloud storage buckets for secure photo uploads.  
  * Setting up the Airtable database schema.  
  * Building the automation webhooks to connect the frontend form, the storage bucket, and the Airtable database.  
* **Phase 4: Testing & Quality Assurance (QA)**  
  * Stress-testing the form with large photo uploads.  
  * Verifying mobile responsiveness (crucial, as most social traffic will be on mobile).  
  * Ensuring data correctly maps to the Airtable dashboard.  
* **Phase 5: Launch & Handover**  
  * Connecting the custom domain/subdomain (e.g., casting.scalpmicrousa.com).  
  * Going live.  
  * Providing a brief training video for the Scalp Micro USA team on how to manage and update the Airtable dashboard.