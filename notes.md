this is just for notes that i might need to use to recall the structure and work flow of this website.

this now i was planning to do fetching on server side that pushing it it supabase,
but now i've pivoted i'll do everything on supabase with help of periodic function that will run with help `supabase cron jobs` which is some kind of extension that will call function,
now in supabase i've two table till now

supabase structure:-

Tables :-

1. news_items
   every news would be stored here and it will have many fields
2. news_fetch_config (this table is deleted now)
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

List of pages i'm planning to create:-

1.  about
2.  contribute
3.  developer
4.  resources/stack
5.  signin/login
6.  forget password.
7.  Insight
8.  creating multiple pages for about-

- update is we are using Gnews if google to fetch news and feeding all thoses news to ai then filling field that are not traditionally available for anews like rating
- Ask public if they want a like feature and all

Things i need to work on-

1.  News tags, rn ai is giving very niche tag, keep only new_about as niche tags should be more general
2.  create a page or disclaimer stating "This site aggregates publicly available news links. We do not own or publish the content. For full details, please visit the original source."

the final plan of this website -

1. infobox will be used to give info about city or the location user select
2. while news will be given according to the country.

lets create a edge function for updating ai_news_topics table using raw_news table, the work flow would be:-

the function will fetch all the topics from ai_news_topics and news from raw_news table then ai will see if each news has a topic/item in ai_news_topics table, if yes then it will update that item, if no similar item exist then it will create a new item, and i've a new colomn in raw_news table named ai_topic_created with timestampz, so that we will only use items from raw_news that are unused, if ai_topic_created already have a date then we wont use it.

function will perform following task;-

- fetch ai_topic_long_summary_json, updated_at and region(and any other field like ai_topic_id, if blv it is usefull) from ai_news_topics table.
- fetch id, summary and headline of items in raw_news table, where ai_topic_created as null,
- then it will do its work of checking if there is an exiting item for each news or it needs to create a new topic. in existing item it'll just update the ai_topic_long_summary_json by adding updated data and change the updated_at to current time. in the items of raw_news table it will update each news ai_topic_created with current time, so it wont fetch the news next time

/// now tommorow work,

- change the humour function to rest all functions are now working using groq

- just make sure when ai_topic basic function is updating a existing topic it set those values to null, small hack for sometime.

- add auto scrolling to news page and solve error or duplicacy

thing to learn-

- In scroller and ai topic scroller, learn the differeence between useRef based scroller and offset based scroller.

good news voila i've created newsifai's profile and presence on mulitple platforms,
linkedin, twitter, insta and reddit.
