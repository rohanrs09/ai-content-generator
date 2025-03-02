export default  [
    {
        name:'Blog Title',
        desc:'An AI tool that generate blog title depends on yout blog information',
        category:'Blog',
        icon:'https://cdn-icons-png.flaticon.com/128/4186/4186534.png',
        aiPrompt:'Give me 5 blog topic idea in bullet wise only based on give niche & outline and give me result in Rich text editor format',
        slug:'generate-blog-title',
        form:[
            {
                label:'Enter your blog niche',
                field:'input',
                name:'niche',
                required:true
            },
            {
                label:'Enter blog outline',
                field:'textarea',
                name:'outline',
                
            }
        ]
    },
    {
        name: 'Blog Content',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/4905/4905454.png',
        slug: 'blog-content-generation',
        aiPrompt: 'Generate Blog Content based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic',
                field: 'input',
                name: 'topic',
                required:true
            },
            {
                label: 'Enter blog Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/11497/11497847.png',
        slug: 'blog-topic-idea',
        aiPrompt: 'Generate top 5 Blog Topic Ideas in bullet point only, (no Description) based on niche in rich text editor format',
        form: [
            {
                label: 'Enter your Niche',
                field: 'input',
                name: 'niche',
                required:true
            },
        ]
    },
    {
        name: 'Youtube SEO Title',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Youtube Tools',
        icon: 'https://cdn-icons-png.flaticon.com/128/402/402075.png',
        slug: 'youtube-seo-title',
        aiPrompt: 'Give me Best SEO optimized high ranked 5 title ideas bullet wise only bases on keywords and outline and give me result in HTML tags format',
        form: [
            {
                label: 'Enter your youtube video topic keyowords',
                field: 'input',
                name: 'keywords',
                required:true
            },
            {
                label: 'Enter youtube description Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]

    },
    {

        name: 'Youtube Description',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/2111/2111748.png',
        slug: 'youtube-description',
        aiPrompt: 'Generate Youtube description with emoji under 4-5 lines based on topic and outline in rich text editor format',
        form: [
            {
                label: 'Enter your blog topic/title',
                field: 'input',
                name: 'topic',
                required:true
            },
            {
                label: 'Enter youtube Outline here',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Youtube Tags',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        category: 'Youtube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/4674/4674918.png',
        slug: 'youtube-tag',

        aiPrompt: 'Generate 10 Youtube tags in bullet point based on title and outline in rich text editor format',

        form: [
            {
                label: 'Enter your youtube title',
                field: 'input',
                name: 'title',
                required:true
            },
            {
                label: 'Enter youtube video Outline here (Optional)',
                field: 'textarea',
                name: 'outline'
            }
        ]
    },
    {
        name: 'Email Subject Line Generator',
        desc: 'Create high-converting email subject lines that boost open rates and drive engagement with your campaigns.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3062/3062634.png',
        category: 'Email Marketing',
        slug: 'email-subject-generator',
        aiPrompt: 'Generate 10 compelling email subject lines for the specified product, audience, and goal in rich text editor format',
        form: [
            {
                label: 'What product/service are you promoting?',
                field: 'input',
                name: 'product',
                required: true
            },
            {
                label: 'Describe your target audience',
                field: 'input',
                name: 'audience',
                required: true
            },
            {
                label: 'What is the goal of your email? (e.g. sales, sign-ups)',
                field: 'input',
                name: 'goal',
                required: true
            }
        ]
    },
    {
        name: 'Twitter Thread Generator',
        desc: 'Create engaging, viral-worthy Twitter threads that position you as a thought leader in your industry.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3256/3256013.png',
        category: 'Social Media',
        slug: 'twitter-thread',
        aiPrompt: 'Create a compelling 8-10 part Twitter thread about the given topic with emojis and hashtags in rich text editor format',
        form: [
            {
                label: 'What topic would you like to create a thread about?',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Target audience for this content',
                field: 'input',
                name: 'audience'
            },
            {
                label: 'Key points to include (optional)',
                field: 'textarea',
                name: 'keypoints'
            }
        ]
    },
    {
        name: 'SQL Query Generator',
        desc: 'Generate optimized SQL queries based on your database requirements without needing to remember complex syntax.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2772/2772165.png',
        category: 'Development',
        slug: 'sql-generator',
        aiPrompt: 'Generate an optimized SQL query based on the requirements and database schema. Output in rich text editor format with code blocks.',
        form: [
            {
                label: 'Describe what you want the SQL query to do',
                field: 'textarea',
                name: 'requirement',
                required: true
            },
            {
                label: 'Database schema (tables and their columns)',
                field: 'textarea',
                name: 'schema',
                required: true
            },
            {
                label: 'Database type (MySQL, PostgreSQL, etc.)',
                field: 'input',
                name: 'dbType',
                required: true
            }
        ]
    },
    {
        name: 'API Documentation Generator',
        desc: 'Automatically generate professional API documentation from your code or endpoint descriptions.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2621/2621303.png',
        category: 'Development',
        slug: 'api-docs-generator',
        aiPrompt: 'Generate professional API documentation with examples based on the provided endpoint details in rich text editor format with markdown',
        form: [
            {
                label: 'Endpoint URL pattern (e.g. /api/users/:id)',
                field: 'input',
                name: 'endpoint',
                required: true
            },
            {
                label: 'HTTP Method (GET, POST, PUT, DELETE)',
                field: 'input',
                name: 'method',
                required: true
            },
            {
                label: 'Request parameters/body structure',
                field: 'textarea',
                name: 'request'
            },
            {
                label: 'Response structure',
                field: 'textarea',
                name: 'response'
            }
        ]
    },
    {
        name: 'E-commerce Product Description',
        desc: 'Create compelling product descriptions that convert browsers into buyers with persuasive, SEO-friendly content.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3081/3081559.png',
        category: 'E-commerce',
        slug: 'product-description',
        aiPrompt: 'Generate an SEO-friendly, persuasive product description based on the details provided in rich text editor format',
        form: [
            {
                label: 'Product Name',
                field: 'input',
                name: 'productName',
                required: true
            },
            {
                label: 'Key Features and Benefits (bullet points)',
                field: 'textarea',
                name: 'features',
                required: true
            },
            {
                label: 'Target Customer',
                field: 'input',
                name: 'target'
            },
            {
                label: 'Price Point (budget, mid-range, premium)',
                field: 'input',
                name: 'pricing'
            }
        ]
    },
    {
        name: 'Sales Email Template',
        desc: 'Create personalized sales outreach emails that grab attention and drive responses using proven copywriting frameworks.',
        icon: 'https://cdn-icons-png.flaticon.com/128/9068/9068642.png',
        category: 'Sales',
        slug: 'sales-email',
        aiPrompt: 'Generate a personalized sales outreach email following the AIDA framework based on the provided details in rich text editor format',
        form: [
            {
                label: 'Your Product/Service',
                field: 'input',
                name: 'product',
                required: true
            },
            {
                label: 'Recipient\'s Company/Role',
                field: 'input',
                name: 'recipient',
                required: true
            },
            {
                label: 'Unique Value Proposition',
                field: 'textarea',
                name: 'value',
                required: true
            },
            {
                label: 'Call-to-Action (what you want them to do)',
                field: 'input',
                name: 'cta',
                required: true
            }
        ]
    },
    {
        name: 'Story Plot Generator',
        desc: 'Generate creative and engaging story plots for short stories, novels, or screenplays based on your parameters.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3534/3534033.png',
        category: 'Creative Writing',
        slug: 'story-plot',
        aiPrompt: 'Create a detailed story plot with character descriptions, setting, and major plot points based on the inputs in rich text editor format',
        form: [
            {
                label: 'Genre (e.g., sci-fi, romance, thriller)',
                field: 'input',
                name: 'genre',
                required: true
            },
            {
                label: 'Main Character Description',
                field: 'textarea',
                name: 'character'
            },
            {
                label: 'Setting/Time Period',
                field: 'input',
                name: 'setting'
            },
            {
                label: 'Theme or Message',
                field: 'input',
                name: 'theme'
            }
        ]
    },
    {
        name: 'AI Image Prompt Creator',
        desc: 'Create detailed prompts for image generation AI tools like DALL-E, Midjourney, or Stable Diffusion to get the perfect results.',
        icon: 'https://cdn-icons-png.flaticon.com/128/10464/10464939.png',
        category: 'AI Art',
        slug: 'image-prompt',
        aiPrompt: 'Generate detailed, effective prompts for AI image generation tools based on the concept provided in rich text editor format',
        form: [
            {
                label: 'Describe the image you want to create',
                field: 'textarea',
                name: 'concept',
                required: true
            },
            {
                label: 'Style (realistic, anime, oil painting, etc.)',
                field: 'input',
                name: 'style'
            },
            {
                label: 'Mood/Atmosphere',
                field: 'input',
                name: 'mood'
            },
            {
                label: 'AI Tool (DALL-E, Midjourney, Stable Diffusion)',
                field: 'input',
                name: 'tool'
            }
        ]
    },
    {
        name: 'Study Flashcards Creator',
        desc: 'Transform any topic or text into effective study flashcards with questions on one side and answers on the other.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2541/2541984.png',
        category: 'Education',
        slug: 'flashcard-generator',
        aiPrompt: 'Generate a set of 10 study flashcards with questions and answers based on the provided content in rich text editor format',
        form: [
            {
                label: 'Topic or Subject',
                field: 'input',
                name: 'topic',
                required: true
            },
            {
                label: 'Content to transform into flashcards',
                field: 'textarea',
                name: 'content',
                required: true
            },
            {
                label: 'Difficulty Level (beginner, intermediate, advanced)',
                field: 'input',
                name: 'difficulty'
            }
        ]
    },
    {
        name: 'Meal Plan Generator',
        desc: 'Create personalized weekly meal plans based on your dietary preferences, restrictions, and nutritional goals.',
        icon: 'https://cdn-icons-png.flaticon.com/128/1046/1046747.png',
        category: 'Health',
        slug: 'meal-plan',
        aiPrompt: 'Generate a detailed 7-day meal plan with breakfast, lunch, dinner and snacks based on the provided dietary preferences and goals. Include nutritional information and simple preparation instructions in rich text editor format.',
        form: [
            {
                label: 'Dietary preferences (e.g., vegetarian, keto, paleo)',
                field: 'input',
                name: 'dietType',
                required: true
            },
            {
                label: 'Allergies or food restrictions',
                field: 'input',
                name: 'restrictions'
            },
            {
                label: 'Calorie target per day (if applicable)',
                field: 'input',
                name: 'calories'
            },
            {
                label: 'Health goals (e.g., weight loss, muscle gain, maintenance)',
                field: 'input',
                name: 'goals'
            }
        ]
    },
    {
        name: 'Resume Tailoring Assistant',
        desc: 'Automatically customize your resume for specific job descriptions to increase your chances of getting past ATS systems and landing interviews.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135692.png',
        category: 'Career',
        slug: 'resume-tailoring',
        aiPrompt: 'Analyze the job description and suggest specific modifications to the resume to better match the requirements. Provide output in rich text editor format with clear before/after suggestions.',
        form: [
            {
                label: 'Paste the job description',
                field: 'textarea',
                name: 'jobDescription',
                required: true
            },
            {
                label: 'Paste your current resume content',
                field: 'textarea',
                name: 'resumeContent',
                required: true
            }
        ]
    },
    {
        name: 'Lesson Plan Creator',
        desc: 'Create comprehensive lesson plans for teachers, tutors, or trainers with learning objectives, activities, and assessments.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2232/2232688.png',
        category: 'Education',
        slug: 'lesson-plan',
        aiPrompt: 'Create a detailed lesson plan including objectives, activities, materials needed, assessment methods, and timing for each section in rich text editor format.',
        form: [
            {
                label: 'Subject/Topic',
                field: 'input',
                name: 'subject',
                required: true
            },
            {
                label: 'Age/Grade Level',
                field: 'input',
                name: 'gradeLevel',
                required: true
            },
            {
                label: 'Lesson Duration (minutes)',
                field: 'input',
                name: 'duration',
                required: true
            },
            {
                label: 'Learning Objectives (What students should learn)',
                field: 'textarea',
                name: 'objectives',
                required: true
            },
            {
                label: 'Available Materials/Resources',
                field: 'textarea',
                name: 'resources'
            }
        ]
    },
    {
        name: 'Rewrite Article (Plagiarism Free)',
        desc: 'Use this tool to rewrite existing Article or Blog Post which can bypass AI detectors and also make it plagiarism free.',
        icon: 'https://cdn-icons-png.flaticon.com/128/3131/3131607.png',
        category: 'Rewriting Tool',
        slug: 'rewrite-article',
        aiPrompt: 'Rewrite give article without any Plagiarism in rich text editor format',
        form: [
            {
                label: '🤖 Provide your Article/Blogpost or any other content to rewrite.',
                field: 'textarea',
                name: 'article',
                required:true
            }
        ]
    },
    {
        name: 'Text Improver',
        desc: 'This handy tool refines your writing, eliminating errors and redundancies for a clear, readable result. It also offers a comprehensive tone analysis and suggests better word choices.',
        icon: 'https://cdn-icons-png.flaticon.com/128/1686/1686815.png',
        category: 'Writing Assistant',
        slug: 'text-improver',
        aiPrompt: 'Given textToImprove, Rewrite text without any grammar mistake and professionally in rich text editor format',
        form: [
            {
                label: 'Enter text that you want to re-write or improve',
                field: 'textarea',
                name: 'textToImprove'
            }
        ]
    },
    {
        name: 'Add Emojis to Text',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        icon: 'https://cdn-icons-png.flaticon.com/128/2584/2584606.png',
        category: 'blog',
        slug: 'add-emoji-to-text',
        aiPrompt: 'Add Emoji to outline text depends on outline and rewrite it in rich text editor format',
        form: [
            {
                label: 'Enter your text to add emojis',
                field: 'textarea',
                name: 'outline',
                required:true
            }
        ]
    },
    {
        name: 'Instagram Post Generator',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        icon: 'https://cdn-icons-png.flaticon.com/128/15713/15713420.png',
        category: 'blog',
       
        slug: 'instagram-post-generator',
        aiPrompt: 'Generate 3 Instagram post depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your post',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
        ]
    },
    {
        name: 'Instagram Hash Tag Generator',
        desc: 'An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.',
        icon: 'https://cdn-icons-png.flaticon.com/128/7045/7045432.png',
        category: 'blog',
       
        slug: 'instagram-hash-tag-generator',
        aiPrompt: 'Generate 15 Instagram hash tag depends on a given keywords and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords for your instagram hastag',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
        ]
    },
    {
        name: 'Instagram Post/Reel Idea',
        desc: 'An AI tool that generate New and trending instagram idea depends on your niche',
        icon: 'https://cdn-icons-png.flaticon.com/128/1029/1029183.png',
        category: 'instagram',
       
        slug: 'instagram-post-idea-generator',
        aiPrompt: 'Generate 5-10 Instagram idea depends on niche with latest trend and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter Keywords / Niche for your instagram idea',
                field: 'input',
                name: 'keywords',
                required:true
            },
           
        ]
    },
    {
        name: 'English Grammer Check',
        desc: 'AI Model to Correct your english grammer by providing the text',
        icon:'https://cdn-icons-png.flaticon.com/128/12596/12596700.png',
        category: 'english',
       
        slug: 'english-grammer-checker',
        aiPrompt: 'Rewrite the inputText by correcting the grammer and give output in  in rich text editor format',
        form: [
            {
                label: 'Enter text to correct the grammer',
                field: 'input',
                name: 'inputText',
                required:true
            },
           
        ]
    },
    {
        name: 'Write Code',
        desc: 'AI Model to generate programming code in any language',
        icon:'https://cdn-icons-png.flaticon.com/128/6062/6062646.png',
        category: 'Coding',
       
        slug: 'write-code',
        aiPrompt: 'Depends on user codeDescription write a code and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter description of code you want along with Programming Lang',
                field: 'textarea',
                name: 'codeDesscripton',
                required:true
            },
           
        ]
    },
    {
        name: 'Explain Code',
        desc: 'AI Model to explain programming code in any language',
        icon:'https://cdn-icons-png.flaticon.com/128/8488/8488751.png',
        category: 'Coding',
       
        slug: 'explain-code',
        aiPrompt: 'Depends on user codeDescription explain code line by line and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter code which you want to understand',
                field: 'textarea',
                name: 'codeDesscripton',
                required:true
            },
           
        ]
    },
    {
        name: 'Code Bug Detector',
        desc: 'This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in a straightforward, user-friendly way.',
        icon:'https://cdn-icons-png.flaticon.com/128/4426/4426267.png',
        category: 'code-bug-detector',
       
        slug: 'code-bug-detector',
        aiPrompt: 'Depends on user codeInput find bug in code and give solution and give output in  in rich text editor format in code block ',
        form: [
            {
                label: 'Enter code which you want to test bug',
                field: 'textarea',
                name: 'codeInput',
                required:true
            },
           
        ]
    },
    {
        name: 'Tagline Generator',
        desc: 'Struggling to find the perfect tagline for your brand? Let our AI-tool assist you in creating a tagline that stands out.',
        icon:'https://cdn-icons-png.flaticon.com/128/2178/2178616.png',
        category: 'Marketting',
       
        slug: 'tagline-generator',
        aiPrompt: 'Depends on user productName and outline generate catchy 5-10 tagline for the business product and give output  in rich text editor format ',
        form: [
            {
                label: 'Product/Brand Name',
                field: 'input',
                name: 'productName',
                required:true
            },
            {
                label: 'What you are selling / Marketting',
                field: 'textarea',
                name: 'outline',
                required:true
            },
           
        ]
    },
    {
        name: 'Product Description',
        desc: 'This is your AI-powered SEO expert, creating captivating and keyword-rich e-commerce product descriptions to boost your online sales.',
        icon:'https://cdn-icons-png.flaticon.com/128/679/679922.png',
        category: 'Marketting',
       
        slug: 'product-description',
        aiPrompt: 'Depends on user productName and description generate small description for product for e-commer business give output  in rich text editor format  ',
        form: [
            {
                label: 'Product Name',
                field: 'input',
                name: 'productName',
                required:true
            },
            {
                label: 'Product Details',
                field: 'textarea',
                name: 'outline',
                required:true
            },
           
        ]
    },



]