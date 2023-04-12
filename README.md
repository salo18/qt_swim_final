fix:
START HERE:

--- once api/recent is returning the correct data, need to get the cron to work
  - is it adding a document at the right interval to mongodb?
  - get this to work locally then get it to work when deeployed to vercel - gpt had some ideas for how to do this but vercel's native cronjobs might work if the issues are fixed



-- CRON job not running on vercel -- incorrect chromium version?
  -- api/test is working on deployment so definitely an issue on /api/recent with chromium version

TRY // import { NextApiRequest, NextApiResponse } from 'next' on api/recent?
read the docs open on chrome


- instead of GSP, send last 4 samples to api endpoint and get the values from there to the homepage?


challenge with this project
- learned how to use puppeteer -- could not get it it to work with chromium and the different versions
- switched to playwright -- now getting an error because serverless function exceeds 50MB
- could not get site to deploye to vercel because the build was too big. It took me MANY attempts to solve this issue but was able to deploy using older versions of the packages that aren't as big as newer deployments. The magic combination was:
--- "chrome-aws-lambda": "6.0.0",
--- "next": "12.3.1",
--- "puppeteer-core": "6.0.0"
thanks to these articles that took a while to find but solved the problem:
https://gist.github.com/agungjk/ff542367470d156478f7381af2cf7e60
https://gist.github.com/kettanaito/56861aff96e6debc575d522dd03e5725#step-1-install-dependencies



- deploy v1
- make front end (one page)
  - explain the project
  - sign up form
  - most recent data
    - status of last check
    - when last updated by Otago Council
    - when last checked by our app
- set up alerts
  - use twilio or other service to text users when there is a new reading from Otago Council
  - only set alerts if the lake status has changed
- make 404

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

What I learned with this project
- how to scrape data with puppeteer
- how to make a cron job
  - crontab was helpful https://crontab.guru/#0_*_*_*_*
- basics of package.json configuration
- first time using React Context in a project
- first time using Next.js
- how to deploy an app

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
