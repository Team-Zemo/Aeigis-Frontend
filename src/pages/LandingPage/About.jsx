function About() {

  const about = [
    {source:"/yadveer.jpeg", name:"Yadveer Singh Pawar", role:"Frontend Lead", github:"https://github.com/Yadveer1", linkedin:"https://www.linkedin.com/in/yadveersingh/"},
    {source:"/ratan.jpg", name:"Ratan Tiwari", role:"blank", github:"https://github.com/Yadveer1", linkedin:"https://www.linkedin.com/in/yadveersingh/"},
    {source:"/surendra.jpg", name:"Surendra Singh Chouhan", role:"blank", github:"https://github.com/Yadveer1", linkedin:"https://www.linkedin.com/in/yadveersingh/"},
    {source:"/uday.jpg", name:"Uday Khare", role:"blank", github:"https://github.com/Yadveer1", linkedin:"https://www.linkedin.com/in/yadveersingh/"},
    {source:"/tanishq.png", name:"Tanishq Tiwari", role:"blank", github:"https://github.com/Yadveer1", linkedin:"https://www.linkedin.com/in/yadveersingh/"}
  ]
  return(
    <>
    <section class="mb-10 bg-white dark:bg-transparent">
  <div class=" py-6 px-4 mx-auto max-w-screen-xl text-center lg:px-6">
      <div class=" mx-auto mb-8 max-w-screen lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">Our team</h2>
          <p class="font-light text-black-500 sm:text-xl dark:text-black-400">Our team is a passionate group of engineers, designers, and innovators dedicated to building secure, ethical, and user-friendly AI solutions. With diverse backgrounds in cybersecurity, software development, and data science, we work collaboratively to deliver reliable products that empower organizations to use AI safely and responsibly. Our commitment to transparency, continuous improvement, and customer success drives everything we do.</p>
      </div> 
      <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {about.map((about) => {
          return(
            <div class="text-center text-gray-500 dark:text-gray-400">
              <img class="mx-auto mb-4 w-50 h-50 rounded-full" src={about.source} alt={about.name}/>
              <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  <a href="#">{about.name}</a>
              </h3>
              <p className="text-black">{about.role}</p>
              <ul class="flex justify-center mt-4 space-x-4">
                  <li>
                      <a href={`${about.github}`} class="text-gray-900 hover:text-gray-900 dark:hover:text-gray-200 dark:text-black-300">
                          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                      </a>
                  </li>
                  <li>
                      <a href={`${about.linkedin}`} class="text-gray-900 hover:text-gray-900 dark:hover:text-gray-200 dark:text-black-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 72 72"
                            fill="none">
                            <path
                            d="M24.7612 55.999V28.3354H15.5433V55.999H24.7621H24.7612ZM20.1542 24.5591C23.3679 24.5591 25.3687 22.4348 25.3687 19.7801C25.3086 17.065 23.3679 15 20.2153 15C17.0605 15 15 17.065 15 19.7799C15 22.4346 17.0001 24.5588 20.0938 24.5588H20.1534L20.1542 24.5591ZM29.8633 55.999H39.0805V40.5521C39.0805 39.7264 39.1406 38.8985 39.3841 38.3088C40.0502 36.6562 41.5668 34.9455 44.1138 34.9455C47.4484 34.9455 48.7831 37.4821 48.7831 41.2014V55.999H58V40.1376C58 31.6408 53.4532 27.6869 47.3887 27.6869C42.4167 27.6869 40.233 30.4589 39.0198 32.347H39.0812V28.3364H29.8638C29.9841 30.9316 29.8631 56 29.8631 56L29.8633 55.999Z"
                            fill="#111827" />
                          </svg>
                      </a>
                  </li>
              </ul>
          </div>
          )
          
        })}
                    
      </div>  
  </div>
</section>
    </>
  )
}

export default About;

// import React from 'react';
// import { Box, Grid, Typography, Card, CardContent, Container } from '@mui/material';
// import { theme } from '../../theme.js';
// import Footer from './Footer.jsx';

// const features = [
//   {
//     title: "Preventing Data Leakage",
//     description: "Protective Layer & Filters – All user queries pass through compliance filters before reaching the AI.",
//     icon: "🛡️"
//   },
//   {
//     title: "Real-Time Detection",
//     description: "Risk Detection – Prompt injection defense, pattern recognition, and risk scoring ensure safe queries.",
//     icon: "⚡"
//   },
//   {
//     title: "Ethical AI Use",
//     description: "Policy Enforcement – Admin-defined rules block confidential data access and personal misuse.",
//     icon: "⚖️"
//   },
//   {
//     title: "Employee Misuse Prevention",
//     description: "Employee Accountability – Tracks misuse attempts by user ID, preventing personal exploitation of company AI.",
//     icon: "👥"
//   },
//   {
//     title: "Automatic Mitigation",
//     description: "Real-Time Alerts – Suspicious or repeated misuse attempts trigger instant email notifications to admins.",
//     icon: "🚨"
//   },
//   {
//     title: "Continuous Improvement",
//     description: "Monthly Reports – Visual dashboards & charts summarize misuse attempts and compliance status.",
//     icon: "📈"
//   }
// ];

// const solutions = [
//   {
//     title: "Prompt Injection Defense",
//     description: "Detects and blocks manipulative or malicious queries designed to bypass safeguards."
//   },
//   {
//     title: "Pattern Recognition",
//     description: "Identifies repeated risky behaviors, unusual access attempts, or sensitive keyword patterns."
//   },
//   {
//     title: "Risk Scoring System",
//     description: "Each query is analyzed and given a risk level (Low, Medium, High)."
//   },
//   {
//     title: "Monthly Reports & Dashboards",
//     description: "Visual analytics show blocked queries, misuse attempts, and compliance status."
//   }
// ];

// function About() {
//     return (
//         <Box sx={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
//           <Box sx={{ flex: 1, py: 8 }}>
//             <Container maxWidth="lg">
//               {/* Hero Section */}
//               <Box sx={{ textAlign: 'center', mb: 8 }}>
//                 <Typography 
//                   variant="h2" 
//                   sx={{
//                     fontFamily: theme.typography.fontFamily, 
//                     fontSize: { xs: 40, md: 60, lg: 80 }, 
//                     fontWeight: '700',
//                     mb: 3,
//                     background: 'linear-gradient(45deg, #1fd656ff, #910dfcff)',
//                     backgroundClip: 'text',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent'
//                   }}
//                 >
//                   About Aegis
//                 </Typography>
//                 <Typography 
//                   variant="h5" 
//                   sx={{
//                     fontFamily: theme.typography.fontFamily,
//                     color: theme.colors.fontBody,
//                     maxWidth: '800px',
//                     mx: 'auto',
//                     lineHeight: 1.6
//                   }}
//                 >
//                   Protecting your enterprise AI interactions with advanced security, 
//                   real-time monitoring, and comprehensive compliance solutions.
//                 </Typography>
//               </Box>

//               {/* Core Features Grid */}
//               <Grid container spacing={4} sx={{ mb: 8 }}>
//                 {features.map((feature, index) => (
//                   <Grid item xs={12} md={6} lg={4} key={index}>
//                     <Card 
//                       sx={{ 
//                         height: '100%',
//                         background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
//                         border: `2px solid ${theme.colors.border}`,
//                         borderRadius: 3,
//                         transition: 'all 0.3s ease',
//                         '&:hover': {
//                           transform: 'translateY(-8px)',
//                           boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
//                           borderColor: theme.colors.primary
//                         }
//                       }}
//                     >
//                       <CardContent sx={{ p: 4 }}>
//                         <Typography 
//                           variant="h3" 
//                           sx={{ fontSize: 40, mb: 2, textAlign: 'center' }}
//                         >
//                           {feature.icon}
//                         </Typography>
//                         <Typography 
//                           variant="h6" 
//                           sx={{
//                             fontFamily: theme.typography.fontFamily,
//                             fontWeight: '700',
//                             mb: 2,
//                             color: theme.colors.fontBody,
//                             textAlign: 'center'
//                           }}
//                         >
//                           {feature.title}
//                         </Typography>
//                         <Typography 
//                           variant="body1" 
//                           sx={{
//                             color: theme.colors.fontBodyLight,
//                             lineHeight: 1.6,
//                             textAlign: 'center'
//                           }}
//                         >
//                           {feature.description}
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>

//               {/* Solutions Section */}
//               <Box sx={{ mb: 8 }}>
//                 <Typography 
//                   variant="h3" 
//                   sx={{
//                     fontFamily: theme.typography.fontFamily,
//                     fontSize: { xs: 32, md: 48 },
//                     fontWeight: '700',
//                     textAlign: 'center',
//                     mb: 6,
//                     color: theme.colors.fontBody
//                   }}
//                 >
//                   Our Solution
//                 </Typography>
//                 <Grid container spacing={3}>
//                   {solutions.map((solution, index) => (
//                     <Grid item xs={12} md={6} key={index}>
//                       <Box 
//                         sx={{
//                           p: 4,
//                           borderRadius: 3,
//                           background: 'linear-gradient(135deg, #10b964ff 0%, #2599d3ff 100%)',
//                           color: 'white',
//                           height: '100%'
//                         }}
//                       >
//                         <Typography 
//                           variant="h6" 
//                           sx={{
//                             fontFamily: theme.typography.fontFamily,
//                             fontWeight: '700',
//                             mb: 2
//                           }}
//                         >
//                           {solution.title}
//                         </Typography>
//                         <Typography 
//                           variant="body1" 
//                           sx={{ lineHeight: 1.6 }}
//                         >
//                           {solution.description}
//                         </Typography>
//                       </Box>
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Box>

//               {/* Mission Statement */}
//               <Box 
//                 sx={{
//                   textAlign: 'center',
//                   p: 6,
//                   borderRadius: 4,
//                   background: 'linear-gradient(135deg, #6366f1 0%, #900eecff 100%)',
//                   color: 'white'
//                 }}
//               >
//                 <Typography 
//                   variant="h4" 
//                   sx={{
//                     fontFamily: theme.typography.fontFamily,
//                     fontWeight: '700',
//                     mb: 3
//                   }}
//                 >
//                   Our Mission
//                 </Typography>
//                 <Typography 
//                   variant="h6" 
//                   sx={{
//                     fontFamily: theme.typography.fontFamily,
//                     maxWidth: '800px',
//                     mx: 'auto',
//                     lineHeight: 1.8
//                   }}
//                 >
//                   We are dedicated to providing enterprise-grade AI security solutions that ensure 
//                   ethical usage, prevent data breaches, and maintain compliance standards while 
//                   empowering your organization to harness the full potential of artificial intelligence safely.
//                 </Typography>
//               </Box>
//             </Container>
//           </Box>
//           <Footer />
//         </Box>
//     )
// }

// export default About;