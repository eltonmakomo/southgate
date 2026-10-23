import heroGatesAsset from "@/assets/gates-hd.png.asset.json";
const heroGates = heroGatesAsset.url;
import academicsImgAsset from "@/assets/academics-hd.png.asset.json";
const academicsImg = academicsImgAsset.url;
import scienceImgAsset from "@/assets/science-new.png.asset.json";
const scienceImg = scienceImgAsset.url;
import agricultureImg from "@/assets/agriculture.jpg";
import boardingImgAsset from "@/assets/boarding-hd.png.asset.json";
const boardingImg = boardingImgAsset.url;
import sportImg from "@/assets/sport.jpg";
import choirImgAsset from "@/assets/music-new.png.asset.json";
const choirImg = choirImgAsset.url;
import admissionsImgAsset from "@/assets/admissions-new.png.asset.json";
const admissionsImg = admissionsImgAsset.url;
import campusImg from "@/assets/campus.jpg";
import leadershipImgAsset from "@/assets/leadership-hd.png.asset.json";
const leadershipImg = leadershipImgAsset.url;

export const images = {
  heroGates,
  academicsImg,
  scienceImg,
  agricultureImg,
  boardingImg,
  sportImg,
  choirImg,
  admissionsImg,
  campusImg,
  leadershipImg,
};

export type FormKind = "enquiry" | "careers" | "newsletter";
export type EnquiryCategory = "admissions" | "boarding" | "general" | "careers";

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "values"; items: { title: string; text: string }[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "quote"; text: string[]; cite: string }
  | { type: "pending"; text: string }
  | { type: "news" }
  | { type: "form"; form: FormKind; category?: EnquiryCategory };

export type Page = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  blocks: Block[];
};

export type ThemeKey = "about" | "academics" | "admissions" | "life" | "news" | "contact";

export type Section = {
  slug: string;
  title: string;
  navTitle: string;
  theme: ThemeKey;
  intro: string;
  image: string;
  imageAlt: string;
  pages: Page[];
};

export const school = {
  name: "Southgate Senior School",
  tagline: "Grow • Learn • Lead",
  openingBadge: "Opening January 2027",
  pageTitle: "Southgate Senior School — Opening January 2027",
  footerSummary: "A private senior school in Zimbabwe, proudly affiliated with the Zion Christian Church. Opening January 2027.",
  headline: "Where Excellence, Character and Faith Take Root",
  subhead:
    "A private senior school in Zimbabwe, proudly affiliated with the Zion Christian Church — admissions open for January 2027.",
  intro: [
    "Southgate Senior School is being built to give young people an exceptional secondary education: academically, spiritually and personally. Guided by the values of the Zion Christian Church and delivered by an experienced, diverse teaching team, our dual curriculum programme prepares students for success wherever their futures take them, regionally or abroad. We are currently welcoming enquiries and applications ahead of our January 2027 opening.",
    "The senior school years shape the adults our children become. At Southgate, our purpose is simple: to raise young people of academic distinction, strong character and genuine compassion, equipped to thrive at university, at work and in their communities, in Harare, the wider region, or further afield. From our very first intake, we are committed to small class sizes, close pastoral attention, and a campus built for discovery both inside and outside the classroom.",
  ],
  pillars: [
    {
      title: "Academic Excellence",
      text: "Our students follow the ZIMSEC and Cambridge curricula side by side, taught by experienced, internationally minded educators who bring rigour and care to every classroom. Small class sizes mean no student is overlooked, and a broad subject offering ensures every young person finds their strengths and a clear path to the qualifications they need.",
      image: academicsImg,
      section: "academics",
      page: "curriculum-overview",
    },
    {
      title: "Faith & Character",
      text: "Rooted in the values of the Zion Christian Church, we nurture young people who are grounded, disciplined and guided by strong moral character. Daily devotions, chapel services and a values based approach to school life shape not just what our students know, but who they become.",
      image: choirImg,
      section: "about",
      page: "our-zcc-foundation",
    },
    {
      title: "All Round Development",
      text: "From sport and the arts to hands on agricultural learning, clubs and student leadership, every student is encouraged to discover and grow beyond the classroom. We believe a well rounded education builds resilience, confidence and the practical life skills that serve students long after they leave school.",
      image: sportImg,
      section: "academics",
      page: "co-curricular-programme",
    },
    {
      title: "Premium Boarding",
      text: "Our weekly boarding houses offer a warm, closely supervised home away from home, with a maximum of four students per room and structured study time. Students return to their families every weekend, giving them the best of both worlds: a focused, supportive week and quality time at home.",
      image: boardingImg,
      section: "student-life",
      page: "boarding",
    },
  ],
  glance: [
    "Secondary education through to A-Level",
    "Dual ZIMSEC and Cambridge curriculum",
    "Premium weekly boarding, maximum four students per room",
    "Experienced, diverse teaching faculty",
    "Hands on agricultural learning programme",
    "Admissions open for January 2027",
  ],
  community:
    "Southgate Senior School is more than a place of learning, it is a community bound together by faith, family and a shared ambition for our young people’s futures. We invite you to be part of our founding story.",
  cta: "Admissions for our January 2027 intake are now open. Begin your enquiry today.",
};

const p = (text: string): Block => ({ type: "p", text });
const list = (items: string[]): Block => ({ type: "list", items });

export const newsIntro = {
  eyebrow: "News & Updates",
  title: "The Southgate founding story",
  summary: "Admissions, our founding community and the vision for a new senior school opening in January 2027.",
};

// Adapted from the preparatory site's opening, founding-cohort, vision,
// leadership and campus stories. Its dates, placeholder quotations and
// unverified construction or enrolment claims do not apply to the senior school.
export const schoolNews: Page[] = [
  {
    slug: "opening-january-2027",
    title: "Southgate Senior School Opens in January 2027",
    summary: "Admissions are open for our first intake in January 2027.",
    image: admissionsImg,
    imageAlt: "Illustrative family discussing secondary-school admissions",
    blocks: [
      p("Southgate Senior School is welcoming enquiries and applications ahead of its January 2027 opening. Our first intake marks the beginning of a new secondary-school community rooted in the values of the Zion Christian Church."),
      p("Our senior school programme brings together ZIMSEC and Cambridge pathways, close academic attention and opportunities to grow through sport, the arts, agriculture and student leadership. Families can enquire about day-school and premium weekly boarding arrangements."),
      p("Our main entry points are Form 1 and Form 5, with applications for other forms considered subject to availability. An academic assessment, family interview and review of previous school reports help us understand each applicant’s strengths and readiness."),
      { type: "form", form: "enquiry", category: "admissions" },
    ],
  },
  {
    slug: "our-founding-cohort",
    title: "Be Part of Southgate’s Founding Cohort",
    summary: "Our first students and their families will help shape the traditions of a new school.",
    image: heroGates,
    imageAlt: "Illustrative senior-school students arriving through school gates",
    blocks: [
      p("Being part of a founding cohort means more than joining a school. Southgate’s first students will help shape its community, from the first assembly and sporting fixture to the friendships and traditions that future generations will inherit."),
      p("For students beginning Form 1, this is the start of a journey towards confidence, independence and a strong secondary education. For students entering Sixth Form, it is an opportunity to contribute as senior role models while preparing for A-Level examinations and life beyond school."),
      p("We welcome local, regional and international families who share our commitment to academic excellence, faith and character. Families interested in our January 2027 intake can begin with an enquiry and discuss the appropriate form, curriculum pathway and boarding arrangements with our admissions team."),
      { type: "form", form: "enquiry", category: "admissions" },
    ],
  },
  {
    slug: "a-vision-for-southgate",
    title: "A Vision for Southgate: Character Matters",
    summary: "Preparing young people for university and adult life without losing sight of who they are.",
    image: choirImg,
    imageAlt: "Illustrative school choir gathered in a bright hall",
    blocks: [
      p("The vision behind Southgate is simple: a young person’s character matters as much as their results. Our senior school is being built to prepare students academically, spiritually and personally for Zimbabwe, the wider region and the world."),
      p("Rooted in the Zion Christian Church, our ethos centres on discipline, humility, integrity and service. Daily devotions, chapel services and pastoral support connect these values to the everyday choices students make."),
      p("Academic ambition and care belong together. Small teaching groups, close guidance and a broad co-curricular programme are intended to help students leave Southgate not only with qualifications, but with resilience, compassion and the confidence to contribute to their communities."),
    ],
  },
  {
    slug: "leadership-for-our-founding-year",
    title: "Leadership for Our Founding Year",
    summary: "Academic expertise, pastoral care and faith guide the school’s founding approach.",
    image: leadershipImg,
    imageAlt: "Illustrative students taking part in a library discussion",
    blocks: [
      p("A strong school needs leadership that brings academic ambition and pastoral responsibility together. Southgate Senior School’s governance combines Zion Christian Church leadership, experienced educators and community representatives."),
      p("Our teaching approach is designed around the demands of secondary education: a confident transition into Form 1, careful preparation for O-Level and IGCSE, and specialist mentoring through Sixth Form. Teachers, tutors and house parents work together to support both learning and wellbeing."),
      { type: "pending", text: "Named leadership profiles and the Head’s biography will be published once confirmed for Southgate Senior School." },
    ],
  },
  {
    slug: "campus-designed-for-secondary-learning",
    title: "A Campus Designed for Secondary Learning",
    summary: "Classrooms, practical learning and spaces for study, faith and a full school life.",
    image: campusImg,
    imageAlt: "Illustrative school campus with classrooms and landscaped grounds",
    blocks: [
      p("Southgate’s campus vision brings learning, faith and community onto the same ground. For our senior-school students, that means spaces suited to the changing needs of young people throughout their senior school education."),
      list(["Well-resourced classrooms, science laboratories and ICT facilities", "Library and supervised study spaces for independent learning", "Boarding houses, dining facilities and spaces to relax", "Sports fields and courts, alongside arts and music spaces", "Working agricultural land for hands-on learning and stewardship"]),
      p("Sustainability is part of the school’s values rather than a separate activity. Our agricultural programme connects classroom learning with responsibility for land, resources and the wider community."),
      { type: "pending", text: "Verified construction milestones, campus photographs and visit arrangements will be shared when confirmed for the senior school." },
    ],
  },
];

export const sections: Section[] = [
  {
    slug: "about",
    title: "About Us",
    navTitle: "About",
    theme: "about",
    intro:
      "A new private institution established under the guidance of the Zion Christian Church, combining academic excellence with strong moral and spiritual foundations.",
    image: campusImg,
    imageAlt: "Illustrative modern school campus at sunset with lawns and trees",
    pages: [
      {
        slug: "our-history",
        title: "Our History",
        summary: "A new school, carefully planned from curriculum to campus, opening in January 2027.",
        image: campusImg,
        imageAlt: "Illustrative school campus buildings at golden hour",
        blocks: [
          p("Southgate Senior School is a new private institution established under the guidance of the Zion Christian Church, created to meet a growing need for a secondary school that combines academic excellence with strong moral and spiritual foundations. We open our doors to our first students in January 2027, with a campus and programme designed from the ground up to support students through every stage of senior school."),
          p("The idea for Southgate was born from a simple observation: that families in Zimbabwe and across the region deserve a school offering the very best of both worlds, an education recognised internationally, and a character formed by deep rooted faith and community values. Backed by the resources and vision of the Zion Christian Church, Southgate has been carefully planned from its curriculum to its campus, ensuring that when our doors open in January 2027, every element is ready to support our founding students."),
        ],
      },
      {
        slug: "mission-and-values",
        title: "Mission & Values",
        summary: "Excellence, integrity, faith, community and stewardship guide everything we do.",
        image: leadershipImg,
        imageAlt: "Illustrative students in discussion around a library table",
        blocks: [
          p("Our mission is to nurture confident, capable and grounded young people who excel academically and carry strong values into university, careers and adult life. Everything we do is guided by:"),
          {
            type: "values",
            items: [
              { title: "Excellence", text: "In the classroom, on the field and in character. We hold every student, teacher and leader to the highest standard, believing excellence is a habit built through consistent effort and encouragement." },
              { title: "Integrity", text: "Honesty and accountability in all we do. We teach our students to do what is right, especially when no one is watching." },
              { title: "Faith", text: "A life shaped by the values of the Zion Christian Church, providing a moral compass that guides decision making and character." },
              { title: "Community", text: "Belonging, respect and care for one another, built through shared traditions, teamwork and mutual support." },
              { title: "Stewardship", text: "Responsibility toward people, land and resources, reflected daily in our agricultural programme and our approach to sustainability." },
            ],
          },
        ],
      },
      {
        slug: "our-zcc-foundation",
        title: "Our ZCC Foundation",
        summary: "Proudly affiliated with the Zion Christian Church and its wider community of faith.",
        image: choirImg,
        imageAlt: "Illustrative school choir singing together in a bright hall",
        blocks: [
          p("Southgate Senior School is proudly affiliated with the Zion Christian Church, one of the largest and most respected church communities in the region. This affiliation shapes our ethos of discipline, humility and service, and connects our students to a wider community of faith that extends well beyond the school gates."),
          p("This foundation gives Southgate more than a set of values, it gives our students access to a vast network of fellowship, mentorship and support that stretches across Zimbabwe and beyond. Church leaders, congregants and alumni form an extended family around our school, reinforcing the lessons taught in the classroom with lived examples of faith, discipline and service."),
        ],
      },
      {
        slug: "heads-welcome",
        title: "Head’s Welcome",
        summary: "A warm welcome to the Southgate Senior School community.",
        image: heroGates,
        imageAlt: "Illustrative students walking through open school gates",
        blocks: [
          {
            type: "quote",
            text: [
              "A warm welcome to the Southgate Senior School community. As we prepare to open our doors in January 2027, we are building more than a school: we are building a home for learning, faith and character. We look forward to walking this journey with every family who joins us, from a student’s first day at Southgate to graduation, ready for what comes next.",
              "Our founding team has been carefully assembled: not only for academic expertise, but for a genuine commitment to guiding young people through the demands and opportunities of adolescence. We are excited to welcome our first families and to build, together, a school culture that will be treasured for generations.",
            ],
            cite: "The Head of School",
          },
          { type: "pending", text: "The Head of School’s biography will be added." },
        ],
      },
      {
        slug: "governance-and-leadership",
        title: "Governance & Leadership",
        summary: "A board of church leadership, experienced educators and community representatives.",
        image: leadershipImg,
        imageAlt: "Illustrative student leader speaking to peers",
        blocks: [
          p("Southgate Senior School is governed by a board comprising Zion Christian Church leadership, experienced educators and community representatives, ensuring the school is guided by both spiritual conviction and sound educational practice."),
          p("This structure ensures that major decisions, from curriculum direction to campus development, are made with both spiritual integrity and educational excellence in mind. Regular board oversight, combined with a hands on senior leadership team, keeps the school accountable to its founding mission as it grows."),
        ],
      },
      {
        slug: "accreditation-and-affiliations",
        title: "Accreditation & Affiliations",
        summary: "Registered for ZIMSEC and in the process of formal Cambridge affiliation.",
        image: academicsImg,
        imageAlt: "Illustrative teacher guiding students in a classroom",
        blocks: [
          p("Southgate Senior School is registered to deliver the ZIMSEC curriculum and is in the process of formal affiliation with Cambridge Assessment International Education, reflecting our commitment to internationally recognised standards of teaching and learning."),
          p("We are committed to meeting and exceeding the requirements of both examining bodies, and to pursuing further affiliations with recognised regional and international schools’ associations as Southgate establishes its track record."),
        ],
      },
      {
        slug: "campus-and-facilities",
        title: "Campus & Facilities",
        summary: "Every space designed to be safe, stimulating and suited to young people.",
        image: campusImg,
        imageAlt: "Illustrative school campus with lawns and modern buildings",
        blocks: [
          p("Our campus has been designed to support learning both inside and outside the classroom, with every space built to be safe, stimulating and suited to the needs of young people:"),
          list([
            "Modern, digitised and well resourced classrooms for senior school students",
            "Science laboratories and ICT facilities to support practical and coursework requirements",
            "Library and supervised study spaces",
            "Boarding houses with homelike common areas and dining facilities",
            "Multipurpose sports fields and courts",
            "Dedicated arts, music and drama spaces",
            "Working agricultural land for fruit, crop and livestock programmes",
            "A dining hall serving nutritious, wholesome meals",
          ]),
          p("Every space on campus has been designed with students in mind: safe, stimulating and built to support both focused study and healthy, active recreation."),
        ],
      },
    ],
  },
  {
    slug: "academics",
    title: "Academics",
    navTitle: "Academics",
    theme: "academics",
    intro:
      "A dual ZIMSEC and Cambridge senior school education, built on small classes, individual attention and a genuine love of learning.",
    image: academicsImg,
    imageAlt: "Illustrative teacher working with a small group of students",
    pages: [
      {
        slug: "curriculum-overview",
        title: "Curriculum Overview",
        summary: "ZIMSEC and Cambridge pathways, side by side.",
        image: academicsImg,
        imageAlt: "Illustrative classroom with students and teacher",
        blocks: [
          p("Southgate Senior School offers a dual curriculum senior school education, preparing students for both the ZIMSEC and Cambridge examination pathways. This gives families genuine flexibility, a strong local grounding alongside a globally recognised qualification, taught by an experienced and diverse team of educators recruited specifically for their expertise across both systems."),
          p("Our teaching philosophy centres on small class sizes, individual attention and a genuine love of learning. Rather than teaching to a test, our educators are trained to nurture curiosity, critical thinking and confidence, the foundations that carry students successfully through both ZIMSEC and Cambridge assessments and on to university and beyond."),
          p("Students and their families are supported in choosing the pathway and subject combinations best suited to each student’s strengths, interests and future plans, with guidance from teachers and our careers programme at each key decision point."),
        ],
      },
      {
        slug: "lower-secondary",
        title: "Lower Secondary (Forms 1 and 2)",
        summary: "A broad, balanced curriculum and a confident transition from primary school.",
        image: scienceImg,
        imageAlt: "Illustrative students using microscopes in a science lab",
        blocks: [
          p("Form 1 and Form 2 students settle into senior school life with a broad, balanced curriculum that builds strong foundations in mathematics, languages, sciences, humanities and the creative arts, while developing the independence and study habits that senior school demands."),
          p("Under the guidance of specialist subject teachers, students are encouraged to ask questions, take initiative and begin to explore the subjects they enjoy most. Tutors and house parents give particular attention to helping new students transition from primary school with confidence, whether as day students or boarders."),
        ],
      },
      {
        slug: "upper-secondary",
        title: "Upper Secondary: O-Level and IGCSE (Forms 3 and 4)",
        summary: "Rigorous preparation for ZIMSEC O-Level and Cambridge IGCSE.",
        image: leadershipImg,
        imageAlt: "Illustrative students studying together in a library",
        blocks: [
          p("In Forms 3 and 4, students prepare rigorously for their ZIMSEC O-Level and Cambridge IGCSE examinations. A strong core of subjects is combined with a choice of electives, giving every student both depth and breadth."),
          p("Regular assessment, structured revision programmes and supervised prep time, particularly valuable for our boarders, ensure students are well prepared for their examinations and clear about their options for A-Level study or other pathways beyond Form 4."),
        ],
      },
      {
        slug: "sixth-form",
        title: "Sixth Form: A-Level (Forms 5 and 6)",
        summary: "Specialist study, independence and leadership ahead of university.",
        image: leadershipImg,
        imageAlt: "Illustrative senior student leading a discussion",
        blocks: [
          p("Our Sixth Form offers students the opportunity to specialise, preparing for ZIMSEC A-Level and Cambridge AS and A-Level qualifications. Smaller teaching groups, greater independence and closer academic mentoring prepare students for the demands of university study."),
          p("Sixth Form students take on leadership responsibilities across the school, mentoring younger students, leading clubs and societies, and representing Southgate in sport, the arts and our agricultural programme, building the confidence and character needed for life after school."),
        ],
      },
      {
        slug: "subject-areas",
        title: "Subject Areas",
        summary: "The core areas for O-Level, IGCSE and A-Level, taught by specialists.",
        image: scienceImg,
        imageAlt: "Illustrative science lesson with microscopes",
        blocks: [
          p("Our subject offering spans the core areas needed for success at O-Level, IGCSE and A-Level, delivered by specialist teachers:"),
          list([
            "Mathematics and the sciences",
            "English and other languages",
            "Humanities and social sciences",
            "Commercial and business subjects",
            "Computer science and technology",
            "Creative and performing arts",
          ]),
          { type: "pending", text: "The full list of subjects available at each level will be published ahead of our January 2027 opening." },
        ],
      },
      {
        slug: "careers-guidance",
        title: "Careers Guidance & University Pathways",
        summary: "Structured guidance on subjects, universities and careers from Form 3.",
        image: admissionsImg,
        imageAlt: "Illustrative family speaking with a school advisor",
        blocks: [
          p("From Form 3 onward, students receive structured guidance on subject choices, university applications and career options. Our aim is to help every student understand the routes open to them, in Zimbabwe, across the region and internationally, and to make informed decisions about their futures."),
          p("Activities will include career talks, mentoring from members of our wider church and school community, support with university and scholarship applications, and preparation for interviews and entrance requirements."),
        ],
      },
      {
        slug: "co-curricular-programme",
        title: "Co-Curricular Programme",
        summary: "Clubs, sport, the arts and agricultural learning every term.",
        image: sportImg,
        imageAlt: "Illustrative students playing football and netball",
        blocks: [
          p("Beyond the classroom, students engage in a structured programme of clubs, sport, the arts and agricultural learning, designed to build well rounded, capable young people ready to lead."),
          p("Every student participates in at least one club, one sporting code and one aspect of our agricultural programme each term, ensuring a genuinely well rounded experience rather than a narrow academic focus."),
        ],
      },
      {
        slug: "academic-results",
        title: "Academic Results",
        summary: "How a new school measures progress, academic and personal.",
        image: academicsImg,
        imageAlt: "Illustrative teacher supporting students",
        blocks: [
          p("As a newly established school, Southgate Senior School is built around small class sizes, an experienced faculty and a rigorous dual curriculum standard, giving every student the individual attention needed to thrive academically from day one."),
          p("We measure success not only in examination outcomes, but in the confidence, curiosity and character our students carry forward. Regular assessment, detailed reporting to parents, and close teacher student relationships ensure that progress, academic and personal, is tracked and celebrated every step of the way."),
          { type: "pending", text: "As a new school opening in January 2027, Southgate does not yet have examination results to publish." },
        ],
      },
      {
        slug: "learning-support",
        title: "Learning Support",
        summary: "Dedicated staff helping every student learn in their own way.",
        image: leadershipImg,
        imageAlt: "Illustrative small group learning session",
        blocks: [
          p("We recognise that every student learns differently. Our teaching team includes dedicated learning support staff who work closely with classroom teachers to identify and support each student’s individual needs."),
          p("From tailored learning plans to small group intervention, examination access arrangements where appropriate, and close collaboration with parents, our approach ensures that every student, regardless of learning style or pace, is given the tools to succeed."),
        ],
      },
    ],
  },
  {
    slug: "admissions",
    title: "Admissions",
    navTitle: "Admissions",
    theme: "admissions",
    intro:
      "A simple, guided process ahead of our January 2027 opening, with dedicated support for local, regional and international families.",
    image: admissionsImg,
    imageAlt: "Illustrative family welcomed at a school admissions desk",
    pages: [
      {
        slug: "how-to-apply",
        title: "How to Apply",
        summary: "Four guided steps from application to registration.",
        image: admissionsImg,
        imageAlt: "Illustrative admissions conversation at reception",
        blocks: [
          p("Joining Southgate Senior School follows a simple, guided process ahead of our January 2027 opening:"),
          {
            type: "steps",
            items: [
              "Complete and submit the formal application form, along with required documents",
              "Attend an academic assessment and family interview",
              "Receive your offer of a place",
              "Confirm enrolment and complete registration ahead of the January 2027 opening",
            ],
          },
          p("Our admissions team is available throughout the process to answer questions, arrange campus visits where possible, and support families relocating from further afield."),
          { type: "form", form: "enquiry", category: "admissions" },
        ],
      },
      {
        slug: "entry-requirements",
        title: "Entry Requirements",
        summary: "Main entry points at Form 1 and Form 5, with other forms subject to availability.",
        image: academicsImg,
        imageAlt: "Illustrative students in class",
        blocks: [
          p("Applicants are assessed through academic evaluation and a family interview, alongside a review of previous school reports. We welcome enquiries from families located regionally or internationally."),
          p("Our main points of entry are Form 1, for students completing primary school, and Form 5, for students progressing to A-Level study. Form 1 applicants are assessed on literacy, numeracy and general readiness for secondary education. Form 5 applicants are considered on the basis of their O-Level or IGCSE results and the subject requirements of their chosen A-Level combination. Applications for other forms are welcome, subject to availability, and are assessed for suitability for the relevant year group and curriculum pathway."),
        ],
      },
      {
        slug: "fees-and-payment-plans",
        title: "Fees & Payment Plans",
        summary: "Separate day and boarding fees, with flexible payment plans.",
        image: campusImg,
        imageAlt: "Illustrative school campus",
        blocks: [
          p("Southgate Senior School offers separate fee structures for day and boarding students, with flexible payment plan options available. A detailed fee schedule is provided directly to families upon enquiry."),
          p("Fees are structured to reflect the premium nature of our facilities, teaching and boarding provision, while flexible termly and annual payment options help families plan with confidence. A comprehensive breakdown, covering tuition, boarding, meals, examination entry and cocurricular activities, is shared directly with every applying family."),
          { type: "form", form: "enquiry", category: "admissions" },
        ],
      },
      {
        slug: "scholarships-and-bursaries",
        title: "Scholarships & Bursaries",
        summary: "Merit based scholarships and needs based bursaries each year.",
        image: leadershipImg,
        imageAlt: "Illustrative student presenting to peers",
        blocks: [
          p("A limited number of merit based scholarships and needs based bursaries are available each year, reflecting our commitment to making a Southgate education accessible to deserving students within our community."),
          p("Applications for scholarships and bursaries are considered as part of the standard admissions process, and families are encouraged to indicate their interest at the point of application. Our aim is to ensure that a Southgate education remains accessible to talented and deserving students from a range of backgrounds."),
        ],
      },
      {
        slug: "term-dates",
        title: "Term Dates & Calendar",
        summary: "A three term year, beginning in January 2027.",
        image: agricultureImg,
        imageAlt: "Illustrative students harvesting crops",
        blocks: [
          p("Southgate Senior School follows a three term academic year, with our first term commencing in January 2027. A full calendar of term dates and school holidays will be published closer to opening."),
          p("Each term combines focused academic study with key events, such as assessments, examination preparation, sporting fixtures, cultural performances and agricultural milestones like planting and harvest activities, giving families a clear rhythm to the school year."),
          { type: "pending", text: "Exact term dates and holidays have not yet been published." },
        ],
      },
      {
        slug: "international-and-boarding-families",
        title: "International & Boarding Families",
        summary: "Dedicated support for families from across the region and abroad.",
        image: boardingImg,
        imageAlt: "Illustrative boarding house common room",
        blocks: [
          p("We welcome families located from across the region and abroad. Our admissions team provides dedicated support for international applications, and our premium boarding facilities, with a maximum of four students per room, offer a comfortable, closely supervised home for students during the school week."),
          p("We understand that relocating a young person to a new school and country is a significant decision. Our team offers guidance on documentation, orientation support ahead of the first term, and a dedicated point of contact throughout the admissions journey: ensuring boarding and international families feel confident and welcomed from their very first enquiry."),
          { type: "form", form: "enquiry", category: "boarding" },
        ],
      },
      {
        slug: "faqs",
        title: "FAQs",
        summary: "Answers to the questions families ask most.",
        image: admissionsImg,
        imageAlt: "Illustrative family at an admissions desk",
        blocks: [
          {
            type: "faq",
            items: [
              { q: "When does the school open?", a: "Our first intake begins in January 2027." },
              { q: "Which forms does Southgate Senior School cater for?", a: "We offer secondary education through to A-Level." },
              { q: "Which curricula do you offer?", a: "Both ZIMSEC and Cambridge, taught side by side by experienced staff." },
              { q: "How do students and families choose between ZIMSEC and Cambridge?", a: "Our teachers and admissions team guide families through the options, taking into account each student’s strengths, interests and future plans, including university and career goals." },
              { q: "Do you offer boarding?", a: "Yes — premium weekly boarding, with a maximum of four students per room." },
              { q: "Is Southgate affiliated with a church?", a: "Yes, the school is proudly affiliated with the Zion Christian Church." },
              { q: "How do I apply?", a: "Begin with an enquiry through our Admissions page — our team will guide you through the full process." },
              { q: "What is the class size at Southgate?", a: "We maintain small class sizes (up to 20 students per class) to ensure every student receives close individual attention from our teachers." },
              { q: "Can day students later transition to boarding, or vice versa?", a: "Yes, families can discuss transitioning between day and boarding arrangements with our admissions team as circumstances change." },
              { q: "Can my child join in Form 5 from another school?", a: "Yes. Form 5 applications are welcome from students with suitable O-Level or IGCSE results. Our admissions team will advise on the subject requirements for your chosen A-Level combination." },
              { q: "What documentation do international families need to apply?", a: "Our admissions team provides a full checklist of required documentation, including prior school records, upon enquiry." },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "student-life",
    title: "Student Life",
    navTitle: "Student Life",
    theme: "life",
    intro:
      "Boarding, sport, the arts, clubs, agriculture and leadership — a full life of growth, care and belonging.",
    image: sportImg,
    imageAlt: "Illustrative students playing sport on school fields",
    pages: [
      {
        slug: "boarding",
        title: "Boarding",
        summary: "Premium weekly boarding, a maximum of four students per room.",
        image: boardingImg,
        imageAlt: "Illustrative boarders relaxing in a common room",
        blocks: [
          p("Southgate Senior School offers premium weekly boarding, giving students a comfortable, closely supervised home during the school week while returning to their families on weekends. Rooms accommodate a maximum of four students, striking a balance between companionship and comfort. Our boarding houses are staffed by dedicated house parents who provide structure, care and a genuine sense of home."),
          p("A typical boarding week includes structured prep and study time, supervised meals, sport and cocurricular activities, and dedicated wind down time in the evenings. For senior students, the routine builds independence and good study habits alongside accountability, with additional supervised study support in examination years. Weekends are reserved for family time, allowing students to enjoy the benefits of boarding during the week while remaining closely connected to home."),
          p("Our house parents are carefully selected for their warmth, experience and commitment to student wellbeing, providing round the clock support and a genuine sense of home away from home."),
          { type: "form", form: "enquiry", category: "boarding" },
        ],
      },
      {
        slug: "sport",
        title: "Sport",
        summary: "Eight sporting codes, interhouse and interschool fixtures.",
        image: sportImg,
        imageAlt: "Illustrative football and netball on school fields",
        blocks: [
          p("Our sports facilities support a broad range of disciplines, encouraging every student, regardless of ability, to participate, compete and develop discipline, teamwork and resilience:"),
          list(["Football", "Rugby", "Netball", "Athletics", "Swimming", "Cricket", "Tennis", "Hockey"]),
          p("Interhouse and interschool fixtures give students the opportunity to compete, build team spirit and represent Southgate with pride. Senior students are encouraged to take on captaincy and coaching support roles, developing leadership alongside their sporting skills."),
        ],
      },
      {
        slug: "arts-and-culture",
        title: "Arts & Culture",
        summary: "Music, drama, visual arts and heritage celebrations.",
        image: choirImg,
        imageAlt: "Illustrative school choir performing",
        blocks: [
          p("From music to drama and visual arts, students are encouraged to explore their creativity and build confidence through performance and expression:"),
          list(["Music lessons and choir", "Drama and school productions", "Visual arts and exhibitions", "Cultural and heritage celebrations"]),
          p("Regular performances and exhibitions give students a platform to share their talents with the school community and beyond."),
        ],
      },
      {
        slug: "clubs-and-societies",
        title: "Clubs & Societies",
        summary: "Debate, chess, coding, conservation, fellowship and more.",
        image: leadershipImg,
        imageAlt: "Illustrative debate club in a library",
        blocks: [
          p("A wide range of clubs gives students the chance to pursue individual interests, build friendships and develop leadership skills outside the formal classroom:"),
          list([
            "Debate and public speaking",
            "Chess",
            "Environmental and conservation club",
            "Faith and fellowship groups",
            "Coding and robotics",
            "Science and mathematics club",
            "Entrepreneurship and business club",
          ]),
          p("New clubs are introduced each term based on student interest, and senior students are encouraged to found and lead clubs of their own, ensuring the programme continues to grow alongside our school community."),
        ],
      },
      {
        slug: "agricultural-programme",
        title: "Agricultural Programme",
        summary: "Orchards, crops and animal husbandry as character education.",
        image: agricultureImg,
        imageAlt: "Illustrative students harvesting vegetables in school gardens",
        blocks: [
          p("A distinctive feature of life at Southgate is our hands on agricultural programme. Students actively participate in growing fruits and crops and caring for livestock as part of our animal husbandry initiative, learning responsibility, sustainability and stewardship of the land, values deeply rooted in our school’s faith based ethos."),
          p("Students rotate through hands on activities across our orchard and crop gardens, learning to plant, tend and harvest a variety of fruits and vegetables. Our animal husbandry initiative introduces students to the responsible care of livestock and poultry, teaching patience, discipline and empathy alongside practical agricultural skills. Senior students take on greater responsibility, leading teams, planning seasonal activities and mentoring younger students."),
          p("Beyond the practical skills gained, the programme is a powerful vehicle for character education, teaching students the value of hard work, delayed gratification and stewardship of the land, values that align closely with our school’s faith based foundation. Produce from the programme also contributes to school meals, giving students a tangible sense of ownership and pride in their contribution to the wider school community."),
        ],
      },
      {
        slug: "student-leadership",
        title: "Student Leadership",
        summary: "Prefects, house leaders, captains and club leaders.",
        image: leadershipImg,
        imageAlt: "Illustrative student leader addressing peers",
        blocks: [
          p("Leadership is learned by doing. Senior students are given real responsibility through a prefect and house leadership system, together with captaincy of sports teams and leadership of clubs and societies, supported and guided by staff."),
          p("These roles build confidence, accountability and service, qualities that prepare students for university, the workplace and life in their communities."),
        ],
      },
      {
        slug: "pastoral-care",
        title: "Pastoral Care",
        summary: "Every student known and cared for, academically, emotionally and spiritually.",
        image: boardingImg,
        imageAlt: "Illustrative students talking in a common room",
        blocks: [
          p("Every student is known and cared for. Our pastoral system, led by house parents, tutors and school leadership, ensures each student’s academic, emotional and spiritual wellbeing is closely supported."),
          p("A dedicated tutor system ensures every student has a trusted adult who monitors their academic progress, emotional wellbeing and personal development throughout their time at Southgate. Our chaplaincy programme further supports students’ spiritual growth alongside their academic and personal journey, and our pastoral team pays particular attention to the pressures of adolescence, examinations and important decisions about the future."),
        ],
      },
      {
        slug: "uniform-and-code-of-conduct",
        title: "Uniform & Code of Conduct",
        summary: "High standards of dress and conduct, rooted in respect.",
        image: heroGates,
        imageAlt: "Illustrative students in uniform at the school gates",
        blocks: [
          p("Southgate Senior School maintains high standards of dress and conduct, reflecting the discipline and pride we instil in every student. Full uniform requirements are provided to enrolled families."),
          p("Our code of conduct is rooted in respect, for oneself, for others and for the school community, and is reinforced consistently across the classroom, boarding houses and cocurricular activities."),
        ],
      },
      {
        slug: "student-wellbeing",
        title: "Student Wellbeing",
        summary: "Pastoral care, faith guidance and a balanced daily routine.",
        image: agricultureImg,
        imageAlt: "Illustrative smiling students working outdoors",
        blocks: [
          p("Student wellbeing sits at the heart of school life. Through pastoral care, faith guidance and a genuine sense of community, we support each student’s development as a confident, grounded individual."),
          p("Access to pastoral staff, health monitoring, nutritious meals and a balanced daily routine of study, activity and rest all contribute to an environment where students can flourish, not just academically, but as whole individuals."),
        ],
      },
    ],
  },
  {
    slug: "news-and-events",
    title: "News & Events",
    navTitle: "News & Events",
    theme: "news",
    intro: "Follow our founding story, admissions updates and vision for Southgate Senior School, alongside the calendar, gallery and newsletters.",
    image: choirImg,
    imageAlt: "Illustrative students singing together",
    pages: [
      {
        slug: "latest-news",
        title: "Latest News",
        summary: newsIntro.summary,
        image: campusImg,
        imageAlt: "Illustrative school campus",
        blocks: [
          p("Follow the founding story of Southgate Senior School as we prepare to welcome students in January 2027. Explore our admissions announcement, meet the vision behind the school and discover how our founding community will take shape."),
          { type: "news" },
        ],
      },
      ...schoolNews,
      {
        slug: "school-calendar",
        title: "School Calendar",
        summary: "Key term dates, events and holidays.",
        image: sportImg,
        imageAlt: "Illustrative sports fixture",
        blocks: [
          p("Key term dates, events and holidays will be published here ahead of the academic year."),
          p("Families can expect a calendar built around key academic, sporting, cultural and agricultural milestones, including Open Days, Sports Day, Speech Day, examination periods and seasonal harvest events, giving the whole school community a shared rhythm throughout the year."),
          { type: "pending", text: "Calendar dates have not yet been published." },
        ],
      },
      {
        slug: "gallery",
        title: "Photo & Video Gallery",
        summary: "A visual look at life at Southgate.",
        image: agricultureImg,
        imageAlt: "Illustrative students in school gardens",
        blocks: [
          p("A visual look at life at Southgate, campus, students and events, will be shared here as our school community grows."),
          p("From classroom moments to sporting fixtures, boarding house life and our agricultural programme in action, this gallery will offer families and prospective students a genuine window into life at Southgate."),
          { type: "pending", text: "Authentic Southgate photography will appear here once the school opens. Images elsewhere on this site are illustrative." },
        ],
      },
      {
        slug: "newsletters",
        title: "Newsletters",
        summary: "Admissions updates, school news and upcoming events.",
        image: admissionsImg,
        imageAlt: "Illustrative family at the school",
        blocks: [
          p("Sign up to receive our regular newsletter, keeping families informed of admissions updates, school news and upcoming events. Our newsletter will feature updates from school leadership, highlights from student life, and important dates for the term ahead, helping families stay closely connected to the Southgate community."),
          { type: "form", form: "newsletter" },
        ],
      },
      {
        slug: "alumni",
        title: "Alumni",
        summary: "A future home for the Southgate alumni community.",
        image: heroGates,
        imageAlt: "Illustrative students walking through the school gates",
        blocks: [
          p("As our founding cohort begins their journey in January 2027, this page will grow into a home for the Southgate alumni community in the years ahead."),
          p("In time, this page will celebrate the achievements of Southgate graduates, share their stories, and provide opportunities for alumni to stay connected, mentor current students, speak at careers events, and give back to the school community that shaped them."),
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact & Portal",
    navTitle: "Contact",
    theme: "contact",
    intro: "We’d love to hear from you. Reach our admissions and school office team, or submit an enquiry.",
    image: campusImg,
    imageAlt: "Illustrative school campus at sunset",
    pages: [
      {
        slug: "contact-us",
        title: "Contact Us",
        summary: "Admissions, boarding, general office and careers enquiries.",
        image: admissionsImg,
        imageAlt: "Illustrative school reception",
        blocks: [
          p("We’d love to hear from you. Reach our admissions and school office team using the details below, or submit an enquiry through our contact form:"),
          list(["Admissions enquiries", "Boarding enquiries", "General school office", "Careers and staff enquiries"]),
          p("Our team aims to respond to all enquiries promptly, and welcomes families to reach out with any questions ahead of applying."),
          { type: "pending", text: "Telephone numbers, email addresses and the postal address are still to be provided. Please use the enquiry form in the meantime." },
          { type: "form", form: "enquiry", category: "general" },
        ],
      },
      {
        slug: "campus-map-and-directions",
        title: "Campus Map & Directions",
        summary: "Location details and directions to campus.",
        image: campusImg,
        imageAlt: "Illustrative campus grounds",
        blocks: [
          p("Find directions and location details for the Southgate Senior School campus here."),
          p("Full address details, a campus map and directions by road will be provided here, along with guidance for families travelling from further afield."),
          { type: "pending", text: "The campus address and map have not yet been provided." },
        ],
      },
      {
        slug: "careers",
        title: "Careers / Vacancies",
        summary: "Join an experienced, diverse team of educators and staff.",
        image: academicsImg,
        imageAlt: "Illustrative teacher with students",
        blocks: [
          p("Southgate Senior School is proud to have recruited an experienced and diverse teaching team ahead of our January 2027 opening. We continue to welcome applications from passionate, qualified educators who share our commitment to excellence and character."),
          p("We are seeking passionate, qualified educators across both the ZIMSEC and Cambridge curricula, including subject specialists for O-Level, IGCSE and A-Level teaching, as well as boarding house parents, sports coaches and support staff who share our commitment to nurturing well rounded, high achieving students. Prospective staff can submit applications and CVs through this page."),
          { type: "form", form: "careers" },
        ],
      },
      {
        slug: "enquiry-form",
        title: "Enquiry Form",
        summary: "Submit your details and our admissions team will be in touch.",
        image: admissionsImg,
        imageAlt: "Illustrative admissions welcome",
        blocks: [
          p("Interested in joining the Southgate community? Submit your details below and our admissions team will be in touch."),
          p("Once submitted, a member of our admissions team will be in touch within two working days to answer your questions and guide you through next steps."),
          { type: "form", form: "enquiry", category: "admissions" },
        ],
      },
    ],
  },
];

export function findSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}
export function findPage(sectionSlug: string, pageSlug: string) {
  const section = findSection(sectionSlug);
  const page = section?.pages.find((pg) => pg.slug === pageSlug);
  return section && page ? { section, page } : undefined;
}
