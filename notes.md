this is just for notes that i might need to use to recall the structure and work flow of this website.

this now i was planning to do fetching on server side that pushing it it supabase,
but now i've pivoted i'll do everything on supabase with help of periodic function that will run with help `supabase cron jobs` which is some kind of extension that will call function,
now in supabase i've two table till now

supabase structure:-

Tables :-

1. news_items
   every news would be stored here and it will have many fields
2. news_fetch_config
   basically a city, country or place name that i want to loop though the function

   things are looking good today 31-5-25

3. i've created a function that will fetch news from news api and store it in supabase
4. The flow that i come-up with is little overwhelming but it should work,

- the plan is to create a table places_config that will store list of places i'll deal with
- then i'll create edge function that will loop through the places_config table and fetch news for each place and another edge function for info of each place.
- the function will be called periodically with the help of supabase cron jobs by using last_news_fetched_at and last_info_fetched_at colomn in places config, these colomn will store time of last fetched news and info respectively. and we will run news and info fetch function for everyplaces that hasn't been fetched in last 12 hours.
- now the inserting part is done, with limited space in supabase i've to delete old data, so i'll have to delete any thing over two or three or whatever days old.

- There is an update in plan ai is not doing web crawling part correctly so i've to pivot as there is no other option, now plan is to use a more robust and better approach that actually use ai in its actual game,

1.  use newapi or any thing that give you all the important daily news with correct url, data-content, publisher and everything and store it in one raw_news table,
2.  then feed ai that data and use it to rank those newes, might alter some tags or category make it more bitable for general public

about text-
i'm using roboto something

color palettle-

- for background i'll be using bg-gray-950 in dark and bg-200 for light
- for text i'll be usign gray-100 or 300 in dark and hover is 500 and in light theme 600 and 900
- for border i'm using gray-600
- Zarla says logo color is 0e1f3b and 437cd6
- onhover i'm using orange 500

for testing ai apis-

curl https://openrouter.ai/api/v1/chat/completions \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer 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" \
 -d '{
"model": "x-ai/grok-3-mini-beta",
"messages": [
{
"role": "user",
"content": "Fetch the top 10 news items related to India for today in JSON format with these fields:

- headline (3-5 words)
- source
- summary (20-25 words)
- url
- place
- published_date (ISO format)
- author
- image_url
- content (full article)
- tags
- language ("en")
- region ("${config.region}")
- news_rating (rate importance from 1-10 where:
  10 = extreme significant for people(e.g., war or global pendemic)
  5 = nationally important (e.g., major policy change)
  1 = routine/local news (e.g., expected rainfall in an area))

RETURN ONLY UNWRAPPED JSON ARRAY OF 10 ITEMS. DO NOT WRAP IN XML OR OTHER MARKUP."
}
]

}

List of pages i'm planning to create:-

1.  about
2.  contribute
3.  developer
4.  resources/stack
5.  signin/login
6.  forget password.
7.  creating multiple pages for about-

- update is we are using Gnews if google to fetch news and feeding all thoses news to ai then filling field that are not traditionally available for anews like rating
