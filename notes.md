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
