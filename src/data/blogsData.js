const blogMainHeaderImg = "/assets/images/Blogs/header-blog-main.jpg";
const trend1 = "/assets/images/Blogs/trend-1.jpg";
const trend2 = "/assets/images/Blogs/trend-2.jpg";
const trend3 = "/assets/images/Blogs/trend-3.jpg";
const trend4 = "/assets/images/Blogs/trend-4.jpg";

const blogsData = {
  // Available blog categories
  categories: ["All", "Trending", "Business", "Top Salary", "Editor's Choice"],

  // Featured post for main banner
  mainFeature: {
    id: "new-york-study-abroad",
    title: "Is New York the Right Place To Study Abroad?",
    featuredImage: blogMainHeaderImg,
    excerpt:
      "It is a daunting experience for newcomers; however, it doesn't have to be. Here are four tips to enhance your enjoyment of the experience and productively utilize all your precious time.",
  },

  // All blog posts
  posts: [
    {
      id: "new-york-guide",
      title:
        "Discover the Excitement of New York: A Guide for International Students",
      date: "Mar 23, 2025",
      views: 432,
      comments: 34,
      category: ["All", "Trending", "Editor's Choice", "Business"],
      excerpt:
        "New York City offers international students a unique blend of academic excellence and cultural diversity. Explore what makes NYC an ideal destination for study abroad programs.",
      featuredImage: trend1,
      content: {
        heading:
          "Discover the Excitement of New York: A Guide for International Students",
        intro:
          'New York City, often called "The Big Apple," is one of the most vibrant and diverse cities in the world. For international students considering study abroad options, New York presents an unparalleled opportunity to experience American education while being immersed in a global cultural hub.',
        sections: [
          {
            title: "Academic Excellence",
            text: "New York is home to some of the most prestigious educational institutions in the United States. From Columbia University and New York University to The City University of New York (CUNY) system, students have access to world-class education across various disciplines.",
          },
          {
            title: "Cultural Diversity",
            text: "With residents from virtually every country in the world, New York offers international students a comfortable multicultural environment. You'll find neighborhoods like Little Italy, Chinatown, and Little India where you can connect with familiar cultures while experiencing new ones.",
          },
          {
            title: "Career Opportunities",
            text: "As a global center for finance, arts, technology, and media, New York provides unmatched internship and networking opportunities. Many students find that their New York education opens doors to careers both in the United States and internationally.",
          },
          {
            title: "Student Life",
            text: "From museums and theaters to parks and restaurants, New York offers endless opportunities for exploration outside the classroom. The city's comprehensive public transportation system makes it easy to navigate, and many institutions offer student discounts for various attractions.",
          },
          {
            title: "Practical Considerations",
            text: "While New York is undeniably exciting, it's also one of the most expensive cities in the U.S. Students should carefully consider housing options, which can range from on-campus dormitories to shared apartments in more affordable neighborhoods like Brooklyn or Queens.",
          },
          {
            title: "Getting Started",
            text: "If you're considering New York for your study abroad experience, Skillang can help with university applications, visa procedures, housing options, and cultural adaptation. Our specialized counselors understand the unique challenges and opportunities of studying in New York City.",
          },
        ],
        conclusion:
          "Contact us today to begin your New York study abroad journey!",
      },
    },
    {
      id: "new-york-adventure",
      title: "Experience New York: The Ultimate Study Abroad Adventure",
      date: "Mar 23, 2025",
      views: 432,
      comments: 34,
      category: ["All", "Trending", "Editor's Choice"],
      excerpt:
        "Embark on an educational adventure in the city that never sleeps. Discover how studying in New York can transform your academic journey and personal growth.",
      featuredImage: trend2,
      content: {
        heading: "Experience New York: The Ultimate Study Abroad Adventure",
        intro:
          "Studying abroad in New York City offers an educational experience unlike any other. Beyond the classroom, the city itself becomes a laboratory for learning, personal growth, and cultural exchange.",
        sections: [
          {
            title: "Learning Beyond the Classroom",
            text: "In New York, education extends far beyond traditional lectures. Museums like the Metropolitan Museum of Art and the American Museum of Natural History serve as extensions of your classroom. Business students can observe Wall Street firsthand, while arts students have Broadway as their campus.",
          },
          {
            title: "A Global Network",
            text: "The connections you make in New York span the globe. Your classmates and professors will represent diverse backgrounds and perspectives, creating a rich learning environment and establishing a professional network that can benefit your career for years to come.",
          },
          {
            title: "Personal Growth",
            text: "Living in New York challenges you to become more independent, adaptable, and confident. Navigating this fast-paced environment helps develop problem-solving skills and resilience that employers value highly.",
          },
          {
            title: "Cultural Immersion",
            text: "From Broadway shows to street performances, from high-end restaurants to food trucks, New York offers endless opportunities to immerse yourself in American culture while celebrating global diversity.",
          },
          {
            title: "Preparing for Your Adventure",
            text: "Skillang offers comprehensive support for students planning to study in New York.",
          },
        ],
        bulletPoints: [
          "University selection and application guidance",
          "Visa application support",
          "Housing assistance",
          "Pre-departure orientation",
          "On-ground support services",
        ],
        conclusion:
          "Let us help you turn your New York study abroad dreams into reality!",
      },
    },
    {
      id: "new-york-culture",
      title:
        "Studying Abroad in New York: Your Gateway to Culture and Learning",
      date: "Mar 23, 2025",
      views: 432,
      comments: 34,
      category: ["All", "Trending", "Editor's Choice"],
      excerpt:
        "New York City's rich cultural landscape provides international students with unique opportunities for both academic and personal growth.",
      featuredImage: trend3,
      content: {
        heading:
          "Studying Abroad in New York: Your Gateway to Culture and Learning",
        intro:
          "New York City stands as a global crossroads where cultures, ideas, and opportunities converge. For international students, this dynamic environment creates the perfect backdrop for meaningful academic and personal development.",
        sections: [
          {
            title: "Educational Excellence",
            text: "New York houses over 100 colleges and universities, including Ivy League institutions, specialized art schools, and comprehensive research universities. This educational ecosystem offers programs in virtually every field, taught by leading experts and practitioners.",
          },
          {
            title: "Cultural Exploration",
            text: "With over 800 languages spoken across its five boroughs, New York is truly a global city. International students often find communities from their home countries while also exploring new cultural experiences through festivals, neighborhoods, and culinary adventures.",
          },
          {
            title: "Professional Development",
            text: "Many academic programs in New York incorporate internships and practical experiences with leading organizations. These opportunities allow students to build professional portfolios before graduation and establish valuable industry connections.",
          },
          {
            title: "City as Classroom",
            text: "From the United Nations headquarters to Wall Street, from Lincoln Center to Silicon Alley, New York's institutions and industries provide living case studies for academic concepts. Many courses incorporate field trips and guest lectures from industry leaders.",
          },
          {
            title: "Student Support Services",
            text: "Universities in New York typically offer robust support services for international students, including specialized orientation programs, visa assistance, language support, and cultural adjustment resources.",
          },
          {
            title: "How Skillang Can Help",
            text: "Our team includes advisors who have studied and worked in New York, providing insider knowledge to help you navigate your educational journey in this vibrant city.",
          },
        ],
      },
    },
    {
      id: "new-york-student-guide",
      title: "New York Awaits: A Student's Guide to Exploring the City",
      date: "Mar 23, 2025",
      views: 3000,
      comments: 874,
      category: ["All", "Top Salary"],
      excerpt:
        "Make the most of your study abroad experience with our comprehensive guide to exploring New York City as an international student.",
      featuredImage: trend4,
      content: {
        heading: "New York Awaits: A Student's Guide to Exploring the City",
        intro:
          "As an international student in New York, you have one of the world's most exciting cities at your fingertips. This guide will help you navigate the city like a local while making the most of your academic experience.",
        sections: [
          {
            title: "Neighborhood Guide",
            text: "Each of New York's neighborhoods offers a unique experience:",
          },
        ],
        neighborhoodList: [
          {
            name: "Manhattan",
            description:
              "The heart of NYC with iconic landmarks, museums, and commercial districts",
          },
          {
            name: "Brooklyn",
            description:
              "Known for its cultural diversity, art scene, and trendy neighborhoods",
          },
          {
            name: "Queens",
            description: "The most ethnically diverse urban area in the world",
          },
          {
            name: "The Bronx",
            description: "Home to the Yankee Stadium and the Bronx Zoo",
          },
          {
            name: "Staten Island",
            description: "The most suburban borough with beautiful parks",
          },
        ],
        sections2: [
          {
            title: "Transportation Tips",
            text: "The New York subway system operates 24/7 and can take you virtually anywhere in the city. Get a student MetroCard for discounted fares, and download apps like Citymapper or Transit to navigate the system effortlessly.",
          },
          {
            title: "Budget-Friendly Activities",
            text: "New York doesn't have to break the bank:",
          },
        ],
        activitiesList: [
          "Many museums offer free admission on specific days",
          "Explore Central Park, High Line, and other public spaces",
          "Take advantage of student discounts for Broadway shows",
          "Join free walking tours to learn about the city's history",
        ],
        sections3: [
          {
            title: "Academic Resources",
            text: "Beyond your university, take advantage of New York's public libraries, including the magnificent New York Public Library on Fifth Avenue. Many offer quiet study spaces, free Wi-Fi, and research resources.",
          },
          {
            title: "Networking Opportunities",
            text: "New York's professional scene offers countless networking events for students. Look for industry meetups, conferences, and workshops related to your field of study.",
          },
          {
            title: "Safety First",
            text: "While New York is generally safe for students, always stay aware of your surroundings, especially when exploring new areas or traveling late at night. Most universities offer safety escort services for students.",
          },
        ],
        conclusion:
          "With proper planning and an adventurous spirit, your New York study experience will be both academically rewarding and personally transformative!",
      },
    },
    {
      id: "new-york-study-abroad",
      title: "Is New York the Right Place To Study Abroad?",
      date: "Mar 23, 2025",
      views: 2323,
      comments: 9,
      category: ["All", "Business", "Top Salary"],
      keywords: ["New York", "USA", "Student", "Study Abroad", "University"],
      excerpt:
        "It is a daunting experience for newcomers; however, it doesn't have to be. Here are four tips to enhance your enjoyment of the experience and productively utilize all your precious time.",
      featuredImage: blogMainHeaderImg,
      content: {
        heading: "Is New York the Right Place To Study Abroad?",
        imageCaption: "source: unsplash",
        intro:
          "It is a daunting experience for newcomers; however, it doesn't have to be. Here are four tips to enhance your enjoyment of the experience and productively utilize all your precious time.",
        sections: [
          {
            title: "Enjoy New York From Out of Town",
            text: "The city is well-known because of its excitement, vitality, and excitement, but going abroad to study in New York gives you a chance to understand New York's different aspects. Bot misperceptions put aside, New York is a fascinating place to visit. Reviews of the city frequently paint a picture of the city's blight and continuous commercial activity. However, amid all this bustle is a great chance to experience the real essence of the city. From Chinatown from Chinatown to Central Park to the Statue of Liberty, The city reflects a positive image of its own for visitors who take a moment to reflect not only on what's going on within their own homes however but also on the larger view of the globe as a whole.",
          },
          {
            title: "summary",
            text: "Therefore, New York is an ideal location for students of art who study abroad, not just because of its fascinating and intricate urban landscape but due to the numerous ways this fantastically designed city can be explored.",
          },
          {
            title: "Join in on The Chic verse",
            text: "If you are travelling abroad to New York, any student who wishes to immerse themselves amid the city's vibrant social scene should include the district of Midtown in their plans. The midtown area has a completely different style of life than any other city. It is the ideal place to visit to experience an experience of the cosmopolitan scene, which is popular across the globe. A stroll through the middle of town can provide a fascinating understanding of the genesis that led to the American melting pan, where various cultures from all over the globe have joined forces to create a distinct landscape in the middle of the city. Students can walk through this melting pot of different styles and discover an echo of the communities which have come to depend on each other and get to know one another through these diverse experiences.",
          },
          // {
          //   title: "Lost in Your University Search?",
          //   text: "Let Us Guide You to Your Ideal Destination!",
          //   callToAction: "Book a Free Consultation",
          // },
          {
            title: "Explore the city's fantastic art scene",
            text: "Students who study abroad will discover they have more opportunities to get involved with the New York art scene once they have a close relationship with it. Many emerging artists frequently exhibit their new and experimental collections of work in exhibitions and galleries throughout the city. With the variety of art forms with such a variety students constantly want more. That sensation of curiosity and excitement frequently leads to more creativity and inspiration.",
          },
        ],
        comments: [
          {
            author: "Purnima Randhawa",
            comment: "This is a really inspirational journey 👏👏",
            likes: 23,
            timestamp: "Yesterday at 5:58 PM",
          },
          {
            author: "Mayank Yadav",
            comment:
              "Hello Team, how can I get a similar course on your website? Do I have to visit your office or can I find some link on your website?",
            likes: 8,
            timestamp: "Jan 21, 2025 at 2:13 PM",
            replies: 2,
          },
        ],
      },
    },
  ],
};

export default blogsData;
