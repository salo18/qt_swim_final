Next steps:
- set up React form and add new users to DB
- check that email goes to the list

- why isn't status being reported properly? investigate scraper.js
- update privacy and terms pages to new name
- add image to homepage
- buy domain and connect to vercel
- if the second to last reading has a different `status` value, send a message saying that the status has changed

DONE - make cron job that checks the db for the last two readings
DONE - write email content

challenge with this project
- learned how to use puppeteer -- could not get it it to work with chromium and the different versions
- switched to playwright -- now getting an error because serverless function exceeds 50MB
- could not get site to deploy to vercel because the build was too big. It took me MANY attempts to solve this issue but was able to deploy using older versions of the packages that aren't as big as newer deployments. The magic combination was:
--- "chrome-aws-lambda": "6.0.0",
--- "next": "12.3.1",
--- "puppeteer-core": "6.0.0"
thanks to these articles that took a while to find but solved the problem:
https://gist.github.com/agungjk/ff542367470d156478f7381af2cf7e60
https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725#step-1-install-dependencies

- had a hard time getting the cron job to run on vercel. I could get the cron jobs to work locally but not in deployment. I used tryslater.com and it was really easy to set up.



V2 of this app...
- show time to next cron job (next check will be in X hours )

Inspiration for the project:
I swim in the lake every day. It's cold but I always feel great after. Unfortunately, there have been small spills in the lake and days where I probably shouldn't swim. There is no alert system in place to let residents know about the water quality readings so I wanted to create one.

For example, there was a spill in March 2023.
https://crux.org.nz/crux-news/beached-boat-spills-diesel-into-lake-at-frankton/?fbclid=IwAR2ApqXWCE2YKNi5g1QQf7rLz9jT0f6PR9PJytjoEeOjqbbYmtcTZrVQDcA

The only notice give in town was a QLDC Facebook post. I rarely check FB so there was no way to know about the spill. I only found out because a friend told me AFTER I swam close to the spot.

This app scrapes data from https://www.lawa.org.nz/explore-data/otago-region/swimming/lake-wakatipu-at-frankton-bay/swimsite twice a day. This data comes from the Otago Regional Council which does a reading of bacteria levels in the lake every week or two. This app will let users know the results of each reading from the council so we don't have to remember to check the site ourselves.




helpful links:
https://www.touchstone.org.nz/duck-itch?fbclid=IwAR3WtJK6HchQxJHzviMYzdxJBeCMTJpcx9pH0yjkfEWnY5fm4D5Rcw8M-c4

this was helpful to make nodemailer work:
https://github.com/nodemailer/nodemailer/issues/830#issuecomment-817279450


What I learned with this project
- how to scrape data with puppeteer
- how to make a cron job
  - crontab was helpful https://crontab.guru/#0_*_*_*_*
- basics of package.json configuration
- first time using Next.js
- how to deploy an app to Vercel
- lots more experience working with MongoDB
- setting up email and basic knowledge of SMTP


I originally made this in Express and used React Context. Scrapped that approach once I started learning NextJs since I realized Next could handle both frontend and backend.

Also learned about Express middleware and CORS. Didn't end up using this in the project but it took me a while and lots of documentation to realize that wasn't needed on this project.
  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS?retiredLocale=it

marketing
- post in QT FB groups
- contact the author of the crux article
- contact local news?



node automatic restart with --watch flag
- https://pawelgrzybek.com/til-node-v18-11-0-comes-with-a-watch-mode-so-you-might-not-need-nodemon/


--- used get static props
https://nextjs.org/docs/basic-features/data-fetching/get-static-props
