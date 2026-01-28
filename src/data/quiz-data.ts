export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  category: string;
}

export interface QuizOption {
  text: string;
  value: string;
  weight: {
    online?: number;
    faceToFace?: number;
    blended?: number;
    budget?: string;
    duration?: string;
    state?: string;
  };
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: "location",
    question: "Which state or territory are you located in?",
    options: [
      { text: "New South Wales", value: "NSW", weight: { state: "NSW" } },
      { text: "Victoria", value: "VIC", weight: { state: "VIC" } },
      { text: "Queensland", value: "QLD", weight: { state: "QLD" } },
      { text: "Western Australia", value: "WA", weight: { state: "WA" } },
      { text: "South Australia", value: "SA", weight: { state: "SA" } },
      { text: "Tasmania", value: "TAS", weight: { state: "TAS" } },
      { text: "Northern Territory", value: "NT", weight: { state: "NT" } },
      { text: "ACT", value: "ACT", weight: { state: "ACT" } }
    ]
  },
  {
    id: 2,
    category: "budget",
    question: "What is your budget for the course?",
    options: [
      { text: "Under $3,000", value: "low", weight: { budget: "low" } },
      { text: "$3,000 - $4,000", value: "medium", weight: { budget: "medium" } },
      { text: "$4,000 - $5,000", value: "high", weight: { budget: "high" } },
      { text: "Above $5,000 (willing to pay for premium)", value: "premium", weight: { budget: "premium" } }
    ]
  },
  {
    id: 3,
    category: "learning",
    question: "What is your preferred learning style?",
    options: [
      { text: "100% online - I prefer complete flexibility", value: "online", weight: { online: 10, faceToFace: 0, blended: 0 } },
      { text: "Face-to-face - I learn best in classroom settings", value: "f2f", weight: { online: 0, faceToFace: 10, blended: 5 } },
      { text: "Blended - Mix of online and some face-to-face sessions", value: "blended", weight: { online: 5, faceToFace: 5, blended: 10 } },
      { text: "Flexible - Open to any delivery mode", value: "flexible", weight: { online: 5, faceToFace: 5, blended: 5 } }
    ]
  },
  {
    id: 4,
    category: "timeline",
    question: "How quickly do you want to complete the course?",
    options: [
      { text: "As fast as possible (6-8 months)", value: "fast", weight: { duration: "fast" } },
      { text: "Moderate pace (9-12 months)", value: "moderate", weight: { duration: "moderate" } },
      { text: "Slow and steady (12-18 months)", value: "slow", weight: { duration: "slow" } },
      { text: "No rush - I have plenty of time", value: "flexible", weight: { duration: "flexible" } }
    ]
  },
  {
    id: 5,
    category: "experience",
    question: "Do you have prior industry experience?",
    options: [
      { text: "Yes - I'm currently working in the industry", value: "experienced", weight: { online: 5 } },
      { text: "Yes - I have some related experience", value: "some", weight: { blended: 3 } },
      { text: "No - Complete beginner to the industry", value: "beginner", weight: { faceToFace: 3, blended: 5 } }
    ]
  },
  {
    id: 6,
    category: "employment",
    question: "Are you currently employed?",
    options: [
      { text: "Yes - Full-time (need flexible study options)", value: "fulltime", weight: { online: 8, blended: 5 } },
      { text: "Yes - Part-time", value: "parttime", weight: { online: 5, faceToFace: 3, blended: 5 } },
      { text: "No - Unemployed or seeking career change", value: "unemployed", weight: { faceToFace: 5, blended: 3 } },
      { text: "Retired - Looking to enter a new field", value: "retired", weight: { online: 3, faceToFace: 5 } }
    ]
  },
  {
    id: 7,
    category: "support",
    question: "How important is student support and mentoring?",
    options: [
      { text: "Very important - I want lots of trainer interaction", value: "high", weight: { faceToFace: 5, blended: 3 } },
      { text: "Moderately important - Some support is good", value: "medium", weight: { blended: 5 } },
      { text: "Not critical - I'm a self-directed learner", value: "low", weight: { online: 5 } }
    ]
  },
  {
    id: 8,
    category: "placement",
    question: "Do you have access to practical placement opportunities?",
    options: [
      { text: "Yes - My employer can provide placement", value: "yes-employer", weight: { online: 5 } },
      { text: "Yes - I can arrange my own placement", value: "yes-self", weight: { online: 3, blended: 3 } },
      { text: "No - I need the RTO to help arrange placement", value: "no", weight: { faceToFace: 5, blended: 3 } }
    ]
  }
];
