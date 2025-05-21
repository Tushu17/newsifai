// app/components/NewsList.tsx

import React from "react";

import { NewsItem } from "./../../../models/data";
import { createClient } from "@supabase/supabase-js";

const NewsList: React.FC = () => {
  return (
    <section className="container w-1/2 h-96 mt-50 p-20 mx-2 bg-black text-slate-50">
      <h2 className="text-xl text-white bg-black py-2">Top News - India</h2>
      <div className="w-full h-full text-slate-50 border-2 border-white grid grid-cols-2 gap-2">
        <h1>This is is newsList page idont know what to write here</h1>
      </div>
    </section>
  );
};

export default NewsList;
