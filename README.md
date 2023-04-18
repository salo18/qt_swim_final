Welcome to QT Swim www.qtswim.com 🌊 🌊

I swim in Lake Wakatipu (in Queenstown 🇳🇿) every day. It's cold but I always feel great after. Unfortunately, there have been small spills in the lake and days when I probably shouldn't swim. Otago Regional Council samples the water quality of the lake but there is no way to subscribe to alerts. For example, there was a small spill in March 2023.
https://crux.org.nz/crux-news/beached-boat-spills-diesel-into-lake-at-frankton/?fbclid=IwAR2ApqXWCE2YKNi5g1QQf7rLz9jT0f6PR9PJytjoEeOjqbbYmtcTZrVQDcA

The only notice given in town was a QLDC Facebook post. I rarely check Facebook so there was no way to know about the spill. I only found out because a friend told me AFTER I swam close to the affected area.

I wanted to create an easy way for people to be notified whenever a new water quality sample is taken.

This app scrapes data from https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite once a day. Users are emailed every time there is a new update, making it easy to keep track of the water quality in the lake.

The one big limitation for this project is the frequency of data updates. Unfortunately, ORC only takes a sample of the lake once or twice a month. It would be nice to get updates more often but I am constrained by the data provided on LAWA.org.nz by ORC.

This was my first full stack app. It's not much but it does something useful and I learned a ton by building it! What I learned with this project 📚
- How to programmatically scrape data with puppeteer
- How to make a cron job
  - Crontab was helpful https://crontab.guru/#0_*_*_*_*
- Basics of package.json configuration
- First time using Next.js
  - Learned about its SEO benefits, static generation vs server side rendering and more
- How to deploy an app to Vercel (and fix lots deployment issues - more on that below)
- More experience working with MongoDB
- Setting up email using nodemailer and basic knowledge of SMTP
  - helpful links for working with nodemailer:
      https://github.com/nodemailer/nodemailer/issues/830#issuecomment-817279450
      https://openjavascript.info/2023/01/10/nodemailer-tutorial-send-emails-in-node-js/
- Lots of practice debugging 🐛

Challenges with this project:
- Deployment to Vercel was challenging because of Puppeteer. The Puppeteer dependency was too large to deploy to Vercel (over the 50MB compressed size limit). So I switched to another scraping tool called Playwright. I had the same issue. It took me MANY attempts to properly deploy the app but was able to do so using older versions of the packages that aren't as big as newer deployments. The magic combination was:
  --- "chrome-aws-lambda": "6.0.0",
  --- "next": "12.3.1",
  --- "puppeteer-core": "6.0.0"
  Thanks to these articles that helped:
  https://gist.github.com/agungjk/ff542367470d156478f7381af2cf7e60
  https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725#step-1-install-dependencies

- I had a hard time getting the cron job to run on Vercel. I could get the cron jobs to work locally but not in deployment. I used tryslater.com and it was really easy to set up.
- I originally made this project using ExpressJS. I scrapped that approach once I started learning Next.js since I realized Next could handle both frontend and backend.
- Also learned about Express middleware and CORS. It took me reading lots of documentation to realize that wasn't needed on this project.

I didn't worry too much about folder structure or component reusability since it is such a small project. I could have separated each section of the home page into its own React component but chose not to since each section is only being used once. CSS styles are also all in one file and not separated.

V2 of this app could...
- Show the time to next cron job (next check will be in X hours)
- Allow users to unsubscribe from email alerts (currently handled manually)
- Give option to sign up to text alerts (Twilio?)
- Add more locations... The app only tracks the results of samples at Frankton Beach. ORC also does samples of Queenstown beach and many other lakes. I could allow users to subscribe for alerts at multiple lakes.

That's all for now! This was a fun project and I am excited to move on to a new challenge.

- Salo
